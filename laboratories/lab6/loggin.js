// JavaScript
(() => {
  const App = {
    htmlElements: {
      content: document.getElementById("info"),
      logoutButton: document.getElementById("logout-button"), 
        },
    init() {
      this.checkLoginStatus();
      this.bindEvents();
    },
    bindEvents() {
      this.htmlElements.logoutButton.addEventListener(
        "click",
        this.methods.logout.bind(this)
      );
    },
    checkLoginStatus() {
      const loggedIn = localStorage.getItem("loggedIn");
      if (loggedIn === "true") {
        this.render("User is logged in.");
      } else {
        window.location.href = "index.html"
      }
    },
    render(message) {
      this.htmlElements.content.textContent = message;
    },
    methods: {
      logout() {
        localStorage.removeItem("loggedIn");
        window.location.href = "index.html";
      },
    },
  };
  App.init();
})();
