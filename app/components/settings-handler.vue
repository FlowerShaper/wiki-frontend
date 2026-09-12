<script setup lang="ts">
import { watch } from 'vue';

import { settings } from '~/utils/state';

watch(() => settings.theme, UpdateTheme)
UpdateTheme();

function UpdateTheme() {
	document.documentElement.setAttribute('data-theme', settings.theme);
}
</script>

<template />