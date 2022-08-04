<template>
  <nav class="navbar navbar-horizontal navbar-expand-lg navbar-dark" style="background-color: #9545ed; border-color: #9545ed;">
    <div class="container">
      <NuxtLink class="navbar-brand" to="/">To-Do List</NuxtLink>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-default"
        aria-controls="navbar-default" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar-default">
        <div class="navbar-collapse-header">
          <div class="row">
            <div class="col-6 collapse-brand">
              <!-- <a href="javascript:void(0)">
                            <img src="../../assets-old/img/brand/blue.png">
                        </a> -->
            </div>
            <div class="col-6 collapse-close">
              <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar-default"
                aria-controls="navbar-default" aria-expanded="false" aria-label="Toggle navigation">
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>

        <form @submit.prevent="search" class="navbar-search navbar-search-light form-inline mr-sm-3 ml-auto mr-auto" id="navbar-search-main">
          <div class="form-group mb-0">
            <div class="input-group input-group-alternative input-group-merge">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-search"></i></span>
              </div>
              <input class="form-control" placeholder="Search" type="text" v-model="query">
            </div>
          </div>
          <button type="button" class="close" data-action="search-close" data-target="#navbar-search-main" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </form>

        <ul class="navbar-nav ml-lg-auto" v-if="isAuthenticated">

          <li class="nav-item" v-if="isAuthenticated">
            <NuxtLink to="/dashboard" class="nav-link nav-link-icon" data-toggle="tooltip" data-placement="bottom" title="Dashboard">
              <i class="far fa-list-alt fa-lg"></i>
              <span class="nav-link-inner--text d-lg-none">Dashboard</span>
            </NuxtLink>
          </li>

          <li class="nav-item" v-if="isAuthenticated">
            <NuxtLink to="/dashboard/category" class="nav-link nav-link-icon" data-toggle="tooltip" data-placement="bottom" title="Category">
              <i class="ni ni-tag fa-lg"></i>
              <span class="nav-link-inner--text d-lg-none">Category</span>
            </NuxtLink>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <a class="nav-link nav-link-icon" @click="$auth.logout()" data-toggle="tooltip" data-placement="bottom" title="Logout">
              <i class="fas fa-sign-out-alt fa-lg"></i>
              <span class="nav-link-inner--text d-lg-none">Logout</span>
            </a>
          </li>
        </ul>
        <ul class="navbar-nav ml-lg-auto" v-else>
          <li class="nav-item">
            <NuxtLink class="nav-link nav-link-icon" to="/login">
              <i class="fas fa-sign-in-alt fa-lg"></i>
              <span class="nav-link-inner--text d-lg-none">Login</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

import { mapGetters } from 'vuex'

export default {

  data() {
    return {
      query: '',
      data: ''
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated']) // true or false
  },

  mounted: () => {
    $('[data-toggle="tooltip"]').tooltip()
  },

  methods: {

    async search() {

      try {
        const response = await this.$axios.get(`/search?q=${this.query}`)
        this.data = response.data.response
        console.log(this.data);
      } catch (err) {
        console.log(err)
      }

    }

  }

}

</script>
