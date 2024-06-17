const App = {
    htmlElements: {
      form: document.querySelector('.form'),
      result: document.getElementById('result')
    },
    init() {
      this.bindEvents();
    },
    bindEvents() {
      this.htmlElements.form.addEventListener('submit', this.handlers.onFormSubmit.bind(this));
    },
    handlers: {
      async onFormSubmit(e) {
        e.preventDefault();
        const number = document.getElementById('numberInput').value;
        if (number <= 0) {
          alert('Please enter a positive integer.');
          return;
        }
        await App.getFibonacci(number);
      }
    },
    async getFibonacci(number) {
      try {
        const response = await axios.get(`http://localhost:3000/api/fibonacci/${number}`);
        App.renderResult(response.data);
      } catch (error) {
        console.error('Error fetching Fibonacci series:', error);
        alert('Failed to fetch the Fibonacci series');
      }
    },
    renderResult(data) {
      // Limpiar resultados anteriores
      this.htmlElements.result.innerHTML = '';
  
      // Crear un cuadro para cada número en la serie
      data.forEach(num => {
        const numBox = document.createElement('div');
        numBox.classList.add('number-box');
        numBox.textContent = num;
        this.htmlElements.result.appendChild(numBox);
      });
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    App.init();
  });
  