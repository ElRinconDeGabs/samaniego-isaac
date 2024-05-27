(() => {
  const App = {
    htmlElements: {
      form: document.getElementById("registration-form"),
      messageUser: document.getElementById("message-user"),
      messagePass: document.getElementById("message-pass"),
      msgMistakeUser: document.getElementById("msg-mistake-user"),
      msgMistakePass: document.getElementById("msg-mistake-pass"),
      userInput: document.getElementById("username"),
      passInput: document.getElementById("pass"),
    },
    init() {
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
        window.location.href = "tracker-view.html";
      } else {
        this.bindEvents();
        this.showUsersInConsole();
        this.htmlElements.userInput.addEventListener("input", () => {
          App.methods.showErrorMessage(
            App.htmlElements.messageUser,
            App.htmlElements.msgMistakeUser,
            "",
            true
          );
        });
        this.htmlElements.passInput.addEventListener("input", () => {
          App.methods.showErrorMessage(
            App.htmlElements.messagePass,
            App.htmlElements.msgMistakePass,
            "",
            true
          );
        });
      }
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

        const formData = new FormData(App.htmlElements.form);
        const data = Object.fromEntries(formData.entries());

        if (!App.methods.validatePassword(data.pass)) {
          App.methods.showErrorMessage(
            App.htmlElements.messagePass,
            App.htmlElements.msgMistakePass,
            "La contraseña debe tener al menos 8 caracteres y contener caracteres especiales, números, mayúsculas y minúsculas."
          );
          return;
        }

        if (App.methods.isUsernameTaken(data.username)) {
          App.methods.showErrorMessage(
            App.htmlElements.messageUser,
            App.htmlElements.msgMistakeUser,
            "El nombre de usuario ya está en uso. Por favor, elige otro."
          );
          return;
        }

        data.pass = App.methods.simpleHash(data.pass);

        App.methods.saveToLocalStorage(data);
        App.showUsersInConsole();
        window.location.href = "login.html"; 
      },
    },
    methods: {
      validatePassword(password) {
        const passwordRegex =
          /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordRegex.test(password);
      },
      isUsernameTaken(username) {
        const users = this.getFromLocalStorage();
        return users.some((user) => user.username === username);
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
      saveToLocalStorage(data) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(data);
        localStorage.setItem("users", JSON.stringify(users));
      },
      getFromLocalStorage() {
        return JSON.parse(localStorage.getItem("users")) || [];
      },
      showErrorMessage(
        messageContainer,
        errorMessageElement,
        message,
        hide = false
      ) {
        if (hide) {
          messageContainer.style.display = "none";
        } else {
          messageContainer.style.display = "block";
          errorMessageElement.textContent = message;
        }
      },
    },
    showUsersInConsole() {
      const users = this.methods.getFromLocalStorage();
      console.log(users);
    },
  };
  App.init();
})();
