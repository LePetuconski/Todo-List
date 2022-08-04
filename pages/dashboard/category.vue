<template>
  <div class="container mt-6">

    <notifications group="category" position="bottom right" :max="3" />

    <Card title="Categories">
      
      <template v-slot:card-list>
        <li class="list-group-item" v-show="cats.length == 0">
          <Alert type="warning" message="You <strong>haven't created</strong> categories yet! Create right now." />
        </li>

        <li class="list-group-item" v-for="cat in cats" :key="cat.id">
          <div class="todo-indicator bg-success"></div>
          <div class="widget-content p-0">
            <div class="widget-content-wrapper">
              <div class="widget-content-left ml-2">
                <div class="widget-heading">{{ cat.title }}
                </div>
                <div class="widget-subheading">{{ new Date(cat.createdAt).toLocaleDateString('pt-BR', { hour: 'numeric', minute: 'numeric' }) }}</div>
              </div>
              <div class="widget-content-right">

                <button @click="editTitle = cat.title" data-toggle="modal" :data-target="'#edit-' + cat.id" class="border-0 btn-transition btn btn-outline-success"> 
                  <i class="fas fa-pen"></i>
                </button> 

                <div class="modal hide" :id="'edit-' + cat.id" tabindex="0" role="dialog" aria-labelledby="editTask" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document" style="width: 650px;">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit category</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>

                      <form method="post" @submit.prevent="editCat(cat.id)">
                        <div class="modal-body">
                          
                          <div class="form-group mb-3">
                            <div class="input-group input-group-merge input-group-alternative">
                              <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-pencil-alt"></i></span>
                              </div>
                              
                              <input 
                                v-model="editTitle"
                                minLength="3" 
                                maxLength="15" 
                                class="form-control"
                                placeholder="Enter the category title"
                                type="text" id="edit-category-title" name="category" required />
                            </div>
                          </div>

                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <button @click="deleteCat(cat.id)" class="border-0 btn-transition btn btn-outline-danger"> 
                  <i class="fa fa-trash"></i>
                </button> 

              </div>
            </div>
          </div>
        </li>
      </template>

      <template v-slot:card-content>

        <div class="d-block text-right card-footer">
          <NuxtLink to="/dashboard" class="mr-2 btn btn-link btn-sm">Cancel</NuxtLink>
          <button class="btn btn-primary" data-toggle="modal" data-target="#addCategory">Add Category</button>
        </div>

        <Modal id="addCategory" title="Add category" :form="true" :event="createCat">
          <template v-slot:modal-body>
            <div class="form-group mb-3">
              <div class="input-group input-group-merge input-group-alternative">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-pencil-alt"></i></span>
                </div>
                
                <input 
                  v-model="title"
                  minLength="3" 
                  maxLength="15" 
                  class="form-control"
                  placeholder="Enter the category title"
                  type="text" id="category-title" name="category" required />
              </div>
            </div>
          </template>
        </Modal>

      </template>

    </Card>

  </div>
</template>

<script>

import Alert from '~/components/Alert'
import Card from '~/components/Card'
import Modal from '~/components/Modal'

import { mapGetters } from 'vuex'

export default {

  components: {
    Alert, Card, Modal
  },

  data() {
    return {
      cats: '',
      title: '',
      editTitle: ''
    }
  },

  computed: {
    ...mapGetters(['loggedInUser'])
  },

  created() {
    this.getCats()
  },

  methods: {

    async getCats() {

      try {
        let categories = await this.$axios.get(`/categoria/${this.loggedInUser.id}`)
        this.cats = categories.data.response
      } catch (err) {
        this.$notify({
          group: 'category',
          title: 'An <strong>error</strong> has occurred!',
          text: err.response.data.erro,
          type: 'error',
          duration: 2500,
          speed: 300
        })
      }

    },

    async createCat() {

      try {

        await this.$axios.post('/categoria', {
          title: this.title, userId: this.loggedInUser.id
        })

        this.getCats()

        this.$notify({
          group: 'category',
          title: 'Category added <strong>successfully!</strong>',
          type: 'success',
          duration: 2500,
          speed: 300
        })

        $('#addCategory').modal('hide')

      } catch (err) {
        this.$notify({
          group: 'category',
          title: 'An <strong>error</strong> has occurred!',
          text: err.response.data.erro,
          type: 'error',
          duration: 2500,
          speed: 300
        })
      }

    },

    async deleteCat(catId){
           
      let confirm = window.confirm('Do you really want to delete this category?') // true or false

      if (confirm) {
        
        try {
          
          await this.$axios.delete(`/categoria/${catId}`)
  
          this.$notify({
            group: 'category',
            title: 'Category deleted <strong>succesfully</strong>!',
            type: 'success',
            duration: 2500,
            speed: 300
          })
  
          this.getCats()
  
        } catch (err) {
          this.$notify({
            group: 'category',
            title: 'An <strong>error</strong> has occurred!',
            text: err.response.data.erro,
            type: 'error',
            duration: 2500,
            speed: 300
          })
        }
      }

    },

    async editCat(catId) {

      try {

        await this.$axios.put(`/categoria/${catId}`, {
          title: this.editTitle, userId: this.loggedInUser.id
        })

        this.getCats()

        this.$notify({
          group: 'category',
          title: 'Category edited <strong>successfully!</strong>',
          type: 'success',
          duration: 2500,
          speed: 300
        })

        $(`#edit-${catId}`).modal('hide')

      } catch (err) {
        this.$notify({
          group: 'category',
          title: 'An <strong>error</strong> has occurred!',
          text: err.response.data.erro,
          type: 'error',
          duration: 2500,
          speed: 300
        })
      }

    },

  }

}

</script>

<style scoped src="~/assets/css/cardlist.css"></style>