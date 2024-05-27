(() => {
  const App = {
    htmlElements: {
      form: document.getElementById("login-form"),
      username: document.getElementById("username"),
      password: document.getElementById("pass"),
      message: document.getElementById("message"),
      msgMistake: document.getElementById("msg-mistake"),
    },
    init() {
      this.bindEvents();
    },
    bindEvents() {
      this.htmlElements.form.addEventListener(
        "submit",
        this.handlers.onFormSubmit.bind(this)
      );
    },
    handlers: {
      onFormSubmit(e) {
        e.preventDefault();

        const username = App.htmlElements.username.value;
        const password = App.htmlElements.password.value;

        const users = App.methods.getFromLocalStorage();
        const user = users.find((user) => user.username === username);

        if (!user) {
          App.methods.showErrorMessage("Nombre de usuario no encontrado.");
          return;
        }

        const hashedPassword = App.methods.simpleHash(password);

        if (user.pass !== hashedPassword) {
          App.methods.showErrorMessage("Contraseña incorrecta.");
          return;
        }

        App.methods.saveLoginStatus(username);
        window.location.href = "tracker-view.html";
      },
    },
    methods: {
      getFromLocalStorage() {
        return JSON.parse(localStorage.getItem("users")) || [];
      },
      simpleHash(str) {
        let hash = 0;
        for (let i = 0, len = str.length; i < len; i++) {
          let chr = str.charCodeAt(i);
          hash = (hash << 5) - hash + chr;
          hash |= 0;
        }
        return hash.toString();
      },
      showErrorMessage(message) {
        App.htmlElements.message.style.display = "block";
        App.htmlElements.msgMistake.textContent = message;
        App.htmlElements.msgMistake.style.color = "red";
      },
      saveLoginStatus(username) {
        localStorage.setItem("loggedInUser", username);
      },
    },
  };
  document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      window.location.href = "tracker-view.html";
    } else {
      App.init();
    }
  });
})();
