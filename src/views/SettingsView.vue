<template>
  <div class="page settings">
    <b-tabs class="tabs" pills card>
      <b-tab title="Account" active>
        <div class="tab">
          In development
        </div>
      </b-tab>
      <b-tab title="Notification">In development</b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.settings {

  .card-header {
    background: none;

    .nav-pills .nav-link {
      color: $second-dark-color;
      font-weight: 500;
      white-space: nowrap;
    }

    .nav-pills .nav-link.active {
      color: $green-color;
      outline: 3px solid $green-color;
      background: none;
      border-radius: $main-rounded;
    }
  }
}

</style>
<style lang="scss" scoped>
.tabs {

}
</style>
