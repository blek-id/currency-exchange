<template>
  <div class="row bg-light">
    <div class="col-12">
      <div class="row py-3">
        <div class="col-12">
          <span class="font-italic">USD - United State Dollars</span>
        </div>
      </div>
      <form class="row border-bottom pb-3">
        <div class="col-4 my-auto">
          <span class="h2">USD</span>
        </div>
        <div class="col-8">
          <input type="number" placeholder="0.00" v-model="baseAmount" class="form-control">
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';

export default Vue.extend({
  name: 'BaseCurrency',
  computed: {
    baseAmount: {
      get(): number {
        return this.$store.state.currencies.message;
      },
      set(value: number) {
        this.$store.commit('currencies/setBaseAmount', value);
      },
    },
  },
});
</script>

<style scoped lang="scss">
</style>
