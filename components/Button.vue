<template>
  <div>
    <button :class="_class" :data-target="id" data-toggle="modal" v-if="!click">
      <slot></slot>
    </button>
    <button :class="_class" :data-target="id" data-toggle="modal" @click="click" v-else>
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    _class: { required: true },
    id: { required: true },
    click: { required: false },
  }
}
</script>