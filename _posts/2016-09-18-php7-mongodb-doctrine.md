---
layout: post
title:  "PHP 7, MongoDB e Doctrine"
date:   2016-09-18 16:00:00
categories: php mongodb doctrine
comments: true
---
Faz um tempo que estou utilizando PHP com MongoDB e que vi que tinha uma versão do Doctrine que poderia me ajudar com isso, porém quando vi (ano passado) e fui fazer uns testes tive alguns problemas por ainda estar na versão BETA, esses dias resolvi olhar novamente e vi já faz um tempo que versão 1.0 foi lançada e que já está até na versão 1.1, então decidi fazer uns testes novamente e compartilhar aqui no blog.

Nesse post vou dar uma introdução de como trabalhar com PHP e MongoDB utilizando o framework de 
persistência Doctrine ODM. Como exemplo, vou desenvolver um blog simples com posts e comentários, estarei mostrando aqui apenas os códigos da API que estão relacionados com o Doctrine, porém todo o código da aplicação estará disponível e um [repositório no GitHub](http://github.com/deoliveiralucas/blog-php-mongodb-doctrine) com um cliente Ajax consumindo a API. Vou utilizar também algumas ferramentas a mais apenas para agilizar o desenvolvimento, como, o micro-framework Silex e o tamplate engine Twig, mas o mesmo procedimento poderá ser facilmente implementado em outros *frameworks* ou até mesmo em aplicações que utilizam "apenas PHP".

Sendo assim, o blog deverá ter os seguintes recursos na API:

```txt
- [POST] /api/post               // Inserir post
- [GET]  /api/post               // Listar dados os posts
- [GET]  /api/post/{id}          // Retornar um post
- [POST] /api/post/{id}/comment  // Inserir comentário no post

- Obs: todos os posts e comentários deverão ser retornados em ordem decrescente por data de criação.
```

Primeiro, vamos entender um pouco o que é o Doctrine ODM. O Doctrine ODM (Object Document Mapper) é um framework que foi desenvolvido para o PHP 5.3.0+ e provê uma forma mais transparente de persistir objetos do PHP no MongoDB. Quem já utilizou o Doctrine ORM (Object Relational Mapper), pode ter uma facilidade maior para entender a versão para trabalhar com MongoDB, porém é importante também se que tenha conhecimento especificamente sobre o banco de dados para que possa utilizar da melhor forma tanto o *framework* quanto as vantagens que o MongoDB oferece. Caso não conheça e tenha interesse em aprender sobre MongoDB, atualmente existem vários cursos na internet que pode ajudar, porém dois dos que eu fiz, que são gratuitos e que me ajudaram muito, foi o da [Webschool](http://webschool.io/) e o da [MongoDB University](https://university.mongodb.com/).

Antes de iniciar o desenvolvimento é necessário ter as seguintes ferramentas instaladas:

- PHP - Minha versão: 7.0.2
- Composer - Minha versão: 1.1.2
- MongoDB - Minha versão: 3.0.7 / testei também na versão 3.2.9

Logo em seguida é preciso baixar e configurar o Driver do MongoDB para PHP:

- No Windows o download da extensão pode ser feito no [site do pecl](https://pecl.php.net/package/mongodb), depois de ter feito o download, o arquivo `.dll` deve ser adicionado na pasta `ext` do PHP e a linha `extension=php_mongodb.dll` deve ser adicionada no `php.ini`.

- No Linux o driver pode ser instalado utilizando o `pecl`, conforme o descrito no repositório do [mongo-php-library](https://github.com/mongodb/mongo-php-library). 

Para verificar se a extensão está instalada, digite o comando `php -m` no terminal para mostrar a lista de extensões habilitadas, nessa lista deve aparecer `mongodb`.

Com as ferramentas instaladas e o driver configurado, podemos criar a pasta para iniciar o projeto, no meu caso chamarei de `doctrine-odm-blog`, feito isso, é necessário criar o arquivo composer.json para instalar as dependências. O arquivo deverá ficar parecido o JSON a seguir.

```json
{
    "name": "deoliveiralucas/doctrine-odm-blog",
    "description": "Blog simples com Doctrine ODM e Silex",
    "require": {
        "alcaeus/mongo-php-adapter": "^1.0",
        "doctrine/mongodb": "^1.3",
        "doctrine/mongodb-odm": "^1.1",
        "silex/silex": "^2.0",
        "twig/twig": "~1.0"
    },
    "autoload": {
        "psr-4": {
            "DOLucas\\": "src/"
        }
    },
    "authors": [
        {
            "name": "Lucas de Oliveira",
            "email": "contato@deoliveiralucas.net"
        }
    ]
}
```

Note que adicionei também a biblioteca `alcaeus/mongo-php-adapter`, pois o Doctrine ODM não suporta a nova versão da extensão do MongoDB para PHP, sendo assim, com a instalação desse *adapter* o Doctrine deve funcionar normalmente.

Agora posso instalar as dependências, talvez seja necessário utilizar o parâmetro `--ignore-platform-reqs`, pois justamente por essa incompatibilidade o Composer pode barrar a instalação:

```txt
$ composer install --ignore-platform-reqs
```

Depois de instalado, criei mais algumas pastas e arquivos para que a estrutura fique conforme o lista a seguir, lembrando que o objetivo aqui será mostrar apenas os arquivos que estão na pasta `Document`, `Repository` e `Service`.

```txt
 |-public
   |-assets
   |-index.php
 |-src
   |-Blog
     |-Controller
       |-PostController.php
     |-Document
       |-Comment.php
       |-Post.php
     |-Factory
       |-CommentFactory.php
       |-PostFactory.php
     |-Repository
       |-PostRepository.php
     |-Service
       |-PostService.php
 |-res
   |-views
     |-create.twig
     |-index.twig
     |-layout.twig
     |-post.twig
 |-vendor
 |-bootstrap.php
 |-composer.json
 |-composer.lock
``` 

Agora vou adicionar o *script* no arquivo `bootstrap.php` para criar a conexão com o banco de dados e configurar onde será salvo as classes de *Proxies* e *Hydrators* gerados pelo *Doctrine*, no meu caso deixarei a pasta `/tmp` e o nome do banco `doctrineblog`, caso não seja configurado o nome do banco utilizando o método `$config->setDefaultDB`, por padrão será criado com o nome `doctrine`.

```php
<?php

require_once __DIR__ . '/vendor/autoload.php';

use Silex\Application;
use Silex\Provider\TwigServiceProvider;
use Doctrine\MongoDB\Connection;
use Doctrine\ODM\MongoDB\Configuration;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ODM\MongoDB\Mapping\Driver\AnnotationDriver;

$app = new Application();
$app['debug'] = true;

$app->register(new TwigServiceProvider(), [
    'twig.path' => __DIR__ . '/res/views',
]);

// Início da configuração do Doctrine
AnnotationDriver::registerAnnotationClasses();

$config = new Configuration();
$config->setProxyDir('/tmp');
$config->setProxyNamespace('Proxies');
$config->setHydratorDir('/tmp');
$config->setHydratorNamespace('Hydrators');
$config->setMetadataDriverImpl(AnnotationDriver::create('/tmp'));
$config->setDefaultDB('doctrineblog');

$dm = DocumentManager::create(new Connection(), $config);
```

No caso acima, a conexão está sendo feita com um banco de dados local, para conectar com um banco remoto, a linha para criar o `DocumentManager` deve estar da seguinte forma:

```php
<?php
$server = "mongodb://user:pass@server:port/dbname";

$dm = DocumentManager::create(new Connection($server), $config);
```

Depois de ter criado a conexão, vou criar os arquivos responsáveis por mapear os objetos da minha aplicação com as coleções do banco de dados, assim como no Doctrine ORM é possível fazer isso de forma simples utilizando as anotações, XML ou YAML, nesse exemplo estarei utilizando anotações. Para que as anotações funcionem é necessário que importe a classe `Annotations` (no caso abaixo foi dado um apelido `ODM`) e depois informe ao Doctrine que a classe que está sendo criada é um documento do MongoDB com a anotação `@ODM\Document`, posso informar também qual o nome da coleção que deverá ser armazenado esse documento passando como parâmetro o nome da coleção `@ODM\Document(collection="posts")`, caso não informe o nome da coleção, ele será criado com o mesmo nome da classe, em seguida posso criar os campos do documento utilizando as anotações, simplesmente informando o tipo do campo.

Como um *post* deve ter vários comentários é importante destacar o atributo `$comments` onde está dizendo que deverá referenciar vários documentos (`ReferenceMany`) utilizando a estratégia (`strategy`) `set` que é um comando do MongoDB, o documento alvo (`targetDocument`) que será referenciado dentro dessa lista é o `Comment` (uma classe que deverá ser criada), qualquer operação executada no documento pai (`Post`) poderá refletir nos documentos filhos (`Comment`) utilizando o parâmetro `cascade="all"` ([esse opção pode ser personalizada](http://docs.doctrine-project.org/projects/doctrine-mongodb-odm/en/latest/reference/reference-mapping.html#cascading-operations)) e por fim, confirme descrito no início do *post* os comentários retornados deverão estar em ordem decrescente pela data de criação, para isso usamos o parâmetro `sort={"createdAt": "desc"}`.

Sendo assim, a classe `Post` deve ficar da seguinte forma:


```php
<?php

namespace DOLucas\Blog\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use DateTime;

/** 
 * @ODM\Document(collection="posts")
 */
class Post
{

    /** 
     * @ODM\Id 
     */
    private $id;

    /** 
     * @ODM\Field(type="string") 
     */
    private $title;

    /** 
     * @ODM\Field(type="string") 
     */
    private $body;

    /** 
     * @ODM\Field(type="string") 
     */
    private $author;

    /** 
     * @ODM\ReferenceMany(
     *    strategy="set",
     *    targetDocument="Comment", 
     *    cascade="all",
     *    sort={"createdAt": "desc"}
     * )
     */
    private $comments = [];

    /** 
     * @ODM\Field(type="date") 
     */
    private $createdAt;

    /**
     * @param string $title
     * @param string $body
     * @param string $author
     */
    public function __construct(string $title, string $body, string $author)
    {
        $this->setTitle($title);
        $this->setBody($body);
        $this->setAuthor($author);
        $this->setCreatedAt(new DateTime());
    }

    /**
     * @return string
     */
    public function getId() : string
    {
        return $this->id;
    }

    /**
     * @param string $title
     */
    private function setTitle(string $title)
    {
        $this->title = $title;
    }

    /**
     * @return string
     */
    public function getTitle() : string
    {
        return $this->title;
    }

    /**
     * @param string $body
     */
    private function setBody(string $body)
    {
        $this->body = $body;
    }

    /**
     * @return string
     */
    public function getBody() : string
    {
        return $this->body;
    }

    /**
     * @param string $author
     */
    private function setAuthor(string $author)
    {
        $this->author = $author;
    }

    /**
     * @return string
     */
    public function getAuthor() : string
    {
        return $this->author;
    }

    /**
     * @param Comment $comment
     */
    public function addComment(Comment $comment) 
    {
        $this->comments[] = $comment;
    }

    /**
     * @return array
     */
    public function getComments() : array
    {
        return $this->comments->toArray();
    }

    /**
     * @param DateTime
     */
    private function setCreatedAt(DateTime $createdAt)
    {
        $this->createdAt = $createdAt;
    }

    /**
     * @return DateTime
     */
    public function getCreatedAt() : DateTime
    {
        return $this->createdAt;
    }
}
```


Depois vou mapear a classe `Comment`:

```php
<?php

namespace DOLucas\Blog\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use DateTime;

/** 
 * @ODM\Document(collection="comments")
 */
class Comment
{

    /** 
     * @ODM\Id 
     */
    private $id;

    /** 
     * @ODM\Field(type="string") 
     */
    private $username;

    /** 
     * @ODM\Field(type="string") 
     */
    private $comment;

    /** 
     * @ODM\Field(type="date") 
     */
    private $createdAt;

    /**
     * @return string
     */
    public function getId() : string
    {
        return $this->id;
    }

    /**
     * @param string $title
     */
    public function setTitle(string $title)
    {
        $this->title = $title;
    }

    /**
     * @param string $username
     */
    public function setUsername(string $username)
    {
        $this->username = $username;
    }

    /**
     * @return string
     */
    public function getUsername() : string 
    {
        return $this->username;
    }

    /**
     * @param string $comment
     */
    public function setComment(string $comment)
    {
        $this->comment = $comment;
    }

    /**
     * @return string
     */
    public function getComment() : string
    {
        return $this->comment;
    }

    /**
     * @param DateTime
     */
    public function setCreatedAt(DateTime $createdAt)
    {
        $this->createdAt = $createdAt;
    }

    /**
     * @return DateTime
     */
    public function getCreatedAt() : DateTime
    {
        return $this->createdAt;
    }
}
```

Agora que temos nossas classes mapeadas com o banco de dados já é possível utilizá-las, para isso poderíamos fazer da seguinte forma para armazenar e retornar os *posts* do banco de dados, utilizando o `$dm` que é o *DocumentManager* criado no arquivo `bootstrap.php`:

```php
<?php

// criar o post
$post = new Post('Titulo do Post', 'Descrição do post', '@deoliveiralucas');

// avisa ao Doctrine para armazenar o post no próximo flush()
$dm->persist($post);

// amazena post
$dm->flush();

// para retornar os posts
$posts = $this->dm->getRepository(Post::class)->findAll();
```

Mas para que fique algo mais organizado, criei uma classe chamada `PostRepostory` que recebe o *DocumentManager* no construtor. Para realizar as consultas vou utilizar a [Query Builder API](http://docs.doctrine-project.org/projects/doctrine-mongodb-odm/en/latest/reference/query-builder-api.html#query-builder-api) que possibilita criar consultas mais personalizadas, pois será necessário retornar o *posts* em ordem decrescente por data de criação.

Então, a classe `PostRepository` deve ficar da seguinte forma: 

```php
<?php

namespace DOLucas\Blog\Repository;

use DOLucas\Blog\Document\Post;
use Doctrine\ODM\MongoDB\DocumentManager;

/**
 * @author Lucas de Oliveira <contato@deoliveiralucas.net>
 */
class PostRepository
{

    /**
     * @var DocumentManager
     */
    private $dm;

    /**
     * @var \Doctrine\Common\Persistence\ObjectRepository
     */
    private $queryBuilder;

    /**
     * @param DocumentManager $dm
     */
    public function __construct(DocumentManager $dm)
    {
        $this->dm = $dm;
        $this->queryBuilder = $dm->createQueryBuilder(Post::class);
    }

    /**
     * @param Post $post
     */
    public function save(Post $post)
    {
        $this->dm->persist($post);
        $this->dm->flush();
    }

    /**
     * @return array
     */
    public function getAll()
    {
        return $this
            ->queryBuilder
            ->sort('createdAt', 'desc')
            ->getQuery()
            ->execute();
    }

    /**
     * @param string $id
     * @return array
     */
    public function getById(string $id)
    {
        return $this
            ->queryBuilder
            ->field('_id')->equals($id)
            ->getQuery()
            ->getSingleResult();
    }
}
```

Com a classe *repository* e os *documents* prontos, vou criar mais uma classe chamada `PostService` que será responsável por inserir as informações que vem da requisição no banco de dados utilizando as classes criadas anteriormente e utilizar o método `toArray` para mostrar os dados de forma mais limpa na API. Adicionei também as classes *Factories* que é responsável por instanciar os *documents* e os *Validators* para validar os dados que vem da requisição. Então a classe `PostService` com todos os métodos que precisamos, ficou da seguinte maneira:

```php
<?php

namespace DOLucas\Blog\Service;

use DOLucas\Blog\Repository\PostRepository;
use DOLucas\Blog\Factory\PostFactory;
use DOLucas\Blog\Factory\CommentFactory;
use DOLucas\Blog\Document\Post;
use DOLucas\Blog\Validator\PostValidator;
use DOLucas\Blog\Validator\CommentValidator;
use Doctrine\ODM\MongoDB\Cursor;
use InvalidArgumentException as ArgumentException;

/**
 * @author Lucas de Oliveira <contato@deoliveiralucas.net>
 */
class PostService
{

    /**
     * @var PostRepository
     */
    private $repository;

    /**
     * @var PostFactory
     */
    private $postFactory;

    /**
     * @var CommentFactory
     */
    private $commentFactory;

    /**
     * @var PostValidator
     */
    private $postValidator;

    /**
     * @var CommentValidator
     */
    private $commentValidator;

    /**
     * @param PostRepository $postRepository
     * @param PostFactory $postFactory
     * @param CommentFactory $commentFactory
     * @param PostValidator $postValidator
     * @param CommentValidator $commentValidator
     */
    public function __construct(
        PostRepository $postRepository,
        PostFactory $postFactory,
        CommentFactory $commentFactory,
        PostValidator $postValidator,
        CommentValidator $commentValidator
    ) {
        $this->repository = $postRepository;
        $this->postFactory = $postFactory;
        $this->commentFactory = $commentFactory;
        $this->postValidator = $postValidator;
        $this->commentValidator = $commentValidator;
    }

    /**
     * @param array $params
     */
    public function create(array $params)
    {
        try {
            $this->postValidator->validate($params);

            $post = $this->postFactory->create(
                $params['title'],
                $params['body'],
                $params['author']
            );
            
            $this->repository->save($post);

            return [
                'status'  => 'success',
                'message' => 'Post inserido com sucesso'
            ];
        } catch (ArgumentException $e) {
            return [
                'status'  => 'error',
                'message' => $e->getMessage()
            ];
        } catch (Exception $e) {
            return [
                'status'   => 'error',
                'message'  => 'Ocorreu um problema ao inserir novo post',
                'internal' => $e->getMessage()
            ];
        }
    }

    /**
     * @return array
     */
    public function getAll()
    {
        return $this->toArray($this->repository->getAll());
    }

    /**
     * @param string $idPost
     * @return array
     */
    public function getById(string $idPost)
    {
        return $this->toArray($this->repository->getById($idPost));
    }

    /**
     * @param string $idPost
     * @param array $params
     * @return array
     */
    public function addComment(string $idPost, array $params)
    {
        try {
            $this->commentValidator->validate($params);

            $post = $this->repository->getById($idPost);

            $comment = $this->commentFactory->create(
                $params['username'],
                $params['comment']
            );

            $post->addComment($comment);

            $this->repository->save($post);

            return [
                'status'  => 'success',
                'message' => 'Comentário adicionado com sucesso'
            ];
        } catch (ArgumentException $e) {
            return [
                'status'  => 'error',
                'message' => $e->getMessage()
            ];
        } catch (Exception $e) {
            return [
                'status'   => 'error',
                'message'  => 'Ocorreu um problema ao adicionar comentário',
                'internal' => $e->getMessage()
            ];
        }
    }

    /**
     * @param array|Post $posts
     * @return array
     */
    public function toArray($posts) : array
    {
        $arrPost = [];

        if ($posts instanceof Cursor) {
            foreach ($posts as $post) {
                $arrPost[] = $this->postToArray($post);
            }

            return $arrPost;
        }

        if ($posts instanceof Post) {
            return $this->postToArray($posts);
        }

        return $arrPost;
    }

    /**
     * @param Post $post
     * @return array
     */
    protected function postToArray(Post $post) : array
    {
        return [
            'id'        => $post->getId(),
            'title'     => $post->getTitle(),
            'body'      => $post->getBody(),
            'author'    => $post->getAuthor(),
            'createdAt' => $post->getCreatedAt(),
            'comments'  => $this->commentsToArray($post->getComments())
        ];
    }

    /**
     * @param array $comments
     * @return array
     */
    protected function commentsToArray(array $comments) : array
    {
        $arrComments = [];
        foreach ($comments as $comment) {
            $arrComments[] = [
                'id'        => $comment->getId(),
                'username'  => $comment->getUsername(),
                'comment'   => $comment->getComment(),
                'createdAt' => $comment->getCreatedAt()
            ];
        }
        return $arrComments;
    }
}
```

O código completo da aplicação está disponível nesse link: [http://github.com/deoliveiralucas/blog-php-mongodb-doctrine](http://github.com/deoliveiralucas/blog-php-mongodb-doctrine).

Podemos ver a facilidade que o Doctrine nos oferece para trabalhar com MongoDB, mas vale ressaltar também que essa facilidade pode trazer uma pouco de perda performance quando comparado com a utilização apenas das classes da extensão do PHP, que também é simples de utilizar.

Eu particularmente já desenvolvi projetos que usam PHP com MongoDB, mas ainda não utilizei o Doctrine ODM pelo motivo de que quando fui pesquisar ainda estava na versão BETA e não quis arriscar, mas se atualmente eu fosse começar um novo projeto, com certeza daria uma atenção maior a esse *framework*.

A fonte principal desse *post* foi a documentação oficial do Doctrine ODM, caso queira saber mais recomendo que acesse, pois está bem completa:  [http://docs.doctrine-project.org/projects/doctrine-mongodb-odm/en/latest/](http://docs.doctrine-project.org/projects/doctrine-mongodb-odm/en/latest/).