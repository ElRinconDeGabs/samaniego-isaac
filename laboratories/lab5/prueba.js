(() => {
  const App = {
    htmlElements: {
      form: docmuent.getElementById(""),
      resp: docmuent.getElementById(""),
    },
    init() {
      App.bindEvents();
    },
    bindEvents() {
      App.htmlElements.form.addEventListener(
        "submit",
        App.handlers.onFormSubmit
      );
    },
    handlers: {
      onFormSubmit(e) {
        e.preventDefault();

        App.render();
      },
    },
    methods: {},
    render() {
      App.htmlElements.resp.textContent = result;
    },
  };
  App.init();
})();
