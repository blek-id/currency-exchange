<template>
  <div class="row mx-auto my-3 border border-dark rounded">
    <div class="col-10 col-md-11">
      <div class="row my-1">
        <div class="col-6">
          <span>{{exchangeCurrency.code}}</span>
        </div>
        <div class="col-6 text-right">
          <span>{{formatCurrency(exchangeCurrency.exchangeAmount)}}</span>
        </div>
      </div>
      <div class="row my-1">
        <div class="col-12">
          <span>{{exchangeCurrency.name}}</span>
        </div>
      </div>
      <div class="row my-1">
        <div class="col-12">
          <span>1 USD = {{exchangeCurrency.code}} {{exchangeCurrency.rateAgainstBase}}</span>
        </div>
      </div>
    </div>
    <div
      class="col-2 col-md-1 d-flex justify-content-center align-items-center btn btn-danger rounded-0"
      @click="destroyCurrency(exchangeCurrency.code)"
    >
      <font-awesome-icon icon="times" size="lg" class="color-white"/>
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
    exchangeCurrency: Object as () => CurrencyModel
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
</style>
