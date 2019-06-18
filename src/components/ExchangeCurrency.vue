<template>
  <div class="row mx-auto my-3 border border-dark rounded align-items-center">
    <div class="col-10 col-md-11">
      <div class="row my-1">
        <div class="col-6">
          <span>IDR</span>
        </div>
        <div class="col-6 text-right">
          <span>144,104.50</span>
        </div>
      </div>
      <div class="row my-1">
        <div class="col-12">
          <span>IDR - Indonesian Rupiah</span>
        </div>
      </div>
      <div class="row my-1">
        <div class="col-12">
          <span>1 USD = IDR 14,410.45</span>
        </div>
      </div>
    </div>
    <div class="col-2 col-md-1 bg-danger">
      <font-awesome-icon icon="times" size="lg"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ExchangeCurrency"
});
</script>

<style scoped lang="scss">
.card-height {
  min-height: 5rem;
}
</style>
