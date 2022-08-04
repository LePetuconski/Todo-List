<template>
  <div>

    <button data-toggle="modal" data-target="#teste">Clique aqui</button>

    <Modal id="teste" title="Simples Modal" :event="post" size="modal-lg">
      <template v-slot:modal-body>
        <input type="text" placeholder="Olá, mundo!">
      </template>
    </Modal>

  </div>
</template>

<script>

import Modal from '~/components/Modal'

export default {
  components: {
    Modal
  },
  methods: {
    post(){
      console.log('Olá, mundo!');
    }
  }
}
</script>