<template>
    <div class="w-screen h-screen flex flex-col items-center justify-center">
        <ClientOnly>
            <slot></slot>
        </ClientOnly>
    </div>
</template>
