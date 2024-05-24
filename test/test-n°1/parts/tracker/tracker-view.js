(() => {
  const App = {
    htmlElements: {
      form: document.getElementById("tracker-form"),
      valueInput: document.getElementById("value"),
      optionSelect: document.getElementById("option"),
      recordTableBody: document.getElementById("record-table-body"),
      userInfo: document.getElementById("user-info"),
    },
    init() {
      this.bindEvents();
      this.showUserInfo = this.showUserInfo.bind(this); // Enlazar explícitamente el contexto correcto
      this.showUserInfo();
      this.renderRecords();
    },
    bindEvents() {
      this.htmlElements.form.addEventListener("submit", (e) =>
        this.handlers.onFormSubmit(e)
      );
    },
    handlers: {
      onFormSubmit(e) {
        e.preventDefault();

        const value = App.htmlElements.valueInput.value;
        const option = App.htmlElements.optionSelect.value;
        const date = new Date().toLocaleString();

        if (!value || option === "Select option") {
          alert("Please fill in all fields.");
          return;
        }

        const record = { date, type: option, amount: parseFloat(value) };
        App.methods.saveRecord(record);
        App.renderRecords();
        App.htmlElements.form.reset();
      },
    },
    methods: {
      saveRecord(record) {
        const records = JSON.parse(localStorage.getItem("records")) || [];
        records.push(record);
        localStorage.setItem("records", JSON.stringify(records));
      },
      getRecords() {
        return JSON.parse(localStorage.getItem("records")) || [];
      },
      saveUser(data) {
        localStorage.setItem("user", JSON.stringify(data));
      },
      getUser() {
        return JSON.parse(localStorage.getItem("user"));
      },
      showUserInfo() {
        const user = this.getUser();
        if (user) {
          this.htmlElements.userInfo.innerHTML = `
              <p>Name: ${user.name}</p>
              <p>Last Name: ${user.lastName}</p>
            `;
        } else {
          this.htmlElements.userInfo.innerHTML =
            "<p>No user information available.</p>";
        }
      },
    },
    renderRecords() {
      const records = this.methods.getRecords();
      const rows = records
        .map(
          (record) => `
              <tr>
                <td>${record.date}</td>
                <td>${record.type}</td>
                <td>${record.amount.toFixed(2)}</td>
              </tr>
            `
        )
        .join("");
      this.htmlElements.recordTableBody.innerHTML = rows;
    },
  };
  App.init();
})();
