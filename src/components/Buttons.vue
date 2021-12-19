<template>
  <div class="content">
    <div class="columns is-multiline">
      <div
        class="column is-full"
        v-for="elem in linkButtons"
        :key="elem.href"
      >
        <a
          class="button is-medium is-fullwidth"
          :href="elem.href"
          target="_blank"
        >
          <span class="icon is-small">
            <Icon
              :icon="elem.icon"
            />
          </span>
          <span>
            {{ elem.text }}
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Buttons',
  props: {
    isValid: {
      type: Boolean,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    countryCallingCode: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    nationalNumber: {
      type: String,
      required: true,
    },
  },
  computed: {
    linkButtons() {
      const make = (text, icon, href) => ({ text, icon, href });

      if (!this.isValid) { return []; }
      return [
        make(
          'Phone', ['fas', 'phone'],
          `tel:${this.number}`,
        ),
        make(
          'SMS', ['fas', 'sms'],
          `sms:${this.number}`,
        ),
        make(
          'Fax', ['fas', 'fax'],
          `fax:${this.number}`,
        ),
        make(
          'WhatsApp', ['fab', 'whatsapp'],
          `whatsapp://send?phone=${this.countryCallingCode}${this.nationalNumber}`,
        ),
        make(
          'Viber', ['fab', 'viber'],
          `viber://chat/?number=${encodeURIComponent(this.number)}`,
        ),
        make(
          'Skype', ['fab', 'skype'],
          `skype:${this.number}`,
        ),
      ];
    },
  },
};
</script>
