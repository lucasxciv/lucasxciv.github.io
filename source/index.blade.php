---
title: Blog
description: The list of blog posts published by @lucasxciv.
pagination:
    collection: posts
    perPage: 12
---
@extends('_layouts.main')

@section('body')

    @foreach ($pagination->items as $post)
        @include('_components.post-preview-inline')

        @if ($post != $pagination->items->last())
            <hr class="border-b-base2 my-6">
        @endif
    @endforeach

    @if ($pagination->pages->count() > 1)
        <nav class="flex text-base my-8">
            @if ($previous = $pagination->previous)
                <a
                    href="{{ $previous }}"
                    title="Previous Page"
                    class="bg-base2 text-base01 hover:text-base1 rounded mr-3 px-5 py-3"
                >&LeftArrow;</a>
            @endif

            @foreach ($pagination->pages as $pageNumber => $path)
                <a
                    href="{{ $path }}"
                    title="Go to Page {{ $pageNumber }}"
                    class="bg-base2 hover:text-base1 rounded mr-3 px-5 py-3 {{ $pagination->currentPage == $pageNumber ? 'text-base01 underline shadow' : 'text-base01' }}"
                >{{ $pageNumber }}</a>
            @endforeach

                @if ($next = $pagination->next)
                    <a
                        href="{{ $next }}"
                        title="Next Page"
                        class="bg-base2 text-base01 hover:text-base1 rounded mr-3 px-5 py-3"
                    >&RightArrow;</a>
                @endif
        </nav>
    @endif
@stop
