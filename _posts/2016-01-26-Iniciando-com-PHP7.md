---
layout: post
title:  "Iniciando com PHP 7"
date:   2016-01-26 21:43:00
categories: php7 características
comments: true
---
Se você programa em PHP ou acompanha as notícias sobre desenvolvimento, deve estar sabendo que o PHP 7 foi oficialmente lançado a quase dois meses, e para você que ainda não viu as novas características ou quer saber um pouco mais, continue lendo este *post*, pois resolvi iniciar esse blog escrevendo e testando algumas de suas novas funcionalidades. No momento que estou escrevendo este *post*, já li vários artigos sobre o PHP 7, por sinal a grande maioria muito bom, já recebi até e-mail de cursos completos que dizem ser totalmente voltado para essa nova versão.

Então vamos lá! vamos ver o que tem de novo e quais são algumas das incompatibilidades com as versões anteriores.

## Scalar Types

Primeiramente queria falar de duas novas características que eu particularmente aguardava, que é a possibilidade declarar o tipo de valor a ser passado por parâmetro utilizando `string`, `int`, `float` e `bool`, na versão 5 era possível utilizar apenas `array` e objetos.

Com essa nova característica podemos criar códigos bem mais consistentes, ter mais facilidade para trabalhar em equipe e ter menos erros.

Então, agora é possível fazer algo desse tipo:

{% highlight php startinline=true %}
<?php
function soma(int $x, int $y) {
    return $x + $y;
}
{% endhighlight %}

## Declaração de tipo de retorno

E o que eu mais aguardava que era a possibilidade de declarar o tipo do valor de retorno em uma função ou método. É bem simples utilizar este novo recurso, basta adicionar dois pontos `:` e o tipo de retorno (`int`, `string`, etc..) após fechar o parenteses dos parâmetros e o tipo valor de retorno já está declarado. Caso o tipo de valor retornado não seja o mesmo que o declarado, o PHP irá disparar um `Fatal error`.

Sendo assim, com o PHP 7 podemos criar funções declarando o tipo de retorno da seguinte maneira.

{% highlight php startinline=true %}
function soma(int $x, int $y) : int {
    return $x + $y;
}
{% endhighlight %}

## Operador *Null coalescing* `??`

Acredito que essa seja uma característica que realmente será muito útil e poderá deixar o código mais limpo, apesar de fazer algo bem simples.
Se você costuma escrever código como do exemplo a seguir para testar a existência de uma variável e atribuir um valor, será muito útil pra você:

{% highlight php startinline=true %}
$usuario = isset($dados['usuario']) ? $dados['usuario'] : 'anonimo';
{% endhighlight %}

No PHP 7 poderá ter a mesma funcionalidade escrevendo o seguinte código:

{% highlight php startinline=true %}
$usuario = $dados['usuario'] ?? 'anonimo';
{% endhighlight %}

Realmente reduziu ainda mais a quantidade de código, ficou simples e ainda no meu ponto de vista deixa o código mais limpo, muito bom!

## Operador *Spaceship* `<=>`

Este novo operador *spaceship* que é representado por `<=>`, é usado para comparação de duas expressões, podendo ser numérico ou não. A utilização desse operador retorna -1 se o valor da esquerda for menor que o da direita, 0 se os valores forem iguais e 1 se o da esquerda for maior que o da direita, conforme mostra o exemplo a seguir:

{% highlight php startinline=true %}
var_dump(2<=>3); // int(-1)
var_dump(2<=>2); // int(0)
var_dump(2<=>1); // int(1)

var_dump("A"<=>"a"); // int(-1)
var_dump("a"<=>"a"); // int(0)
var_dump("a"<=>"A"); // int(1)
{% endhighlight %}

## Criar uma constante `array` usando `define()`

Com o PHP 7 é possível armazenar um `array` em uma constante e então recuperar os valores pelo índice. Na versão 5.6 também é possível fazer isso, mas apenas utilizando `const`.

{% highlight php startinline=true %}
define('USUARIO', [
    'nome',
    'sobrenome',
    'email'
]);

echo USUARIO[1]; // sobrenome
{% endhighlight %}

## Classes anônimas

No PHP 7 foi introduzido também a possibilidade de utilizar classes anônimas, em versões anteriores era possível fazer isso com funções.
Podemos utilizar classes anônimas quando queremos criar uma classe, utilizar apenas uma vez e então descartar.

Um exemplo que achei interessante é da utilização com os *Patterns* *Subject* e *Observer*.

{% highlight php startinline=true %}
interface IObserver {
    public function update(ISubject $subject);
}

interface ISubject {
    public function attach(IObserver $observer);
    public function detach(IObserver $observer);
    public function notify();
}

class ClienteSubject implements ISubject {
    protected $observers = [];

    public function attach(IObserver $observer) {
        $this->observers[] = $observer;
    }

    public function detach(IObserver $observer) {
        // ...
    }

    public function notify() {
        foreach ($this->observers as $observer) {
            $observer->update($this);
        }
    }

    public function updateNome($nome) {
        $this->nome = $nome;
        $this->notify();
    }

    public function getNome() {
        return $this->nome;
    }
}

$cliente = new ClienteSubject();

// Agora vamos usar uma classe anônima
$cliente->attach(new class implements IObserver {
    public function update(ISubject $subject) {
        printf('Cliente %s atualizado', $subject->getNome());
    }
});

$cliente->updateNome("Teste classe anônima");
{% endhighlight %}

## Agrupando declarações de `use`

Com o PHP 7 é possível agrupar a importação de classes de um mesmo `namespace`.

{% highlight php startinline=true %}
use exemplo\namespace\ {
    ClasseA as a,
    ClasseB,
    ClasseC
};
{% endhighlight %}

## Construtor depreciado PHP 4

Não sei se você conhecia ou já tinha utilizado este tipo de construtor, pois foi introduzido na versão 4 do PHP e não é comum ser utilizado atualmente, mas é possível criar um construtor utilizando o mesmo nome da classe como é feito em outras linguagens de programação, porém essa funcionalidade a partir da versão 7 está depreciada e irá emitir um `E_DEPRECATED` caso seja utilizada, e será removida em futuras versões do PHP.
O recomendado é que utilize `__construct` para criação de construtores.

{% highlight php startinline=true %}
class Exemplo {
    public function Exemplo() {
        echo 'Construtor executado';
    }
}
{% endhighlight %}

## Extensão `mysql` removida

A extensão `mysql` foi removida na versão 7 do PHP, essa que já é uma função que vinha emitindo uma mensagem de `E_DEPRECATED` desde versão 5.6, e a partir da versão 7 não será mais utilizada. Essa extensão foi removida principalmente por problemas relacionados a segurança.

## Chamar métodos estáticos sem `static`

O PHP aceita que chame métodos como estáticos mesmo que não seja declarado como `static`, porém isso a partir da versão 7 está emitindo uma mensagem de `E_DEPRECATED` e será removido no futuro.

{% highlight php startinline=true %}
class Classe {
    function metodo() {
        echo 'Não sou um método estático!';
    }
}

Classe::metodo();
{% endhighlight %}

## Desempenho

Claro que eu não poderia deixar de falar do incrível desempenho que o PHP 7 vem demostrando em diversos *benchmarks* que estão sendo realizados tanto por usuários da linguagem quanto pela própria [Zend](http://www.zend.com/en/resources/php7_infographic). Com o nova versão do motor *Zend Engine* o PHP vem mostrando um grande aumento no desempenho quando comparado com a versão 5.6 ou até mesmo com o HHVM que é a versão do PHP criada pelo *facebook* justamente para ter melhor performance.

## Quer saber mais

O PHP incluiu varias outras características na nova versão, caso você tenha se interessado e queira saber mais, pode dar uma olhada no site oficial **[php.net](http://php.net)**, lá você encontra tudo que foi adicionado, alterado e removido. O que eu mostrei aqui foi algumas dessas novas características que achei interessante, espero que tenha gostado, qualquer dúvida ou sugestão, pode me mandar.


**Referência**: [php.net](http://php.net)
