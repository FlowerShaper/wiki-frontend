<template>
    <UError
        redirect="/editor"
        :error="{
            status: 404,
            statusText: 'Page not found',
        }"
    />
</template>
