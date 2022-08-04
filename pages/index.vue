<template>
  <div id="app" class="row no-gutters flex-container">
    <div class="col-md-3 flex-item" data-aos="fade-right" data-aos-duration="2500">
      <div class="flex-title">
        <h1 class="text-white" style="font-size: 38.42px;">Welcome to<br />Todo list.</h1><br />
        <small class="description-text mb-3"> Our to-do list allows you to <br>have a unique experience.<br>For free.</small><br><br>
        <button class="try-button">Try now</button>
      </div>
    </div>

    <div class="flex-navbar" data-aos="fade-up-left" data-aos-duration="1500">

      <nav class="navbar navbar-expand-lg" style="background-color: #ffffff;">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <NuxtLink class="nav-link mr-3" to="/register"><i class="fa-solid fa-circle-user mr-2"></i>Sign Up <span
                class="sr-only">(current)</span>
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/login"><i class="fa-solid fa-user mr-2"></i>Sign In</NuxtLink>
            </li>
          </ul>
        </div>
      </nav>

      <div class="container">
        <img src="https://i.imgur.com/cUEuEUf.png" class="img-fluid main-image" width="800" height="887"
          data-aos="flip-up" data-aos-duration="1500" />
      </div>

    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'IndexPage',
    layout: 'empty',
    computed: {
      ...mapGetters(['loggedInUser', 'isAuthenticated'])
    },

    head: {
      link: [{
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css',
          integrity: 'sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm',
          crossorigin: 'anonymous'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
          integrity: 'sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==',
          crossorigin: 'anonymous',
          referrerpolicy: 'no-referrer'
        }
      ],
    }

  }

</script>

<style src="~/assets/css/custom.css" scoped></style>
