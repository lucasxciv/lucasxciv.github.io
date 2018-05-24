<?php

namespace Blog;

use Cocur\Slugify\Slugify;

class Post
{

    /** @var string */
    private $title;

    /** @var string */
    private $content;

    /** @var string[] */
    private $categories;

    /** @var string */
    private $slug;

    /** @var \DateTimeImmutable */
    private $postedAt;

    public function __construct(string $title, string $content, array $categories, string $postedAt)
    {
        $this->title      = $title;
        $this->content    = $content;
        $this->categories = $categories;

        $this->slug = Slugify::create()->slugify($title);

        $this->postedAt = new \DateTimeImmutable($postedAt);
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @return string
     */
    public function getContent(): string
    {
        return $this->content;
    }

    /**
     * @return string[]
     */
    public function getCategories(): array
    {
        return $this->categories;
    }

    /**
     * @return string
     */
    public function getSlug(): string
    {
        return $this->slug;
    }

    /**
     * @return \DateTimeImmutable
     */
    public function getPostedAt(): \DateTimeImmutable
    {
        return $this->postedAt;
    }
}
