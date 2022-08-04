<template>
  <div class="modal hide" :id="id" tabindex="0" role="dialog" :aria-labelledby="title"
    aria-hidden="true">
    <div :class="['modal-dialog modal-dialog-centered', size]" role="document" style="width: 650px;">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

          <form method="post" @submit.prevent="event" v-if="form">
            <div class="modal-body">
              <slot name="modal-body"></slot>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
          </form>

          <div class="modal-body" v-else>
            <slot name="modal-body"></slot>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    id: { type: String },
    title: { type: String },
    size: { type: String, default: '', required: false },
    form: { type: Boolean, default: true, required: false },
    event: { required: false  }
  }

}
</script>