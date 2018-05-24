<?php

namespace Blog\Github;

class Config
{

    /** @var string */
    private $owner;

    /** @var string */
    private $repository;

    /** @var string */
    private $directory;

    public function __construct(string $owner, string $repository, string $directory)
    {
        $this->owner      = $owner;
        $this->repository = $repository;
        $this->directory  = $directory;
    }

    /**
     * @return string
     */
    public function getOwner(): string
    {
        return $this->owner;
    }

    /**
     * @return string
     */
    public function getRepository(): string
    {
        return $this->repository;
    }

    /**
     * @return string
     */
    public function getDirectory(): string
    {
        return $this->directory;
    }
}