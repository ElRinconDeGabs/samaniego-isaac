(() => {
  const App = {
    htmlElements: {
      form: document.getElementById("form"),
      res: document.getElementById("result"),
    },
    init() {
      this.bindEvents();
    },
    bindEvents() {
      this.htmlElements.form.addEventListener(
        "submit",
        this.handlers.handleForm.bind(this)
      );
    },
    handlers: {
      handleForm(e) {
        e.preventDefault();
        const nums = parseInt(e.target.nums.value);
        const fibores = App.methods.fibo(nums);
        App.render(fibores);

        fibores.forEach((num) => {
            const paragraph = document.createElement("p");
            paragraph.textContent = num;
            this.htmlElements.res.appendChild(paragraph);
          });        
      },
    },
    methods: {
      fibo(nums) {
        const res = [];
        for (let i = 0; i < nums; i++) {
          if (i === 0 || i === 1) {
            res.push(i);
          } else {
            res.push(res[i - 1] + res[i - 2]);
          }
        }
        return res;
      },
    },
    render(fibores) {
      this.htmlElements.res.textContent = "";
    },
  };
  App.init();
})();
