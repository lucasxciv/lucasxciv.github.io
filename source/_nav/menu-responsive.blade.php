<nav id="js-nav-menu" class="w-auto px-2 pt-6 pb-2 bg-base2 shadow hidden lg:hidden">
    <ul class="my-0">
        <li class="pl-4">
            <a
                title="{{ $page->siteName }} Blog"
                href="/"
                class="block mt-0 mb-4 text-sm text-base01 hover:text-base1 {{ $page->getPath() === '/' ? 'underline' : '' }}"
            >Blog</a>
        </li>
        <li class="pl-4">
            <a
                title="{{ $page->siteName }} About"
                href="/about"
                class="block mt-0 mb-4 text-sm text-base01 hover:text-base1 {{ $page->isActive('/about') ? 'underline' : 'text-base01 hover:text-base1' }}"
            >About</a>
        </li>
        <li class="pl-4">
            <a
                title="{{ $page->siteName }} Contact"
                href="{{ $page->socialLinkedin }}"
                target="_blank"
                class="block mt-0 mb-4 text-sm no-underline text-base01 hover:text-base1"
            >LinkedIn <sup><i class="fa-solid fa-arrow-up-right-from-square opacity-50"></i></sup></a>
        </li>
        <li class="pl-4">
            <a
                title="{{ $page->siteName }} Contact"
                href="{{ $page->socialGithub }}"
                target="_blank"
                class="block mt-0 mb-4 text-sm no-underline text-base01 hover:text-base1"
            >GitHub <sup><i class="fa-solid fa-arrow-up-right-from-square opacity-50"></i></sup></a>
        </li>
        <li class="pl-4">
            <a
                title="{{ $page->siteName }} Contact"
                href="{{ $page->socialTwitter }}"
                target="_blank"
                class="block mt-0 mb-4 text-sm no-underline text-base01 hover:text-base1"
            >Twitter <sup><i class="fa-solid fa-arrow-up-right-from-square opacity-50"></i></sup></a>
        </li>
        <li class="pl-4">
            <a
                title="{{ $page->siteName }} Contact"
                href="{{ $page->socialNostr }}"
                target="_blank"
                class="block mt-0 mb-4 text-sm no-underline text-base01 hover:text-base1"
            >Nostr <sup><i class="fa-solid fa-arrow-up-right-from-square opacity-50"></i></sup></a>
        </li>
        <li class="pl-4">
            <a
                title="{{ $page->siteName }} Contact"
                href="{{ $page->socialStackoverflow }}"
                target="_blank"
                class="block mt-0 mb-4 text-sm no-underline text-base01 hover:text-base1"
            >Stack Overflow <sup><i class="fa-solid fa-arrow-up-right-from-square opacity-50"></i></sup></a>
        </li>
    </ul>
</nav>
