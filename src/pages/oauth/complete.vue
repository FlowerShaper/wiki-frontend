<script setup lang="ts">
definePageMeta({
    layout: 'auth',
});

window.addEventListener('message', (event) => {
    if (!event.source) {
        console.log('no source');
        return;
    }

    console.log('source: ', event.origin);
    console.log('current: ', window.location.origin);

    // make sure the sender is the same url
    if (event.origin !== window.location.origin) {
        console.log("origin doesn't match, aborting for security reasons");
        event.source.postMessage({ error: "Origins don't match." });
        return;
    }

    event.source!.postMessage(GetQueryParams());
});

function GetQueryParams() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search || url.hash.replace('#', ''));
    return Object.fromEntries(params.entries());
}
</script>

<template>
    <h1 class="text-lg font-semibold">Connecting...</h1>
</template>
