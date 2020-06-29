---
date: 2019-06-09 10:00:00
title: How to persist Value Object with Doctrine ODM
description: In this post I will describe a short review of Value Object and then show how to apply this concept and persist on the database using Doctrine ODM.
category: value object mongodb doctrine
---

I have been working the last couple years with Doctrine ODM in production environment and in some situations I needed to improve my code applying the concept of Value Object/Type, that is a very important pattern to avoid creation of invalid object and to improve the design of the domain code.

In this post I will describe a short review of Value Object/Type and then show how to apply this concept and persist on the database using Doctrine ODM.

## Short review about Value Object/Type

In some books you can see the author calling this pattern of Value Object and in other of Value Type, in this post from now on I will call it just of Value Object.

Value Objects are small objects that represents a value, two Value Objects with the same state are equals, the main characteristics of a Value Object are that it is immutable and does not have an identity. We can use Value Object to help create a consistent domain model that could be easier to understand, such as, if we create a `Money` Value Object in our code instead of just using `float`, we can let all the rules that is relevant to create a money value inside the same object, then if we need to change some of these rules we just go in one place, also all the objects that need a money type will have it already validated, these things can reduce the risk of confusion and duplication.

We can find more about this concept of Value Object in many books or articles, like any books of DDD by Eric Evans or Vaughn Vernon, Refactoring by Martin Fowler, Growing Objects-Oriented Software by Steve Freeman and Nat Pryce, and a many other books and articles that have as the goal improve the software design and consistency.

So, before I start showing the code, let's assume that our Value Object definition is, as described in [Martin Fowler's article](https://martinfowler.com/bliki/ValueObject.html):

> *"Objects that are equal due to the value of their properties..."*

## Persisting Value Object with Doctrine ODM

To persist Value Object using Doctrine ODM I can simply use the [Custom Mapping Types](https://www.doctrine-project.org/projects/doctrine-mongodb-odm/en/1.2/reference/basic-mapping.html#custom-mapping-types) or [@EmbedOne Annotation](https://www.doctrine-project.org/projects/doctrine-mongodb-odm/en/1.2/reference/annotations-reference.html#embedone) that the framework provides. Beyond Doctrine ODM I will also install other two packages, one to create Uuid, that is [ramsey/uuid](https://github.com/ramsey/uuid) and other one to help validate the input data, that is [beberlei/assert](https://github.com/beberlei/assert).

For example, if I have a product entity with three properties that are these Value Objects: `IdProduct`, `Name` and `Price`, I can create a custom type for `IdProduct` and `Name` that are Value Objects that have only one attribute and the only thing I need to do before persist is convert the object to a MongoDB type, and for `Money` Value Object I can use the `@EmbedOne` annotation because it has two attributes, `value` and `currency`, so I can do something like this:

- Entity `Product`:

```php
<?php

namespace Store;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/** @ODM\Document(collection="Product") */
class Product
{

    /**
     * @ODM\Id(type="product.id", strategy="NONE")
     * @var IdProduct
     */
    private $idProduct;

    /**
     * @ODM\Field(type="product.name")
     * @var Name
     */
    private $name;

    /**
     * @ODM\EmbedOne(name="price", targetDocument="Store\Money")
     * @var Money
     */
    private $price;

    private function __construct()
    {
        $this->idProduct = IdProduct::instance();
    }

    public function id() : IdProduct
    {
        return $this->idProduct;
    }

    public function name() : Name
    {
        return $this->name;
    }

    public function price() : Money
    {
        return $this->price;
    }

    public static function newProduct(Name $name, Money $price) : self
    {
        $instance = new self();
        $instance->name = $name;
        $instance->price = $price;
        return $instance;
    }
}
```

- Value Object `ProductId`:

```php
<?php

namespace Store;

use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\UuidInterface;

class IdProduct
{

    /** @var UuidInterface */
    private $uuid;

    private function __construct(UuidInterface $uuid)
    {
        $this->uuid = $uuid;
    }

    public function toString() : string
    {
        return $this->uuid->toString();
    }

    public static function instance() : self
    {
        return new self(Uuid::uuid4());
    }
}
```

- Value Object `Name`:

```php
<?php

namespace Store;

use Assert\Assertion;

class Name
{

    /** @var string */
    private $name;

    private function __construct(string $name)
    {
        $this->name = $name;
    }

    public function toString() : string
    {
        return $this->name;
    }

    public static function fromString(string $name) : self
    {
        Assertion::minLength($name, 3, 'Name must have at least 3 characters');

        return new self($name);
    }
}
```

- Value Object `Money`:

```php
<?php

namespace Store;

use Assert\Assertion;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/** @ODM\EmbeddedDocument() */
class Money
{

    /** @var string */
    public const USD = 'USD';

    /**
     * @ODM\Field(name="value", type="float")
     * @var float
     */
    private $value;

    /**
     * @ODM\Field(name="currency", type="string")
     * @var string
     */
    private $currency;

    private function __construct(float $value, string $currency)
    {
        $this->value = $value;
        $this->currency = $currency;
    }

    public function value() : float
    {
        return $this->value;
    }

    public function currency() : string
    {
        return $this->currency;
    }

    public static function USD(float $value) : self
    {
        Assertion::min($value, 0, 'Money must be positive value');

        return new self($value, static::USD);
    }
}
```

And then the Doctrine ODM Custom Types.

- Custom Type `IdProductType`:

```php
<?php

namespace Store\Type;

use Doctrine\ODM\MongoDB\Types\ClosureToPHP;
use Doctrine\ODM\MongoDB\Types\Type;
use Ramsey\Uuid\Uuid;
use Store\IdProduct;

class IdProductType extends Type
{

    use ClosureToPHP;

    public function convertToPHPValue($value)
    {
        return Uuid::fromString((string)$value);
    }

    public function convertToDatabaseValue($value)
    {
        return $value instanceof IdProduct ? $value->toString() : $value;
    }
}
```

- Custom Type `NameType`:

```php
<?php

namespace Store\Type;

use Doctrine\ODM\MongoDB\Types\ClosureToPHP;
use Doctrine\ODM\MongoDB\Types\Type;
use Store\Name;

class NameType extends Type
{

    use ClosureToPHP;

    public function convertToPHPValue($value)
    {
        return Name::fromString((string)$value);
    }

    public function convertToDatabaseValue($value)
    {
        return $value->toString();
    }
}
```

After I created the custom types I have to register it on Doctrine ODM. I can only use the type `product.id` and `product.name` on the `@Field` annotation because it was registered on Doctrine:

```php
<?php

use Doctrine\ODM\MongoDB\Types\Type;

Type::addType('product.id', Store\Type\IdProductType::class);
Type::addType('product.name', Store\Type\NameType::class);
```

Finally, when I persist the `Product` entity I will have this result on MongoDB:

```js
> db.Product.find().pretty()
{
    "_id" : "fb67f250-d36e-43bd-a0de-4f54f32d67f0",
    "name" : "Notebook",
    "price" : {
        "value" : 1000,
        "currency" : "USD"
    }
}
```

I hope this post could have helped you understand how to persist Value Objects using Doctrine ODM, [check out my Github repository](https://github.com/deoliveiralucas/persist-value-object-doctrine-odm) if you want to see and execute all the source code.
