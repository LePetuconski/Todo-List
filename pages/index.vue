<template>
  <div>
    <p>Home</p>
    
  </div> 
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'IndexPage',
  computed: {
    ...mapGetters(['loggedInUser'])
  }
}
</script>
