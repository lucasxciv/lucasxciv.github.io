<div class="flex flex-col mb-4">
    <p class="text-base00 font-medium my-2">
        {{ $post->getDate()->format('F j, Y') }}
    </p>

    <h2 class="text-3xl mt-0">
        <a
            href="{{ $post->getUrl() }}"
            title="Read more - {{ $post->title }}"
            class="text-base01 hover:text-base1 font-extrabold"
        >{{ $post->title }}</a>
    </h2>

    <p class="mb-4 mt-0 text-base01">{!! $post->getExcerpt(200) !!}</p>

    <a
        href="{{ $post->getUrl() }}"
        title="Read more - {{ $post->title }}"
        class="font-semibold tracking-wide mb-2 text-base01 hover:text-base1"
    >Read more »</a>
</div>
