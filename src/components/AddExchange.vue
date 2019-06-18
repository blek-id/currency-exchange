<template>
  <!-- <div class="row">
    <div class="col-12">
      <input type="button" class="btn btn-block btn-success" value="Add More Currencies">
    </div>
  </div>-->
  <div class="row">
    <div class="col-12">
      <div class="input-group row no-gutters">
        <select class="form-control col-9">
          <option value>1</option>
        </select>
        <div class="input-group-append col-3">
          <input class="btn btn-outline-success btn-block" type="button" value="Submit">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AddExchange"
});
</script>

<style scoped lang="scss">
</style>
