(() => {
  function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
      let chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return hash;
  }

  const App = {
    htmlElements: {
      form: document.getElementById("registration-form"),
      name: document.getElementById("name"),
      ["last-name"]: document.getElementById("last-name"),
      username: document.getElementById("username"),
      password: document.getElementById("pass"),
      msgMistakeUser: document.getElementById("msg-mistake-user"),
      msgMistakePass: document.getElementById("msg-mistake-pass"),
    },
    init() {
      this.bindEvents();
      this.populateUserData();
    },
    bindEvents() {
      this.htmlElements.form.addEventListener(
        "submit",
        this.handlers.onFormSubmit.bind(this)
      );
    },
    populateUserData() {
      const loggedInUser = this.methods.getLoggedInUserData();

      if (loggedInUser) {
        this.htmlElements.name.value = loggedInUser.name;
        this.htmlElements["last-name"].value = loggedInUser["last-name"];
        this.htmlElements.username.value = loggedInUser.username;
      }
    },
    handlers: {
      onFormSubmit(e) {
        e.preventDefault();

        const name = this.htmlElements.name.value;
        const lname = this.htmlElements.lname.value;
        const username = this.htmlElements.username.value;
        let password = this.htmlElements.password.value;

        if (!name || !lname || !username || !password) {
          return;
        }

        if (!this.methods.validatePassword(password)) {
          this.methods.showErrorMessage(
            this.htmlElements.msgMistakePass,
            "La contraseña debe tener al menos 8 caracteres y contener caracteres especiales, números, mayúsculas y minúsculas."
          );
          return;
        }

        password = hashCode(password);

        const updatedUser = {
          name: name,
          lname: lname,
          username: username,
          password: password,
        };

        this.methods.updateUserInLocalStorage(updatedUser);

        window.location.href = "tracker-view.html";
      },
    },
    methods: {
      validatePassword(password) {
        const passwordRegex =
          /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordRegex.test(password);
      },
      getLoggedInUserData() {
        const loggedInUsername = localStorage.getItem("loggedInUser");
        const users = this.getFromLocalStorage();
        const loggedInUser = users.find(
          (user) => user.username === loggedInUsername
        );
        return loggedInUser;
      },
      getFromLocalStorage() {
        return JSON.parse(localStorage.getItem("users")) || [];
      },
      updateUserInLocalStorage(updatedUser) {
        let users = this.getFromLocalStorage();
        const loggedInUsername = localStorage.getItem("loggedInUser");

        users = users.map((user) => {
          if (user.username === loggedInUsername) {
            return updatedUser;
          } else {
            return user;
          }
        });

        localStorage.setItem("users", JSON.stringify(users));
      },
      showErrorMessage(element, message) {
        element.textContent = message;
        element.style.display = "block";
      },
    },
  };

  App.init();
})();
