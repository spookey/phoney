<template>
  <section class="section">
    <div class="container">
      <NumberEntry
        :entry-country="country || entryCountry"
        :entry-number="number || entryNumber"
        :is-valid="isValid"
        @entered-country="enteredCountry"
        @entered-number="enteredNumber"
      />
    </div>
  </section>
  <section class="section">
    <div class="container">
      <ActionButtons
        :is-valid="isValid"
        :country="country || ''"
        :country-calling-code="countryCallingCode || ''"
        :number="number || ''"
        :national-number="nationalNumber || ''"
      />
    </div>
  </section>
</template>

<script>
import { getCountryCallingCode, parsePhoneNumber } from 'libphonenumber-js/mobile';

import ActionButtons from './components/ActionButtons.vue';
import NumberEntry from './components/NumberEntry.vue';

export default {
  name: 'App',
  components: {
    ActionButtons,
    NumberEntry,
  },
  data: () => ({
    entryCountry: '',
    entryNumber: '',
    labelByCountry: true,
  }),
  computed: {
    object() {
      try {
        return parsePhoneNumber(this.entryNumber, {
          defaultCountry: this.entryCountry,
          extract: true,
        });
        // eslint-disable-next-line no-unused-vars
      } catch (ex) {
        return null;
      }
    },
    isValid() {
      return !!this.object && this.object.isValid();
    },
    country() {
      return this.isValid ? this.object.country : null;
    },
    countryCallingCode() {
      return this.isValid ? this.object.countryCallingCode : null;
    },
    number() {
      return this.isValid ? this.object.number : null;
    },
    nationalNumber() {
      return this.isValid ? this.object.nationalNumber : null;
    },
  },
  created() {
    const params = new URLSearchParams(window.location.search);
    this.enteredCountry(params.get('c'));
    this.enteredNumber(params.get('n'));
  },
  methods: {
    validCountry(value) {
      try {
        const country = value.toUpperCase();
        getCountryCallingCode(country);
        return country;
        // eslint-disable-next-line no-unused-vars
      } catch (ex) {
        return this.$conf.defaultCountry;
      }
    },
    enteredCountry(value) {
      this.entryCountry = this.validCountry(value);
    },
    enteredNumber(value) {
      this.entryNumber = value || '';
    },
  },
};
</script>

<style lang="scss">
@use 'bulma/bulma.scss';
</style>
