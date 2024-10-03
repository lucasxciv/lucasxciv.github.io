---
extends: _layouts.post
section: content
title: Trabalhando com datas no PHP
date: 2016-02-11
description: Trabalhando com manipulação de datas no PHP
excerpt: Nesse post mostro algumas formas de manipular datas usando PHP.
categories: [php, datetime]
---

Com o PHP é possível trabalhar com datas de várias formas, podemos utilizar funções, como, `date()`, `time()`, `strtotime()`, `mktime()`, ou a classe `DateTime()` que também é muito poderosa e disponibiliza recursos que realmente facilitam muito a manipulação de datas. Além disso, existem várias bibliotecas desenvolvidas pela comunidade PHP que também podem nos ajudar muito quando precisamos manipular datas, porém não será utilizado nesse *post*, mas que poderá ser conteúdo para um próximo.

Nesse *post* vou mostrar algumas soluções comuns que podemos encontrar quando precisamos manipular datas.

## Definindo o *timezone*

Antes de começar a utilizar as funções ou classes do PHP para manipular as datas, é importante configurar o *timezone* do PHP, pois caso contrário, podemos ter problemas com datas ou horários incorretos, ou ainda ter uma mensagem de `E_WARNING` toda vez que for utilizar algum recurso do PHP para trabalhar as datas.
Podemos definir o *timezone* padrão do PHP alterando uma linha no arquivo `php.ini` de `;date.timezone =` para `date.timezone = America/Sao_Paulo` ou adicionando um comando `date_default_timezone_set('America/Sao_Paulo');` no início do *script*. Além disso, é possível configurar o PHP de acordo com o seu *timezone*, conforme mostra a [lista de *timezones* suportados](http://php.net/manual/pt_BR/timezones.php) no site do PHP.

## Diferença de dias entre datas

Vou mostrar algumas maneiras de encontrar a quantidade de dias entre datas.
A primeira é utilizando o `mktime()` para pegar o *timestamp* das datas de início e fim, logo após devemos subtrair a data de fim pela data de início, assim temos o resultado da diferença em *timestamp*, por último é preciso apenas converter esse resultado para dias.

```php
<?php

$dtInicio = '2015-12-01';
$dtFim = '2016-01-01';

$arrDtInicio = explode('-', $dtInicio);
$arrDtFim = explode('-', $dtFim);

$tsInicio = mktime(0, 0, 0, $arrDtInicio[1], $arrDtInicio[2], $arrDtInicio[0]);
$tsFim = mktime(0, 0, 0, $arrDtFim[1], $arrDtFim[2], $arrDtFim[0]);

$tsDiff = $tsFim -$tsInicio;

$quantidadeDias = $tsDiff /86400; // 86400 quantidade de segundos em um dia

echo $quantidadeDias; // 31
```

Outra maneira ainda mais simples é utilizando o `strtotime()`, pois caso a data já esteja no formato correto (`yyyy-mm-dd`) é necessário apenas passar a data para o `strtotime()`, pegar o *timestamp* e fazer o cálculo.

```php
<?php

$dtInicio = '2015-12-01';
$dtFim = '2016-01-01';

$tsDiff = strtotime($dtFim) -strtotime($dtInicio);

$quantidadeDias = $tsDiff /86400; // 86400 quantidade de segundos em um dia

echo $quantidadeDias; // 31
```

Também podemos utilizar a classe `DateTime()` que ainda tem uma [forma mais simples de formatar a saída](http://php.net/manual/en/datetime.diff.php).

```php
<?php

$dtInicio = '2015-12-01';
$dtFim = '2016-01-01';

$dateTime = new DateTime($dtInicio);
$dateDiff = $dateTime->diff(new DateTime($dtFim));
$quantidadeDias = $dateDiff->format('%a');

echo $quantidadeDias; // 31
```

## Quantidade de dias uteis

Com o PHP é bem simples desenvolver uma função para contar a quantidade de dias uteis (seg. à sex.) utilizando o `strtotime()`. Para isso é preciso obter o *timestamp* das datas de início e fim, logo em seguida executar um *loop* que irá verificar se é dia útil ou não, caso seja, será acrescentado um ao contador. Além disso, deixei um parâmetro como opcional para que seja passado os feriados, caso seja necessário.

Executei dois exemplos, o primeiro passei por parâmetro somente o intervalo de datas que gostaria de saber a quantidade de dias uteis, já no segundo exemplo foi passado também um `array` com as datas referentes aos feriados.

```php
<?php

function getDiasUteis($dtInicio, $dtFim, $feriados = []) {
    $tsInicio = strtotime($dtInicio);
    $tsFim = strtotime($dtFim);

    $quantidadeDias = 0;
    while ($tsInicio <= $tsFim) {
        // Verifica se o dia é igual a sábado ou domingo, caso seja continua o loop
        $diaIgualFinalSemana = (date('D', $tsInicio) === 'Sat' || date('D', $tsInicio) === 'Sun');
        // Verifica se é feriado, caso seja continua o loop
        $diaIgualFeriado = (count($feriados) && in_array(date('Y-m-d', $tsInicio), $feriados));

        $tsInicio += 86400; // 86400 quantidade de segundos em um dia

        if ($diaIgualFinalSemana || $diaIgualFeriado) {
            continue;
        }

        $quantidadeDias++;
    }

    return $quantidadeDias;
}

echo getDiasUteis('2015-12-07', '2016-01-08'); // 25
echo PHP_EOL;

$feriados = [
    '2015-12-25',
    '2015-12-26',
    '2016-01-01'
];

echo getDiasUteis('2015-12-07', '2016-01-08', $feriados); // 23
```

Perceba que em nenhum dos exemplos anteriores me importei com a formatação da data, utilizei o formato que normalmente é utilizado pelo banco de dados por padrão, isso por que a seguir veremos algumas maneiras de formatar datas.

## Formatando datas

É comum quando estamos desenvolvendo algum sistema e precisamos converter datas, por exemplo, do formato do banco de dados para o formato do Brasil, ou vice-versa. Para isso o PHP permite executar essa tarefa de diferentes maneiras, a seguir vou mostrar algumas formas de formatar utilizando funções de data e outras utilizando funções do PHP que não são especificamente para se trabalhar com datas, mas que também funciona :).

Utilizando a classe `DateTime()`

```php
<?php

$data = '2016-01-01';
$dateTime = DateTime::createFromFormat('Y-m-d', $data);
$dataFormatada = $dateTime->format('d/m/Y');
echo $dataFormatada; // 01/01/2016

echo PHP_EOL;

$data = '01/01/2016';
$dateTime = DateTime::createFromFormat('d/m/Y', $data);
$dataFormatada = $dateTime->format('Y-m-d');
echo $dataFormatada; // 2016-01-01
```

Convertendo para o formato do Brasil com o `strtotime()`

```php
<?php

$data = '2016-01-01';
$dataFormatada = strtotime('d/m/Y', strtotime($data));

echo $dataFormatada; // 01/01/2016
```

Outra forma bem simples é utilizando algumas funções de `array`

```php
<?php

$data = '2016-01-01';
$dataFormatada = implode('/', array_reverse(explode('-', $data)));
echo $dataFormatada; // 01/01/2016

echo PHP_EOL;

$data = '01/01/2016';
$dataFormatada = implode('-', array_reverse(explode('/', $data)));
echo $dataFormatada; // 2016-01-01
```

## Traduzindo datas com `strftime()`

Podemos utilizar a função `strftime()` para exibir as datas em português, já que por padrão as funções retornam as descrições em inglês, para fazer isso precisamos primeiramente configurar o local com a função `setlocale()` e então utilizar a função `strftime()` passando o formato e o *timestamp* como parâmetros para formatar a data, lembrando que o *timezone* deve estar configurado também.

```php
<?php

$tsAtual = time(); // pega timestamp atual

setlocale(LC_ALL, 'pt_BR', 'pt_BR.utf-8', 'portuguese');
$dataTraduzida = strftime('%A, %d de %B de %Y', $tsAtual);

echo $dataTraduzida; // quinta-feira, 11 de fevereiro de 2016

echo PHP_EOL;

$dtInput = strtotime('2015-12-25'); // pega timestamp da data

setlocale(LC_ALL, 'pt_BR', 'pt_BR.utf-8', 'portuguese');
$dataTraduzida = strftime('%A, %d de %B de %Y', $dtInput);

echo $dataTraduzida; // sexta-feira, 25 de dezembro de 2015
```

## Utilizando mais `strtotime()` e `DateTime()`

A função `strtotime()` e a classe `DateTime()` realmente nos ajudam muito a trabalhar com datas, por isso vou mostrar mais algumas de suas funcionalidades, pois acho bem legal a forma que podemos interagir com essas duas ferramentas do PHP.

```php
<?php

echo date("d/m/Y", strtotime("next monday")) . PHP_EOL;
echo date("d/m/Y H:i:s", strtotime("2016-01-01 tomorrow noon")) . PHP_EOL;
echo date("d/m/Y H:i:s", strtotime("2016-01-01 tomorrow noon +1 day")) . PHP_EOL;
echo date("d/m/Y", strtotime("2016-01-01 last friday")) . PHP_EOL;

// Saída
// 15/02/2016
// 02/01/2016 12:00:00
// 03/01/2016 12:00:00
// 25/12/2015

$dateTime = new DateTime("now");
echo date("d/m/Y H:i:s", $dateTime->getTimestamp()) . PHP_EOL;

$dateTime = new DateTime("now +1 month +2 days");
echo date("d/m/Y H:i:s", $dateTime->getTimestamp()) . PHP_EOL;

$dateTime = new DateTime("today -3 days");
echo date("d/m/Y", $dateTime->getTimestamp()) . PHP_EOL;

$dateTime = new DateTime("yesterday +1 day");
echo date("d/m/Y", $dateTime->getTimestamp()) . PHP_EOL;

// Saída
// 11/02/2016 22:33:30
// 13/03/2016 22:33:30
// 08/02/2016
// 11/02/2016
```

## Mais informações

É fundamental entender cada função utilizada nesse *post* para que se possa ter cada vez mais facilidade para manipular datas. **Lembrando** que é sempre importante validar as datas antes fazer alguma manipulação, nos exemplos desse *post* não estou validando pois o principal intuído é mostrar como podemos trabalhar com datas.

Nos *links* a seguir podemos encontrar mais informações sobre cada uma das funções de data utilizadas nos exemplos.

- [`date()`](http://php.net/manual/pt_BR/function.date.php)
- [`strtotime()`](http://php.net/manual/pt_BR/function.strtotime.php)
- [`time()`](http://php.net/manual/pt_BR/function.time.php)
- [`mktime()`](http://php.net/manual/pt_BR/function.mktime.php)
- [`strftime()`](http://br1.php.net/manual/pt_BR/function.strftime.php)
- [`DateTime()`](http://php.net/manual/en/class.datetime.php)
