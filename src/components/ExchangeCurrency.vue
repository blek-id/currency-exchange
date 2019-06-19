<template>
  <div class="row mx-auto my-3 border border-dark rounded">
    <div class="col-10 col-md-11">
      <div class="row h4">
        <div class="col-6">
          <span>{{targetCurrency.code}}</span>
        </div>
        <div class="col-6 text-right">
          <span>{{formatCurrency(targetCurrency.exchangeAmount)}}</span>
        </div>
      </div>
      <div class="row font-italic font-weight-bold">
        <div class="col-12">
          <span>{{targetCurrency.code}} - {{targetCurrency.name}}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <span>1 USD = {{targetCurrency.code}} {{targetCurrency.rateAgainstBase}}</span>
        </div>
      </div>
    </div>
    <div
      class="col-2 col-md-1 d-flex justify-content-center align-items-center btn btn-danger rounded-0 pointer-cursor"
      @click="destroyCurrency(targetCurrency.code)"
    >
      <font-awesome-icon icon="minus-circle" size="lg" class="color-white"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { CurrencyModel } from "@/models/CurrencyModel";
import { mapMutations, mapActions } from "vuex";

export default Vue.extend({
  name: "ExchangeCurrency",
  props: {
    targetCurrency: Object as () => CurrencyModel
  },
  methods: {
    formatCurrency(amount: number) {
      return amount.toLocaleString(undefined, { maximumFractionDigits: 2 });
    },
    destroyCurrency(code: string) {
      this.$store.commit("currencies/removeCurrency", code);
      let payload = {
        code: code,
        isActive: false
      };
      this.$store.commit("currencies/updateAvailableExchanges", payload);
    }
  }
});
</script>

<style scoped lang="scss">
.color-white {
  color: white;
}

.pointer-cursor {
  cursor: pointer;
}
</style>
