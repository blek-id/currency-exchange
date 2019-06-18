<template>
  <div class="row bg-light">
    <div class="col-12">
      <div class="row py-3">
        <div class="col-12">
          <span>USD - United State Dollars</span>
        </div>
      </div>
      <form class="row border-bottom pb-3">
        <div class="col-4 my-auto">
          <span>USD</span>
        </div>
        <div class="col-8">
          <input type="number" placeholder="0.00" id="baseCurrency" class="form-control">
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "BaseCurrency"
});
</script>

<style scoped lang="scss">
</style>
