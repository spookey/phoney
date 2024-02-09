<template>
  <div class="content">
    <div class="columns is-mobile is-multiline">
      <div
        class="column is-half"
        v-for="elem in linkButtons"
        :key="elem.href"
      >
        <a
          class="button is-medium is-fullwidth"
          :href="elem.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="icon is-small">
            <FaIcon
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
  name: 'ActionButtons',
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
          'Phone',
          'fa-solid fa-phone',
          `tel:${this.number}`,
        ),
        make(
          'WhatsApp',
          'fa-brands fa-whatsapp',
          `whatsapp://send?phone=${this.countryCallingCode}${this.nationalNumber}`,
        ),
        make(
          'SIP',
          'fa-solid fa-phone-flip',
          `sip:${this.number}`,
        ),
        make(
          'Signal',
          'fa-brands fa-signal-messenger',
          `sgnl://signal.me/#p/${this.number}`,
        ),
        make(
          'SMS',
          'fa-solid fa-sms',
          `sms:${this.number}`,
        ),
        make(
          'Viber',
          'fa-brands fa-viber',
          `viber://chat/?number=${encodeURIComponent(this.number)}`,
        ),
        make(
          'Fax',
          'fa-solid fa-fax',
          `fax:${this.number}`,
        ),
        make(
          'Skype',
          'fa-brands fa-skype',
          `skype:${this.number}`,
        ),
      ];
    },
  },
};
</script>
