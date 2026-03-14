<script setup lang="ts">
// Redirect /recipes → /recipe (footer links here)
await navigateTo('/recipe', { redirectCode: 301 })
</script>
<template><div /></template>
