<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <div class="card bg-secondary border-0 mb-0 mt-7" data-aos-duration="1000" data-aos="flip-right">
          <div class="card-body px-lg-5 py-lg-5">
            <div class="text-center text-muted">
              <small>Sign in with credentials</small>
            </div>

            <Alert :type="type" :message="message" />

            <form method="post" @submit.prevent="login">
              <div class="form-group mb-3">
                <div class="input-group input-group-merge input-group-alternative">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                  </div>
                  <input class="form-control" placeholder="Email" type="email" v-model="email">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group input-group-merge input-group-alternative">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                  </div>
                  <input class="form-control" placeholder="Password" type="password" v-model="password">
                </div>
              </div>
              <div class="custom-control custom-control-alternative custom-checkbox">
                <input class="custom-control-input" id=" customCheckLogin" type="checkbox">
                <label class="custom-control-label" for=" customCheckLogin">
                  <span class="text-muted">Remember me</span>
                </label>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary my-4">Sign in</button><br />
                <small class="text-muted">Or <NuxtLink to="/register">click here</NuxtLink> to create an account</small>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Alert from '~/components/Alert'

export default {

  middleware: 'guest',

  components: {
    Alert
  },

  data() {
    return {
      email: '',
      password: '',
      type: '',
      message: '',
      counter: 1
    }
  },

  methods: {

    async login() {

      try {

        let a = await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })

        console.log(a);

        this.type = 'success'
        this.message = 'Logado com sucesso! Redirecionando em 3s'

        setTimeout(() => {
          this.$router.push('/dashboard')
        }, 3000)

      } catch (err) {
        this.type = 'danger' // error
        this.message = err.response.data.erro
      }

    }

  }

}

</script>