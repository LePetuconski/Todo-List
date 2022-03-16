<template>
    <div :class="'alert alert-' + type">
        {{ message }}
    </div>   
</template>

<script>
    export default {
        name: 'Alert',
        props: ['type', 'message']
    }
</script>
