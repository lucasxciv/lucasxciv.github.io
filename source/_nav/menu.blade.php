<nav class="hidden lg:flex items-center text-center text-sm mt-4">
    <a title="{{ $page->siteName }} Blog" href="/"
        class="mx-3 text-base01 hover:text-base1 {{ $page->getPath() === '/' ? 'active underline' : '' }}">
        Blog
    </a>

    <a title="{{ $page->siteName }} About" href="/about"
        class="mx-3 text-base01 hover:text-base1 {{ $page->isActive('/about') ? 'active underline' : '' }}">
        About
    </a>

    <a title="{{ $page->siteName }} Contact"
       href="{{ $page->socialLinkedin }}"
       target="_blank"
       class="mx-3 text-base01 hover:text-base1">
        LinkedIn <sup><i class="fa-solid fa-arrow-up-right-from-square opacity-50"></i></sup>
    </a>

    <a title="{{ $page->siteName }} Contact"
       href="{{ $page->socialGithub }}"
       target="_blank"
       class="mx-3 text-base01 hover:text-base1">
        GitHub <sup><i class="fa-solid fa-arrow-up-right-from-square opacity-50"></i></sup>
    </a>

    <a title="{{ $page->siteName }} Contact"
       href="{{ $page->socialTwitter}}"
       target="_blank"
       class="mx-3 text-base01 hover:text-base1">
        Twitter <sup><i class="fa-solid fa-arrow-up-right-from-square opacity-50"></i></sup>
    </a>

    <a title="{{ $page->siteName }} Contact"
       href="{{ $page->socialNostr }}"
       target="_blank"
       class="mx-3 text-base01 hover:text-base1">
        Nostr <sup><i class="fa-solid fa-arrow-up-right-from-square opacity-50"></i></sup>
    </a>

    <a title="{{ $page->siteName }} Contact"
       href="{{ $page->socialStackoverflow }}"
       target="_blank"
       class="mx-3 text-base01 hover:text-base1">
        Stack Overflow <sup><i class="fa-solid fa-arrow-up-right-from-square opacity-50"></i></sup>
    </a>
</nav>
