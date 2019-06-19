<template>
  <div class="row my-4" v-if="!isAddingCurrency">
    <div class="col-12">
      <input
        type="button"
        class="btn btn-block btn-success"
        @click="toggleAddCurrency(true)"
        value="Add More Currencies"
      >
    </div>
  </div>
  <div class="row my-4" v-else>
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
            @click="addCurrency()"
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
      selectedCurrency: "",
      isAddingCurrency: false
    };
  },
  computed: {
    ...mapGetters("currencies", ["getAvailableExchanges"])
  },
  methods: {
    toggleAddCurrency(isAddingCurrency: boolean) {
      this.isAddingCurrency = isAddingCurrency;
    },
    addCurrency() {
      this.$store.dispatch("currencies/fetchCurrencies", this.selectedCurrency);
      this.toggleAddCurrency(false);
    }
  }
});
</script>

<style scoped lang="scss">
</style>
