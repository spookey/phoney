<template>
  <div class="content">
    <div class="field has-addons">
      <div class="control">
        <span
          class="select is-medium"
          :class="accentClass"
        >
          <label for="country-select">
            <select @change="enteredCountry">
              <option
                v-for="opt in countryOptions"
                :key="opt.value"
                :value="opt.value"
                :selected="opt.selected"
              >
                {{ opt.label }}
              </option>
            </select>
          </label>
        </span>
      </div>
      <div class="control is-expanded">
        <label for="number-input">
          <input
            ref="numberInput"
            class="input is-medium"
            :class="accentClass"
            placeholder="number"
            type="tel"
            :value="entryNumber"
            @input="enteredNumber"
          />
        </label>
      </div>
      <div class="control">
        <div
          class="button is-medium"
          :class="accentClass"
          @click="theClick"
          @keyup="theClick"
        >
          <span class="icon is-small">
            <FaIcon :icon="theIcon" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCountries, getCountryCallingCode } from 'libphonenumber-js/mobile';

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
  emits: ['enteredCountry', 'enteredNumber'],
  data: () => ({
    labelByCountry: true,
  }),
  computed: {
    countryOptions() {
      const makeLabel = (cty) => {
        const pre = `+${getCountryCallingCode(cty)}`;
        if (this.labelByCountry) {
          return `${cty} (${pre})`;
        }
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
    accentClass() {
      return this.isValid ? '' : this.$conf.accentClass;
    },
    theIcon() {
      if (this.isValid) {
        return 'fa-solid fa-trash';
      }
      return 'fa-solid fa-paint-brush';
    },
  },
  mounted() {
    this.$refs.numberInput.focus();
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
