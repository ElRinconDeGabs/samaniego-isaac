(() => {
  const App = {
    data: {
      candidates: [],
      usedColors: new Set(),
    },

    htmlElements: {
      form: document.getElementById("newcandi"),
      cardView: document.getElementById("cardview"),
      chart: document.getElementById("chart"),
    },
    init() {
      App.bindEvents();
    },
    bindEvents() {
      App.htmlElements.form.addEventListener("submit", App.handlers.handleForm);
    },
    handlers: {
      handleForm(e) {
        e.preventDefault();
        const candi = e.target.candi.value;
        const color = e.target.color.value;
        App.methods.candidates(candi, color);
        App.render();
        App.renderChart();
        App.data.usedColors.add(color);
      },
      handleVote(index) {
        App.data.candidates[index].votes++;
        App.render();
        App.renderChart();
      },
      handleDelete(index) {
        App.data.candidates.splice(index, 1); // Eliminar al candidato del arreglo
        App.render(); // Volver a renderizar las tarjetas
        App.renderChart(); // Volver a renderizar la gráfica
      },
    },
    methods: {
      candidates(candi, color) {
        App.data.candidates.push({
          candi,
          color,
          votes: 0,
        });
      },
    },
    render() {
      App.htmlElements.cardView.innerHTML = "";

      App.data.candidates.forEach((candidate, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.background = candidate.color;
        card.textContent = `${candidate.candi} (${candidate.votes} votos)`;

        const voteButton = document.createElement("button");
        voteButton.textContent = "Votar";
        voteButton.addEventListener("click", () =>
          App.handlers.handleVote(index)
        );

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", () =>
          App.handlers.handleDelete(index)
        );

        card.appendChild(voteButton);
        card.appendChild(deleteButton);
        App.htmlElements.cardView.appendChild(card);
      });
    },
    renderChart() {
      App.htmlElements.chart.innerHTML = "";

      const totalVotes = App.data.candidates.reduce(
        (acc, curr) => acc + curr.votes,
        0
      );

      App.data.candidates.forEach((candidate) => {
        const percentage =
          totalVotes === 0 ? 0 : (candidate.votes / totalVotes) * 100;

        const bar = document.createElement("div");
        bar.classList.add("chart-bar");
        bar.style.backgroundColor = candidate.color;
        bar.style.width = `${percentage}%`;
        bar.textContent = `${candidate.candi} - ${percentage.toFixed(2)}%`;
        App.htmlElements.chart.appendChild(bar);
      });
    },
  };
  App.init();
})();
