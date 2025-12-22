<script setup lang="ts">
import { settings, UpdateSetting } from '~/utils/state';
</script>

<template>
    <SettingsSubBase title="appearance">
        <SettingsToggle
            :toggle="() => UpdateSetting((s) => (s.simpleFont = !s.simpleFont))"
            :active="settings.simpleFont"
            title="simple font"
            description="replaces the monospace font with a simpler, serif one."
        />
    </SettingsSubBase>
</template>
