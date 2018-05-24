<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Blog\GetPost;
use Slim\App;

(new Dotenv\Dotenv(__DIR__ . '/..'))->load();

$app = new App();

require_once __DIR__ . '/../config/container.php';

$app->get('/', function (Request $request, Response $response) {
    /** @var GetPost $getPost */
    $getPost = $this->get(GetPost::class);

    return $this->view->render($response, 'index.html.twig', [
        'posts' => $getPost->all()
    ]);
});

$app->get('/blog/{slug}', function (Request $request, Response $response, array $args) {
    /** @var GetPost $getPost */
    $getPost = $this->get(GetPost::class);

    return $this->view->render($response, 'post.html.twig', [
        'post' => $getPost->oneBySlug($args['slug'])
    ]);
});

$app->run();
