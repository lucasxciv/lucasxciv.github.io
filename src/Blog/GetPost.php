<?php

namespace Blog;

use Psr\SimpleCache\CacheInterface;

class GetPost
{

    /** @var string */
    private const CACHE_KEY = 'posts';

    /** @var int */
    private const CACHE_LIFETIME_INFINITE = 0;

    /** @var PostRepositoryInterface */
    private $postRepository;

    /** @var CacheInterface */
    private $cache;

    public function __construct(PostRepositoryInterface $postRepository, CacheInterface $cache)
    {
        $this->postRepository = $postRepository;
        $this->cache = $cache;
    }

    /**
     * @return array
     * @throws \Psr\SimpleCache\InvalidArgumentException
     */
    public function all() : array
    {
        if ($this->cache->has(static::CACHE_KEY)) {
            return $this->cache->get(static::CACHE_KEY);
        }

        $posts = $this->postRepository->findAll();

        $this->cache->set(static::CACHE_KEY, $posts, static::CACHE_LIFETIME_INFINITE);

        return $posts;
    }

    public function oneBySlug(string $slug) : Post
    {
        $posts = $this->all();

        foreach ($posts as $post) {
            if ($post->getSlug() === $slug) {
                return $post;
            }
        }

        throw Exception\PostNotFound::fromSlug($slug);
    }
}
