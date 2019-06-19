<template>
  <div class="container-fluid">
    <base-currency/>
    <div v-for="currency in getCurrencies" :key="currency.code">
      <exchange-currency :target-currency="currency" v-if="currency.code !== ''"/>
    </div>
    <add-exchange/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BaseCurrency from "@/components/BaseCurrency.vue";
import ExchangeCurrency from "@/components/ExchangeCurrency.vue";
import AddExchange from "@/components/AddExchange.vue";

import { mapGetters } from "vuex";

export default Vue.extend({
  name: "exchange",
  components: {
    BaseCurrency,
    ExchangeCurrency,
    AddExchange
  },
  computed: mapGetters("currencies", ["getCurrencies"])
});
</script>
