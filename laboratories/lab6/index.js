(() => {
  const App = {
    data() {
      return {
        mail: "admin@admin.com",
        passw: "12345678",
        loggedIn: false,
      };
    },
    htmlElements: {
      form: document.getElementById("login-form"),
      resp: document.getElementById("render"),
    },
    init() {
      App.bindEvents();
      App.checkLoginStatus();
    },
    bindEvents() {
      App.htmlElements.form.addEventListener(
        "submit",
        App.handlers.onFormSubmit.bind(App)
      );
    },
    handlers: {
      onFormSubmit(e) {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;
        App.methods.checkCredentials(email, pass);
      },
    },
    methods: {
      checkCredentials(email, pass) {
        const { mail, passw } = App.data();
        if (email === mail && pass === passw) {
          localStorage.setItem("loggedIn", "true");
          App.data().loggedIn = true;
          window.location.href = "loggin.html";
        } else {
            App.render("Incorrect email or password.");
        }
      },
      checkLoginStatus() {
        const loggedIn = localStorage.getItem("loggedIn");
        if (loggedIn === "true") {
          App.data().loggedIn = true;
          App.render("User is already logged in.");
        }
      },
    },
    render(message) {
      const alertDiv = this.htmlElements.resp;
      alertDiv.textContent = message;
      alertDiv.style.display = "block"; 
    },
  };
  App.init();
})();
