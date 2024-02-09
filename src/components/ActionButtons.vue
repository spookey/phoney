<template>
  <div class="content">
    <div class="columns is-mobile">
      <div
        class="column is-half"
        v-for="names in [$conf.buttonsLeft, $conf.buttonsRight]"
        :key="names"
      >
        <div class="columns is-mobile is-multiline">
          <div
            class="column is-full"
            v-for="elem in buttons(names)"
            :key="elem.text"
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
    defined() {
      const make = (text, icon, href) => ({ text, icon, href });

      return {
        fax: make(
          'Fax',
          'fa-solid fa-fax',
          `fax:${this.number}`,
        ),
        phone: make(
          'Phone',
          'fa-solid fa-phone',
          `tel:${this.number}`,
        ),
        signal: make(
          'Signal',
          'fa-brands fa-signal-messenger',
          `sgnl://signal.me/#p/${this.number}`,
        ),
        sip: make(
          'SIP',
          'fa-solid fa-phone-flip',
          `sip:${this.number}`,
        ),
        skype: make(
          'Skype',
          'fa-brands fa-skype',
          `skype:${this.number}`,
        ),
        sms: make(
          'SMS',
          'fa-solid fa-sms',
          `sms:${this.number}`,
        ),
        telegram: make(
          'Telegram',
          'fa-brands fa-telegram',
          `tg://resolve?phone=${this.countryCallingCode}${this.nationalNumber}`,
        ),
        viber: make(
          'Viber',
          'fa-brands fa-viber',
          `viber://chat/?number=${encodeURIComponent(this.number)}`,
        ),
        whatsapp: make(
          'WhatsApp',
          'fa-brands fa-whatsapp',
          `whatsapp://send?phone=${this.countryCallingCode}${this.nationalNumber}`,
        ),
      };
    },
  },
  methods: {
    buttons(names) {
      if (!this.isValid) { return []; }

      return names
        .map((name) => this.defined[name])
        .filter((button) => !!button);
    },
  },
};
</script>
