<template>
  <div class="row d-flex justify-content-center">
    <div class="col-md-8">
      <div class="card-hover-shadow-2x mb-3 card">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-lg text-capitalize font-weight-normal"><i
              class="fa fa-tasks"></i>&nbsp;{{ title }}</div>
        </div>
        <div class="scroll-area-sm">
          <div style="position: static;" class="ps ps--active-y">
            <div class="ps-content">
              <ul class="list-group list-group-flush">
                <slot name="card-list"></slot>
              </ul>
            </div>
          </div>
        </div>

        <slot name="card-content"></slot>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>