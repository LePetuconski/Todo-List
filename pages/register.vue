<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <div class="card bg-secondary border-0 mb-0 mt-7">
          <div class="card-body px-lg-5 py-lg-5">
            <div class="text-center text-muted mb-4">
              <small>Sign up with credentials</small>
            </div>

            <Alert :type="type" :message="message" /> <!-- alerta dinamico -->

            <form method="post" @submit.prevent="register">

              <div class="form-group mb-3">
                <div class="input-group input-group-merge input-group-alternative">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="ni ni-single-02"></i></span>
                  </div>
                  <input class="form-control" placeholder="Username" type="text" v-model="username"> <!--valor a uma variavel-->
                </div>
              </div>

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

              <div class="text-center">
                <button type="submit" class="btn btn-primary my-4">Sign up</button><br/>
                <small class="text-muted">Or <NuxtLink to="/login">click here</NuxtLink> to login an account</small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <style scoped>
 Tudo que eu editar no css vai para esse código acima
</style> !-->

<script>

import Alert from '~/components/Alert.vue'

export default {

  middleware:'guest',

  components: {
    Alert
  },

    data() { //armazenar var
        return{
            username:'',
            email: '',
            password: '',
            type: '',
            message: '',
            counter: 1
        }
    },

    methods: {
      async register(){
        try {
          
          await this.$axios.post('/registro', { //sempre que for requisitar um site usar o axios (lib)
              nome: this.username, email: this.email, password: this.password
            })

            this.type = 'success'
            this.message = 'Conta criada com sucesso!'

            setTimeout(()=> {
              this.$router.push('/login')
            }, 3000)

        } catch (err){
          console.log(err.response)
          this.type = 'danger'
          this.message = err.response.data.erro
        }
      }
    }

}


</script>
