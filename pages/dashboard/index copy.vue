<template>
  <div class="container mt-6">
    
    <notifications group="dashboard" position="bottom right" :max="3" />

    <Card title="Task Lists">

    </Card>

    <div class="row d-flex justify-content-center">
      <div class="col-md-8">
        <div class="card-hover-shadow-2x mb-3 card">
          <div class="card-header-tab card-header">
            <div class="card-header-title font-size-lg text-capitalize font-weight-normal"><i
                class="fa fa-tasks"></i>&nbsp;Task Lists</div>
          </div>
          <div class="scroll-area-sm">
            <div style="position: static;" class="ps ps--active-y">
              <div class="ps-content">
                <ul class="list-group list-group-flush">

                  <li class="list-group-item" v-show="none">
                    <Alert type="warning" message="You <strong>haven't created</strong> tasks yet! Create right now." />
                  </li>

                  <li class="list-group-item" v-for="task in tasks" :key="task.id">
                    <div class="todo-indicator bg-warning" v-if="task.status == 'Pending'"></div>
                    <div class="todo-indicator bg-success" v-else></div>
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">
                        <div class="widget-content-left mr-2">
                          <div class="custom-checkbox custom-control"> <input class="custom-control-input"
                            :id="'checkbox-' + task.id" type="checkbox" :checked="task.status == 'Done'" @change="setStatus(task.id, $event)"><label class="custom-control-label"
                            :for="'checkbox-' + task.id">&nbsp;</label> 
                          </div>
                        </div>
                        <div class="widget-content-left">

                          <a type="button" data-toggle="modal" :data-target="'#show-' + task.id" class="widget-heading" v-if="task.status == 'Pending'">{{ task.title }} <div class="badge badge-pill badge-warning ml-2">
                            {{ task.status }}</div>
                          </a>
                          <a type="button" data-toggle="modal" :data-target="'#show-' + task.id" class="widget-heading" v-else>{{ task.title }} <div class="badge badge-pill badge-success ml-2">
                            {{ task.status }}</div>
                          </a>

                          <div class="widget-subheading">{{ task['category.title'] }} - ({{ new Date(task.date).toLocaleDateString('pt-BR', { hour: 'numeric', minute: 'numeric' }) }})</div>
                        </div>
                        <div class="widget-content-right"> 

                          <button @click="setData(task.title, task.content, task.date, task.categoryId)" data-toggle="modal" :data-target="'#edit-' + task.id" class="border-0 btn-transition btn btn-outline-success"> <i class="fas fa-pen"></i></button> 
                          <button @click="deleteTask(task.id)" class="border-0 btn-transition btn btn-outline-danger"> <i class="fa fa-trash"></i></button> 

                          <div class="modal hide" :id="'edit-' + task.id" tabindex="0" role="dialog" aria-labelledby="editTask" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="width: 650px;">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="exampleModalLabel">Edit task</h5>
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <form action="post" @submit.prevent="editTask(task.id)">
                                  <div class="modal-body">
                                    
                                    <div class="form-group mb-3">
                                      <div class="input-group input-group-merge input-group-alternative">
                                        <div class="input-group-prepend">
                                          <span class="input-group-text"><i class="fas fa-pencil-alt"></i></span>
                                        </div>
                                        
                                        <input 
                                          v-model="editTitle"
                                          minLength="10" 
                                          maxLength="120" 
                                          class="form-control"
                                          type="text" id="task-title" name="title" required/>
                                      </div>
                                    </div>

                                    <div class="form-group mb-3">
                                      <tinymce :id="'editor-' + task.id" v-model="editContent" :plugins="plugins" :other_options="options"></tinymce>
                                    </div>

                                    <div class="form-group mb-3">
                                      <div class="input-group input-group-merge input-group-alternative">
                                        <div class="input-group-prepend">
                                          <span class="input-group-text"><i class="ni ni-calendar-grid-58"></i></span>
                                        </div>
                                        <input class="form-control" v-model="editDatetime" type="datetime-local">
                                      </div>
                                    </div>

                                    <center>
                                      <small class="text-muted mb-3"><NuxtLink to="/dashboard/category" onClick="$('#addTask').modal('hide')">Click here</NuxtLink> to create a category or select:</small>
                                    </center>
                                    
                                    <div class="row d-flex justify-content-center mt-2">
                                      <div class="col-md-6">
                                        <div class="form-group mb-2">
                                          <div class="input-group input-group-merge input-group-alternative">
                                            <div class="input-group-prepend">
                                              <span class="input-group-text"><i class="ni ni-bullet-list-67"></i></span>
                                            </div>

                                            <select class="form-control" v-model="editCategory">
                                              <option v-for="cat in cats" :key="cat.id" :value="cat.id">
                                                {{ cat.title }}
                                              </option>
                                            </select>

                                          </div>
                                        </div>
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

                        </div>
                      </div>
                    </div>

                    <div class="modal fade" :id="'show-' + task.id" tabindex="-1" role="dialog" aria-labelledby="show" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{{ task.title }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body" v-html="task.content">
                            
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>     

                </ul>
              </div>
            </div>
          </div>
          
          <div class="d-block text-right card-footer"><button class="mr-2 btn btn-link btn-sm">Cancel</button>
          <button class="btn btn-primary" data-toggle="modal" data-target="#addTask">Add Task</button></div>
          
          <div class="modal hide" id="addTask" tabindex="0" role="dialog" aria-labelledby="addTask" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="width: 650px;">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Create task</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form action="post" @submit.prevent="createTask">
                  <div class="modal-body">
                    
                    <div class="form-group mb-3">
                      <div class="input-group input-group-merge input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-pencil-alt"></i></span>
                        </div>
                        
                        <input 
                          v-model="title"
                          minLength="10" 
                          maxLength="120" 
                          class="form-control"
                          placeholder="Tasks to do tomorrow..." type="text" id="task-title" name="title" required/>
                      </div>
                    </div>

                    <div class="form-group mb-3">
                      <tinymce id="d1" v-model="content" :plugins="plugins" :other_options="options"></tinymce>
                    </div>

                    <div class="form-group mb-3">
                      <div class="input-group input-group-merge input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="ni ni-calendar-grid-58"></i></span>
                        </div>
                        <input class="form-control" v-model="datetime" type="datetime-local" id="example-datetime-local-input">
                      </div>
                    </div>

                    <center>
                      <small class="text-muted mb-3"><NuxtLink to="/dashboard/category" onClick="$('#addTask').modal('hide')">Click here</NuxtLink> to create a category or select:</small>
                    </center>
                    
                    <div class="row d-flex justify-content-center mt-2">
                      <div class="col-md-6">
                        <div class="form-group mb-2">
                          <div class="input-group input-group-merge input-group-alternative">
                            <div class="input-group-prepend">
                              <span class="input-group-text"><i class="ni ni-bullet-list-67"></i></span>
                            </div>

                            <select class="form-control" v-model="category" id="exampleFormControlSelect1" required>

                              <option disabled value="">Select an option</option>

                              <option v-for="cat in cats" :key="cat.id" :value="cat.id">
                                {{ cat.title }}
                              </option>
                              
                            </select>
                          </div>
                        </div>
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

        </div>
      </div>
    </div>

  </div>
</template>

<script>

import Alert from '~/components/Alert'
import Card from '~/components/Card'
import Modal from '~/components/Modal'

import { mapGetters } from 'vuex'

export default {

  middleware: 'auth',

  components: {
    Alert, Card, Modal
  },

  data() {
    return {
      title: '',
      content: '',
      datetime: '2021-11-28T01:31:00',
      category: '',
      tasks: '',
      cats: '',

      none: false,

      editTitle: '',
      editContent: '',
      editDatetime: '',
      editCategory: '',

      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount textcolor colorpicker emoticons'
      ],
      options: {
        branding: false,
        height: 125
      }
    }
  },

  computed: {
    ...mapGetters(['loggedInUser'])
  },

  created() { // ao carregar o site executa a função getTasks()
    this.getTasks()
    this.getCats()
  },

  methods: {

    /* Task Methods */

    async createTask() {

      try { 

        await this.$axios.post('/task', { 
          title: this.title, 
          content: this.content, 
          date: this.datetime,
          userId: this.loggedInUser.id,
          categoryId: this.category
        })

        this.$notify({
          group: 'dashboard',
          title: 'Task added <strong>succesfully</strong>!',
          type: 'success',
          duration: 2500,
          speed: 300
        })

        this.getTasks()

        $('#addTask').modal('hide')

      } catch (err) {

        this.$notify({
          group: 'dashboard',
          title: 'An <strong>error</strong> has occurred!',
          text: err.response.data.erro,
          type: 'error',
          duration: 2500,
          speed: 300
        })

      }

    },

    async getTasks() {

      try {
        
        let response = await this.$axios.get(`/task/${this.loggedInUser.id}`)
        this.tasks = response.data.response
        
        if (this.tasks.length == 0) {
          this.none = true
        } else {
          this.none = false
        }

      } catch (err) {
        this.$notify({
          group: 'dashboard',
          title: 'An <strong>error</strong> has occurred!',
          text: err.response.data.erro,
          type: 'error',
          duration: 2500,
          speed: 300
        })
      }

    },

    async deleteTask(taskId) {

      const confirm = window.confirm('Do you really want to delete this task?')

      if (confirm) {
        try {
          await this.$axios.delete(`/task/${taskId}`)

          this.$notify({
            group: 'dashboard',
            title: 'Task deleted <strong>succesfully</strong>!',
            type: 'success',
            duration: 2500,
            speed: 300
          })

          this.getTasks()

        } catch (err) {
          this.$notify({
            group: 'dashboard',
            title: 'An <strong>error</strong> has occurred!',
            text: err.response.data.erro,
            type: 'error',
            duration: 2500,
            speed: 300
          })
        }
      }

    },

    async setStatus(id, event) {

      try {
        
        if (event.target.checked) {
          await this.$axios.post('/status', { status: 'Done', id })
        } else {
          await this.$axios.post('/status', { status: 'Pending', id })
        }

        this.getTasks()

        this.$notify({
          group: 'dashboard',
          title: 'Status edited <strong>succesfully</strong>!',
          type: 'success',
          duration: 2500,
          speed: 300
        })

      } catch (err) {
        this.$notify({
          group: 'dashboard',
          title: 'An <strong>error</strong> has occurred!',
          text: err.response.data.erro,
          type: 'error',
          duration: 2500,
          speed: 300
        })
      }

    },

    async editTask(taskId) {

      try {
        
        await this.$axios.put(`/task/${taskId}`, {
          title: this.editTitle, content: this.editContent, date: this.editDatetime, categoryId: this.editCategory
        })

        this.getTasks()

        this.$notify({
          group: 'dashboard',
          title: 'Task edited <strong>succesfully</strong>!',
          type: 'success',
          duration: 2500,
          speed: 300
        })

        $(`#edit-${taskId}`).modal('hide')

      } catch (err) {
        this.$notify({
          group: 'dashboard',
          title: 'An <strong>error</strong> has occurred!',
          text: err.response.data.erro,
          type: 'error',
          duration: 2500,
          speed: 300
        })
      }

    },

    setData(title, content, datetime, category) {
      this.editTitle = title
      this.editContent = content
      this.editCategory = category

      let isoDateTime = new Date(
        new Date(datetime).getTime() - (
          new Date(datetime).getTimezoneOffset() * 60000)
        ).toISOString();

      this.editDatetime = isoDateTime.replace('.000Z', '')

    },

    /* Category Methods */

    async getCats() {

      try {
        let categories = await this.$axios.get(`/categoria/${this.loggedInUser.id}`)
        this.cats = categories.data.response
      } catch (err) {
        this.$notify({
          group: 'dashboard',
          title: 'An <strong>error</strong> has occurred!',
          text: err.response.data.erro,
          type: 'error',
          duration: 2500,
          speed: 300
        })
      }

    },

  },

  head: {
    titleTemplate: 'Dashboard | To-Do List'
  }
}

</script>

<style scoped>

  .card {
    box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03), 0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03), 0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05), 0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
    border-width: 0;
    transition: all .2s
  }

  .card-header:first-child {
    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0
  }

  .card-header {
    display: flex;
    align-items: center;
    border-bottom-width: 1px;
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0.625rem;
    height: 3.5rem;
    background-color: #fff
  }

  .widget-subheading {
    color: #858a8e;
    font-size: 10px
  }

  .card-header.card-header-tab .card-header-title {
    display: flex;
    align-items: center;
    white-space: nowrap
  }

  .card-header .header-icon {
    font-size: 1.65rem;
    margin-right: 0.625rem
  }

  .card-header.card-header-tab .card-header-title {
    display: flex;
    align-items: center;
    white-space: nowrap
  }

  .btn-actions-pane-right {
    margin-left: auto;
    white-space: nowrap
  }

  .text-capitalize {
    text-transform: capitalize !important
  }

  .scroll-area-sm {
    height: 288px;
    overflow-x: hidden
  }

  .list-group-item {
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125)
  }

  .list-group {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0
  }

  .todo-indicator {
    position: absolute;
    width: 4px;
    height: 60%;
    border-radius: 0.3rem;
    left: 0.625rem;
    top: 20%;
    opacity: .6;
    transition: opacity .2s
  }

  .bg-warning {
    background-color: #f7b924 !important
  }

  .widget-content {
    padding: 1rem;
    flex-direction: row;
    align-items: center
  }

  .widget-content .widget-content-wrapper {
    display: flex;
    flex: 1;
    position: relative;
    align-items: center
  }

  .widget-content .widget-content-right.widget-content-actions {
    visibility: hidden;
    opacity: 0;
    transition: opacity .2s
  }

  .widget-content .widget-content-right {
    margin-left: auto
  }

  .btn:not(:disabled):not(.disabled) {
    cursor: pointer
  }

  .btn {
    position: relative;
    transition: color 0.15s, background-color 0.15s, border-color 0.15s, box-shadow 0.15s
  }

  .btn-outline-success {
    color: #3ac47d;
    border-color: #3ac47d
  }

  .btn-outline-success:hover {
    color: #fff;
    background-color: #3ac47d;
    border-color: #3ac47d
  }

  .btn-outline-success:hover {
    color: #fff;
    background-color: #3ac47d;
    border-color: #3ac47d
  }

  .card-footer {
    background-color: #fff
  }
</style>