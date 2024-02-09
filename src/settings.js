export default (name) => {
  const defaults = {
    defaultCountry: 'NL',
    errorClass: 'is-danger',
  };

  return fetch(process.env.BASE_URL + (name || 'config.json'))
    .then((res) => res.json())
    .then((data) => ({
      install(app) {
        // eslint-disable-next-line no-param-reassign
        app.config.globalProperties.$conf = {
          ...defaults,
          ...data,
        };
      },
    }));
};
