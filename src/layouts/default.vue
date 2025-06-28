<template>
    <div class="overlap-grid w-full 2xl:w-page mx-auto min-h-[calc(100vh-4rem)] pt-16">
        <slot></slot>
    </div>

    <div class="fixed top-0 left-0 w-screen h-screen pointer-events-none z-20">
        <ProfileOverlay />
    </div>

    <NavigationBar />
    <FooterBar />
</template>
