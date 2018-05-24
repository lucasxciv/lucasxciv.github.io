<?php

namespace Blog\Exception;

class PostNotFound extends \RuntimeException
{

    public static function fromSlug(string $slug) : self
    {
        return new self(sprintf('Can not found post with slug "%s"', $slug));
    }
}
