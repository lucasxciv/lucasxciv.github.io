<?php

namespace Blog\Github;

use Blog\Post;
use Blog\PostRepositoryInterface;
use League\CommonMark\CommonMarkConverter;

class GithubPostRepository implements PostRepositoryInterface
{

    /** @var string */
    private const GITHUB_API_REPO = 'https://api.github.com/repos/%s/%s/contents/%s';

    /** @var int */
    private const SIZE_FORMATTED_MD = 2;

    /** @var Config */
    private $config;

    public function __construct(Config $config)
    {
        $this->config = $config;
    }

    public function findAll(): array
    {
        $apiUrl = vsprintf(static::GITHUB_API_REPO, [
            $this->config->getOwner(),
            $this->config->getRepository(),
            $this->config->getDirectory()
        ]);

        $options = [
            'http' => [
                'method' => 'GET',
                'header' => [
                    'User-Agent: php-blog'
                ]
            ]
        ];

        $context = stream_context_create($options);

        $response = json_decode(file_get_contents($apiUrl, false, $context), true);

        $posts = [];

        foreach ((array)$response as $postFileData) {
            $rawContent = file_get_contents($postFileData['download_url']);

            $arrContent = explode('----------', $rawContent);

            if (\count($arrContent) !== static::SIZE_FORMATTED_MD) {
                throw new \RuntimeException('Invalid markdown format');
            }

            $postInfo = json_decode(str_replace(['```json', '```'], '', $arrContent[0]), true);

            $commonMarkConverter = new CommonMarkConverter();

            $content = $commonMarkConverter->convertToHtml($arrContent[1]);

            $posts[] = new Post($postInfo['title'], $content, $postInfo['categories'], $postInfo['date']);
        }

        return array_reverse($posts);
    }
}
