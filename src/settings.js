const ldef = (lst, def) => (!!lst && lst.length ? lst : def);

export default (name) => {
  const defaults = {
    accentClass: 'is-danger',
    buttonsLeft: ['phone', 'sip', 'sms', 'fax'],
    buttonsRight: ['whatsapp', 'telegram', 'signal', 'viber', 'skype'],
    defaultCountry: 'NL',
  };

  return fetch(import.meta.env.BASE_URL + (name || 'config.json'))
    .then((res) => res.json())
    .then((data) => ({
      install(app) {
        app.config.globalProperties.$conf = {
          ...defaults,
          ...data,
          buttonsLeft: ldef(data.buttonsLeft, defaults.buttonsLeft),
          buttonsRight: ldef(data.buttonsRight, defaults.buttonsRight),
        };
      },
    }));
};
