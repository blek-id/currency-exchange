<template>
  <!-- <div class="row">
    <div class="col-12">
      <input type="button" class="btn btn-block btn-success" value="Add More Currencies">
    </div>
  </div>-->
  <div class="row">
    <div class="col-12">
      <div class="input-group row no-gutters">
        <select class="form-control col-9" v-model="selectedCurrency">
          <option
            :value="availableExchange.code"
            v-for="availableExchange in getAvailableExchanges"
            :key="availableExchange.code"
          >{{availableExchange.code}}</option>
        </select>
        <div class="input-group-append col-3">
          <input
            class="btn btn-outline-success btn-block"
            type="button"
            @click="fetchCurrencies(selectedCurrency)"
            value="Submit"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default Vue.extend({
  name: "AddExchange",
  data: function() {
    return {
      selectedCurrency: ""
    };
  },
  computed: {
    ...mapGetters("currencies", ["getAvailableExchanges"])
  },
  methods: {
    ...mapActions("currencies", ["fetchCurrencies"])
  }
});
</script>

<style scoped lang="scss">
</style>
