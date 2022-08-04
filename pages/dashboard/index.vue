<template>
  <div class="container mt-6">

    <notifications group="dashboard" position="bottom right" :max="3" />

    <Card title="Task Lists">
      <template v-slot:card-list>
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
                    :id="'checkbox-' + task.id" type="checkbox" :checked="task.status == 'Done'"
                    @change="setStatus(task.id, $event)"><label class="custom-control-label"
                    :for="'checkbox-' + task.id">&nbsp;</label>
                </div>
              </div>
              <div class="widget-content-left">

                <a type="button" data-toggle="modal" :data-target="'#show-' + task.id" class="widget-heading"
                  v-if="task.status == 'Pending'">{{ task.title }} <div class="badge badge-pill badge-warning ml-2">
                    {{ task.status }}</div>
                </a>
                <a type="button" data-toggle="modal" :data-target="'#show-' + task.id" class="widget-heading"
                  v-else>{{ task.title }} <div class="badge badge-pill badge-success ml-2">
                    {{ task.status }}</div>
                </a>

                <div class="widget-subheading">{{ task['category.title'] }} -
                  ({{ new Date(task.date).toLocaleDateString('pt-BR', { hour: 'numeric', minute: 'numeric' }) }})</div>
              </div>
              <div class="widget-content-right">

                <button @click="setData(task.title, task.content, task.date, task.categoryId, task.id)" data-toggle="modal" :data-target="'#edit-' + task.id" class="border-0 btn-transition btn btn-outline-success"> <i class="fas fa-pen"></i></button> 

                <button @click="deleteTask(task.id)" class="border-0 btn-transition btn btn-outline-danger"> <i
                    class="fa fa-trash"></i></button>

                <Modal :id="'edit-' + task.id" title="Edit task" size="modal-lg" :event="editTask">
                  <template v-slot:modal-body>

                    <div class="form-group mb-3">
                      <div class="input-group input-group-merge input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-pencil-alt"></i></span>
                        </div>

                        <input v-model="editTitle" minLength="10" maxLength="120" class="form-control" type="text"
                          id="task-title" name="title" required />
                      </div>
                    </div>

                    <div class="form-group mb-3">
                      <tinymce :id="'editor-' + task.id" v-model="editContent" :plugins="plugins"
                        :other_options="options"></tinymce>
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
                      <small class="text-muted mb-3">
                        <NuxtLink to="/dashboard/category" onClick="$('#addTask').modal('hide')">Click here
                        </NuxtLink> to create a category or select:
                      </small>
                    </center>

                    <SelectField>
                      <select class="form-control" v-model="editCategory">
                        <option v-for="cat in cats" :key="cat.id" :value="cat.id">
                          {{ cat.title }}
                        </option>
                      </select>
                    </SelectField>
                    
                  </template>
                </Modal>

              </div>
            </div>
          </div>

          <Modal :id="'show-' + task.id" :title="task.title" :form="false">
            <template v-slot:modal-body>
              <div v-html="task.content"></div>
            </template>
          </Modal>

        </li>
      </template>

      <template v-slot:card-content>

        <div class="d-block text-right card-footer">
          <Button _class="btn btn-primary" id="#addTask">Add Task</Button>
        </div>

        <Modal id="addTask" size="modal-lg" title="Create task" :event="createTask">
          <template v-slot:modal-body>
            <div class="form-group mb-3">
              <div class="input-group input-group-merge input-group-alternative">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-pencil-alt"></i></span>
                </div>

                <input v-model="title" minLength="10" maxLength="120" class="form-control"
                  placeholder="Tasks to do tomorrow..." type="text" id="task-title" name="title" required />
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
                <input class="form-control" v-model="datetime" type="datetime-local">
              </div>
            </div>

            <center>
              <small class="text-muted mb-3">
                <NuxtLink to="/dashboard/category" onClick="$('#addTask').modal('hide')">Click here</NuxtLink>
                to create a category or select:
              </small>
            </center>

            <SelectField>
              <select class="form-control" v-model="category" id="exampleFormControlSelect1" required>
                <option disabled value="">Select an option</option>
                <option v-for="cat in cats" :key="cat.id" :value="cat.id">
                  {{ cat.title }}
                </option>
              </select>
            </SelectField>
      
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
  import Button from '~/components/Button'
  import SelectField from '~/components/Select'

  import {
    mapGetters
  } from 'vuex'

  export default {

    middleware: 'auth',

    components: {
      Alert,
      Card,
      Modal,
      Button,
      SelectField
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

        editId: '',
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
            await this.$axios.post('/status', {
              status: 'Done',
              id
            })
          } else {
            await this.$axios.post('/status', {
              status: 'Pending',
              id
            })
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

      async editTask() {

        try {

          await this.$axios.put(`/task/${this.editId}`, {
            title: this.editTitle,
            content: this.editContent,
            date: this.editDatetime,
            categoryId: this.editCategory
          })

          this.getTasks()

          this.$notify({
            group: 'dashboard',
            title: 'Task edited <strong>succesfully</strong>!',
            type: 'success',
            duration: 2500,
            speed: 300
          })

          $(`#edit-${this.editId}`).modal('hide')

        } catch (err) {

          console.log(err);

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

      setData(title, content, datetime, category, id) {
        this.editTitle = title
        this.editContent = content
        this.editCategory = category
        this.editId = id

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

<style scoped src="~/assets/css/cardlist.css"></style>