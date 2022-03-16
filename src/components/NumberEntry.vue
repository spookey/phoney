<template>
  <div class="content">
    <div class="field has-addons">
      <div class="control">
        <span
          class="select is-medium"
          :class="errorClass"
        >
          <select
            @change="enteredCountry"
          >
            <option
              v-for="opt in countryOptions"
              :key="opt.value"
              :value="opt.value"
              :selected="opt.selected"
            >
              {{ opt.label }}
            </option>
          </select>
        </span>
      </div>
      <div class="control is-expanded">
        <input
          class="input is-medium"
          :class="errorClass"
          placeholder="number"
          type="tel"
          :value="entryNumber"
          @input="enteredNumber"
        />
      </div>
      <div class="control">
        <div
          class="button is-medium"
          :class="errorClass"
          @click="theClick"
          @keyup="theClick"
        >
          <span class="icon is-small">
            <FaIcon
              :icon="theIcon"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCountries,
  getCountryCallingCode,
} from 'libphonenumber-js/mobile';

import conf from '../conf';

export default {
  name: 'NumberEntry',
  props: {
    entryCountry: {
      type: String,
      required: true,
    },
    entryNumber: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    labelByCountry: true,
  }),
  computed: {
    countryOptions() {
      const makeLabel = (cty) => {
        const pre = `+${getCountryCallingCode(cty)}`;
        if (this.labelByCountry) { return `${cty} (${pre})`; }
        return `${pre} (${cty})`;
      };
      const elems = getCountries().map((country) => ({
        value: country,
        label: makeLabel(country),
        selected: this.entryCountry === country,
      }));
      elems.sort((aa, zz) => aa.label >= zz.label);
      return elems;
    },
    errorClass() {
      return this.isValid ? '' : conf.errorClass;
    },
    theIcon() {
      return ['fas', this.isValid ? 'trash' : 'paint-brush'];
    },
  },
  methods: {
    emitEnteredNumber(value) {
      this.$emit('enteredNumber', value);
    },
    enteredCountry(event) {
      this.$emit('enteredCountry', event.target.value);
    },
    enteredNumber(event) {
      this.emitEnteredNumber(event.target.value);
    },
    theClick() {
      if (this.isValid) {
        this.emitEnteredNumber('');
      } else {
        this.labelByCountry = !this.labelByCountry;
      }
    },
  },
};
</script>
