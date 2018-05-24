<?php

namespace Blog;

interface PostRepositoryInterface
{

    /**
     * @return Post[]
     */
    public function findAll() : array;
}
