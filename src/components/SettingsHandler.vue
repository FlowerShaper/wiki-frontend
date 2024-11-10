<script setup lang="ts">
import { watch } from 'vue';

import { settings } from '@/utils/State';

watch(() => settings.theme, UpdateTheme)

UpdateTheme()

function UpdateTheme() {
    document.documentElement.setAttribute('data-theme', settings.theme)
}
</script>