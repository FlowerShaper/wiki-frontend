<template>
    <div class="overlap-grid mx-auto min-h-[calc(100vh-4rem)] w-full pt-16 2xl:w-page">
        <slot></slot>
    </div>

    <div class="pointer-events-none fixed left-0 top-0 z-20 h-screen w-screen">
        <ProfileOverlay />
        <SearchOverlay />
    </div>

    <NavigationBar />
    <FooterBar />
</template>
