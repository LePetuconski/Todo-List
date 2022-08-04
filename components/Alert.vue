<template>
  <!-- dynamic alert -->
  <div :class="'alert alert-' + type">
    <div v-html="message"></div>
  </div>
</template>

<script>
  export default {
    name: 'Alert',
    props: ['type', 'message']
  }
</script>
