@extends('_layouts.main')

@php
    $page->type = 'article';
@endphp

@section('body')
    @if ($page->cover_image)
        <img src="{{ $page->cover_image }}" alt="{{ $page->title }} cover image" class="mb-2">
    @endif

    <h1 class="leading-none mb-2 text-base01">{{ $page->title }}</h1>

    <p class="text-base0 text-xl md:mt-0">{{ $page->author }}  •  {{ date('F j, Y', $page->date) }}</p>

    @if ($page->categories)
        @foreach ($page->categories as $i => $category)
            <a
                href="{{ '/blog/categories/' . $category }}"
                title="View posts in {{ $category }}"
                class="inline-block bg-base2 hover:text-base1 leading-loose tracking-wide text-base01 uppercase text-xs font-semibold rounded mr-4 px-3 pt-px"
            >{{ $category }}</a>
        @endforeach
    @endif

    <div class="border-b border-base2 mb-10 pb-4 text-base01" v-pre>
        @yield('content')
    </div>

    <nav class="flex justify-between text-sm md:text-base">
        <div>
            @if ($next = $page->getNext())
                <a href="{{ $next->getUrl() }}" title="Older Post: {{ $next->title }}" class="text-base01 hover:text-base1">
                    &LeftArrow; {{ $next->title }}
                </a>
            @endif
        </div>

        <div>
            @if ($previous = $page->getPrevious())
                <a href="{{ $previous->getUrl() }}" title="Newer Post: {{ $previous->title }}" class="text-base01 hover:text-base1">
                    {{ $previous->title }} &RightArrow;
                </a>
            @endif
        </div>
    </nav>

    <hr />
    <script src="https://giscus.app/client.js"
            data-repo="lucasxciv/lucasxciv.github.io"
            data-repo-id="MDEwOlJlcG9zaXRvcnk0NzYxOTYwMw=="
            data-category="Comments"
            data-category-id="DIC_kwDOAtaeE84CjAD7"
            data-mapping="pathname"
            data-strict="0"
            data-reactions-enabled="1"
            data-emit-metadata="0"
            data-input-position="bottom"
            data-theme="noborder_light"
            data-lang="en"
            crossorigin="anonymous"
            async>
    </script>
@endsection
