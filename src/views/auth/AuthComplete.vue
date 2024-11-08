<script setup lang="ts">
window.addEventListener("message", (event) => {
    if (!event.source) {
        console.log('no source');
        return;
    }

    console.log('source: ', event.origin);
    console.log('current: ', window.location.origin);

    // make sure the sender is the same url
    if (event.origin !== window.location.origin) {
        console.log('origin doesn\'t match, aborting for security reasons');
        event.source.postMessage({ 'error': "Origins don't match." })
        return;
    }

    event.source.postMessage(GetQueryParams());
});

function GetQueryParams() {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search || url.hash.replace('#', ''));
    return Object.fromEntries(params.entries());
}
</script>