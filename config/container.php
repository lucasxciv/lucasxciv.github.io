<?php

use Blog\GetPost;
use Blog\Github\Config;
use Blog\Github\GithubPostRepository;
use Psr\Container\ContainerInterface;
use Slim\Http\Environment;
use Slim\Http\Uri;
use Slim\Views\Twig;
use Slim\Views\TwigExtension;
use Symfony\Component\Cache\Simple\FilesystemCache;

/** @var ContainerInterface $container */
$container = $app->getContainer();

$container['view'] = function (ContainerInterface $container) {
    $view = new Twig('../templates', [ 'cache' => __DIR__ . '/../data/cache' ]);

    $router = $container->get('router');
    $uri = Uri::createFromEnvironment(new Environment($_SERVER));
    $view->addExtension(new TwigExtension($router, $uri));

    return $view;
};

$container[GetPost::class] = function () {
    $postRepository = new GithubPostRepository(
        new Config(getenv('GITHUB_USER'), getenv('GITHUB_REPOSITORY'), getenv('GITHUB_DIRECTORY'))
    );

    $filesystemCache = new FilesystemCache('blog', 0, __DIR__ . '/../data/cache/');

    return new GetPost($postRepository, $filesystemCache);
};
