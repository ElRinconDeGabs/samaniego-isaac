const App = {
  htmlElements: {
    userInfoElement: document.getElementById("user-info"),
    valueInput: document.getElementById("value"),
    optionSelect: document.getElementById("option"),
    form: document.getElementById("tracker-form"),
    recordTableBody: document.getElementById("record-table-body"),
    recordTable: document.getElementById("record-table"),
    chartContainer: document.getElementById("chart-container"),
    noDataDiv: document.getElementById("no-data"),
    incomeBar: document.getElementById("income-bar"),
    expenseBar: document.getElementById("expense-bar"),
    logoutButton: document.getElementById("logout-button"),
    logoutButton2: document.getElementById("logout-button2"),
  },
  init() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      window.location.href = "login.html";
    } else {
      this.showUserInfo(loggedInUser);
      this.bindEvents();
      this.showRecords(loggedInUser);
      this.renderChart(loggedInUser);
    }
  },
  showUserInfo(username) {
    this.htmlElements.userInfoElement.textContent = `¡Welcome, ${username}!`;
  },
  bindEvents() {
    this.htmlElements.form.addEventListener(
      "submit",
      this.handlers.onFormSubmit.bind(this)
    );
    this.htmlElements.valueInput.addEventListener(
      "input",
      this.handlers.onValueInputChange.bind(this)
    );
    this.htmlElements.logoutButton.addEventListener(
      "click",
      this.handlers.onLogout.bind(this)
    );
    this.htmlElements.logoutButton2.addEventListener(
      "click",
      this.handlers.onLogout2.bind(this)
    );
  },
  handlers: {
    onFormSubmit(event) {
      event.preventDefault();
      const value = this.htmlElements.valueInput.value;
      const option = this.htmlElements.optionSelect.value;
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (this.validateInput(value, option)) {
        const record = {
          date: new Date().toLocaleDateString(),
          type: option,
          amount: parseInt(value),
          username: loggedInUser,
        };
        this.saveRecord(record);
        this.showRecords(loggedInUser);
        this.renderChart(loggedInUser);
        this.resetForm();
      } else {
        alert("Por favor, ingresa un monto válido y selecciona una opción.");
      }
    },
    onValueInputChange(event) {
      const value = event.target.value;
      if (value !== "" && isNaN(value)) {
        event.target.value = "";
      }
    },
    onLogout() {
      localStorage.removeItem("loggedInUser");
      localStorage.clear();
      window.location.href = "login.html";
    },
    onLogout2() {
      localStorage.removeItem("loggedInUser");
      window.location.href = "login.html";
    },
  },
  validateInput(value, option) {
    return value !== "" && !isNaN(value) && option !== " ";
  },
  saveRecord(record) {
    let records = this.getRecords();
    records.push(record);
    localStorage.setItem("records", JSON.stringify(records));
  },
  getRecords() {
    return JSON.parse(localStorage.getItem("records")) || [];
  },
  resetForm() {
    this.htmlElements.valueInput.value = "";
    this.htmlElements.optionSelect.value = " ";
  },
  showRecords(username) {
    const records = this.getRecords();
    const userRecords = records.filter(
      (record) => record.username === username
    );
    if (userRecords.length === 0) {
      this.htmlElements.recordTable.style.display = "none";
      this.htmlElements.chartContainer.style.display = "none";
      this.htmlElements.noDataDiv.style.display = "block";
    } else {
      this.htmlElements.recordTable.style.display = "block";
      this.htmlElements.chartContainer.style.display = "block";
      this.htmlElements.noDataDiv.style.display = "none";
      this.displayRecords(userRecords);
    }
  },
  displayRecords(records) {
    this.htmlElements.recordTableBody.innerHTML = "";
    records.forEach((record) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${record.date}</td>
        <td>${record.type}</td>
        <td>$${record.amount}</td>
      `;
      this.htmlElements.recordTableBody.appendChild(row);
    });
  },
  renderChart(username) {
    const records = this.getRecords();
    const userRecords = records.filter(
      (record) => record.username === username
    );
    if (userRecords.length === 0) {
      this.htmlElements.chartContainer.style.display = "none";
    } else {
      const incomes = userRecords
        .filter((record) => record.type === "income")
        .reduce((sum, record) => sum + record.amount, 0);
      const expenses = userRecords
        .filter((record) => record.type === "expenses")
        .reduce((sum, record) => sum + record.amount, 0);

      const maxDataValue = Math.max(incomes, expenses);
      const incomeHeight = (incomes / maxDataValue) * 100;
      const expenseHeight = (expenses / maxDataValue) * 100;

      this.htmlElements.incomeBar.style.height = `${incomeHeight}%`;
      this.htmlElements.incomeBar.textContent = `$${incomes}`;
      this.htmlElements.expenseBar.style.height = `${expenseHeight}%`;
      this.htmlElements.expenseBar.textContent = `$${expenses}`;
      this.htmlElements.chartContainer.style.display = "block";
    }
  },
};

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
