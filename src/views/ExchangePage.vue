<template>
  <div class="container-fluid">
    <base-currency/>
    <exchange-currency/>
    <exchange-currency/>
    <exchange-currency/>
    <exchange-currency/>
    <exchange-currency/>
    <add-exchange/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BaseCurrency from "@/components/BaseCurrency.vue";
import ExchangeCurrency from "@/components/ExchangeCurrency.vue";
import AddExchange from "@/components/AddExchange.vue";
export default Vue.extend({
  name: "exchange",
  components: {
    BaseCurrency,
    ExchangeCurrency,
    AddExchange
  }
});
</script>
