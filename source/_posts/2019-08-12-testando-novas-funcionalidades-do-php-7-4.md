---
extends: _layouts.post
section: content
title: Testando Novas Funcionalidades do PHP 7.4
date: 2019-08-12
description: Testando Novas Funcionalidades do PHP 7.4
excerpt: Nesse post mostro como fiz para testar as novas funcionalidades da versão 7.4 do PHP ainda em fase beta. Algumas dessas funcionalidades são Typed Properties e Spread Operator, além disso, apresento como fiz para configurar o ambiente usando Docker.
categories: [php, php7, beginner]
---

Neste post apresento como fiz para testar as novas funcionalidades da versão 7.4 do PHP que ainda está em fase beta (a versão estável deve ser lançado em novembro de 2019). Como exemplo, criei uma implementação bem simples de um "blog" com cadastro e consulta de posts, sendo os dados armazenados em arquivos *JSON*. Começo comentando um pouco sobre algumas das novas funcionalidades do PHP 7.4 que foi aplicado no exemplo que desenvolvi, em seguida descrevo como fiz para configurar o ambiente e então concluo com um link para o código completo dos testes que fiz no meu Github.

## *Typed Properties* - Criando as classes para armazenar os posts

Começando então pelo sistema de tipagem, que no PHP 7.4 foi melhorado com a adição do *typed properties*, com essa funcionalidade agora é possível definir os tipos das propriedades em classes, sendo necessário informar o modificador de acesso: `public`, `protected` ou `private`; ou `var`. Para tipos primitivos essa funcionalidade deve funcionar da mesma forma que a de passagem por parâmetro em métodos e funções, por exemplo, por padrão se for definido um tipo `int` e for passado uma `string`, o PHP vai tentar converter o tipo de `string` para `int`; porém se você quiser desabilitar esse tipo de comportamento e lançar um `Fatal Error` quando isso acontecer, basta utilizar o `declare(strict_types=1)`.

Para quem usa IDE ou algum editor que tem autocomplete, essa funcionalidade vai ajudar a identificar o tipo sem precisar utilizar o `@var` no PHPDoc blocks das propriedades da classe.

Com isso, a classe `Post` e `Author` ficou da seguinte forma:

- Post.php

```php
<?php

class Post
{
    public int $id;
    public string $title;
    public string $content;
    public DateTimeImmutable $postedAt;
    public Author $author;
}
```

- Author.php

```php
<?php

class Author
{
    public int $id;
    public string $name;
    public ?string $profile;
}
```

## *Spread Operator* em *arrays* - Adicionando um novo post

Agora é possível utilizar o *spread operator* em *arrays*, dessa forma podemos usá-lo para adicionar um novo post no início do *array* de posts, tendo um resultado igual ao da função `array_unshift`.

```php
function appendPosts(Post $post, callable $getPosts, callable $storePosts) : void {
    $storePosts([serializePost($post), ...$getPosts()]);
}
```

É possível utilizar essa funcionalidade apenas em *arrays* com chaves numéricas.

## *Arrow Function* - Retornando um autor pelo ID

Uma das funcionalidades mais esperadas do PHP 7.4 é o *Arrow Function*, também conhecido como *short closure*, com ela podemos escrever uma *closure* de forma mais compacta, sendo assim, no método criado para retornar um autor pelo ID, até a versão 7.3 do PHP teríamos que fazer assim:

```php
function getAuthorById(int $authorId) : Author {
    return array_find(getAuthors(), function (Author $author) use ($authorId) {
        return $author->id === $authorId;
    });
}
```

Na versão 7.4 podemos ter o mesmo resultado fazendo da seguinte forma:

```php
function getAuthorById(int $authorId) : Author {
    return array_find(getAuthors(), fn(Author $author) => $author->id === $authorId);
}
```

Essa função `array_find` foi eu que criei para poder retornar um item do array, e ficou assim:

```php
function array_find(array $items, callable $callback) {
    foreach ($items as $item) {
        if ($callback($item)) {
            return $item;
        }
    }
    return false;
}
```

Com *Arrow Function* será possível escrever funções de uma linha menos verbosas. E no futuro, talvez na versão 8 do PHP, podemos ver essa mesma funcionalidade aceitando mais de uma linha.

## Operador de atribuição *null coalescing* - Recebendo ação do formulário

Quando iniciei esse blog, [o primeiro post que publiquei foi sobre a versão 7.0 do PHP](https://whoami.deoliveiralucas.net/blog/iniciando-com-php-7), onde o operador *null coalescing* tinha sido incluído e melhorado a forma de validar e atribuir valores não definidos ou nulo, na versão 7.4 foi incluído o operador de atribuição *null coalescing* que pode ser utilizado da mesma forma que os operados de mais `+=`, menos `-=` e outros já existentes, sendo assim, para obter a ação enviada pelo formulário e deixar a opção padrão para como `load`, ao invés de fazer isso:

```php
$formInputsFromGet['action'] = $formInputsFromGet['action'] ?? 'load';
```

Podemos fazer isso na versão 7.4:

```php
$formInputsFromGet['action'] ??= 'load';
```

## Configurações do ambiente

Para usar o PHP 7.4 beta usei a imagem do Docker disponível na [imagem oficial do PHP no Docker Hub](https://hub.docker.com/_/php). Se você ainda não utiliza o [Docker](https://www.docker.com/resources/what-container), recomendo pesquise um pouco sobre, instale e comece a utilizar para não precisar ficar instalando várias versões de linguagens, banco de dados, entre outras ferramentas diretamente no sistema operacional da máquina; tenho certeza que vai te ajudar muito, assim como tem me ajudado. Deixei a seguir dois links que podem te ajudar na configuração no Windows e no Linux, caso não saiba como instalar; e já vou avisando que no Linux funciona muito melhor :)

[Vídeo: Como Instalar o Docker e Docker Compose Ubuntu 18.04](https://www.youtube.com/watch?v=bpbcu36t7g0)

[Vídeo: Instalando o Docker no Windows](https://www.youtube.com/watch?v=OweZAewo54A)

[Documentação do Docker: Instalação](https://docs.docker.com/install/)

Com Docker instalado na máquina, primeiro executei um comando que mostra a versão do PHP, isso somente para que seja feito o download das imagens necessárias para executar o container, o comando é o seguinte:

```bash
docker run -it --rm -v `pwd`:/php74 -w /php74 -p 8888:8888 php:7.4.0beta1-cli-alpine php -v
```

Basicamente o que esse comando faz é, executa um container com a versão 7.4 beta do PHP, mapeia o diretório que está sendo executado o comando com o diretório `/app` do container, deixa o diretório de workspace do container como `/app`, mapeia a porta `8888` do container com a porta `8888` da máquina e remove o container assim que é finalizado a execução do comando `php -v`. Para saber como funciona cada parâmetro desse comando, veja [sobre o comando *run* na documentação do site oficial do Docker](https://docs.docker.com/engine/reference/run/).

Sendo assim, para ficar mais fácil usá-lo vou criar um *alias* no terminal com prefixo do comando do Docker:

```bash
alias php74="docker run -it --rm -v `pwd`:/php74 -w /php74 -p 8888:8888 php:7.4.0beta1-cli-alpine"
```

A partir de agora para ver a versão do PHP, podemos apenas executar o comando `php74 -v`, a saída deve ser o seguinte:

```bash
> php74 -v
  PHP 7.4.0beta1 (cli) (built: Aug  2 2019 04:55:36) ( NTS )
  Copyright (c) The PHP Group
  Zend Engine v3.4.0-dev, Copyright (c) Zend Technologies
```

E para usar o servidor embutido do PHP:

```bash
> php74 -S 0.0.0.0:8888
```

Os comandos para executar o código está disponível no README do [repositório no Github](https://github.com/deoliveiralucas/php74-beta-tests).

## Concluindo - Adicionando uma interface ao blog

Antes de finalizar, vale lembrar que esse post é um visão geral de algumas das novas funcionalidades e melhorias incluídas no PHP 7.4, para saber mais detalhes [acesse o artigo publicado no site stitcher.io](https://stitcher.io/blog/new-in-php-74#null-coalescing-assignment-operator-rfc), nesse artigo é possível saber também quais foram as melhorias de performance e quais funcionalidades estão sendo descontinuadas, além dos links para as [RFC's](https://wiki.php.net/rfc) no site oficial do PHP. É isso, e vem muito mais coisas legais nas próximas versões, quem sabe algo como *generic array* na versão 8, essa é uma das que mais espero.

Por fim, adicionei uma interface web usando um template pronto do Bootstrap.

Lembrando que [o código completo está disponível em um repositório no Github](https://github.com/deoliveiralucas/php74-beta-tests) com instruções para clonar e executar.

#### Referências

- [Talk do Nikita Popov: Typed Properties and more: What’s coming in PHP 7.4?](https://www.youtube.com/watch?v=teKnckg5x7I)
- [Artigo do site stitcher.io: What's new in PHP 7.4](https://stitcher.io/blog/new-in-php-74#null-coalescing-assignment-operator-rfc)
- [Artigo do Marcel dos Santos: O que há de novo no PHP 7.4?](https://pensandonaweb.com.br/o-que-ha-de-novo-no-php-7-4/)
