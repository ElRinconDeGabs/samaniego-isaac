const qust1 = () => {
  const isPalindrome = (input) => {
    const string = String(input).toLowerCase().replace(/[\W_]/g, ""); // Convertir a string, pasar a minúsculas y quitar caracteres no alfanuméricos
    for (let i = 0; i < string.length / 2; i++) {
      if (string[i] !== string[string.length - 1 - i]) {
        return false;
      }
    }
    return true;
  };

  const toBinary = (input) => {
    const number = parseInt(input);

    if (isNaN(number)) {
      return "Input inválido. Por favor, ingresa un número válido.";
    }
    const binary = number.toString(2);
    return binary;
  };

  const message = '';

  document.getElementById("qust1").addEventListener("submit", function (event) {
    event.preventDefault();
    const number = document.getElementById("nums").value;

    const binary = toBinary(number);
    const numericPalindrome = isPalindrome(number);
    const binaryPalindrome = isPalindrome(binary);

    if (numericPalindrome && binaryPalindrome) {
      message = "Es un palíndromo";
    } else {
      message = "No es un palíndromo";
    }

    document.getElementById("answare").textContent = message;
    document.getElementById("answare").style.display = "block"; // Mostrar el div de respuesta
  });
};

const quest2 = () => {
  document.getElementById("qust2").addEventListener("submit", function (event) {
    event.preventDefault();
    const cadena = document.getElementById("cadena").value;
    const frecuencia = {};

    // Contar la frecuencia de cada carácter en la cadena
    for (let i = 0; i < cadena.length; i++) {
      const caracter = cadena[i];
      frecuencia[caracter] = (frecuencia[caracter] || 0) + 1;
    }

    // Crear un array de resultados
    const resultados = Object.keys(frecuencia).map(
      (caracter) => `${frecuencia[caracter]} ${caracter}`
    );

    // Establecer el mensaje
    message = resultados.join(", ");
    document.getElementById("answare").textContent = message;
    document.getElementById("answare").style.display = "block"; // Mostrar el div de respuesta
  });
};

const quest3 = () => {
  const isLeap = (year) =>
    year % 400 === 0
      ? true
      : year % 100 === 0
      ? false
      : year % 4 === 0
      ? true
      : false;

  document.getElementById("formQuest3").addEventListener("submit", function (event) {
    event.preventDefault();
    const year = parseInt(document.getElementById("year").value);

    if (isNaN(year)) {
      message = "Input inválido. Por favor, ingresa un año válido.";
    } else {
      message = isLeap(year) ? `${year} es un año bisiesto.` : `${year} no es un año bisiesto.`;
    }

    document.getElementById("answare").textContent = message;
    document.getElementById("answare").style.display = "block"; // Mostrar el div de respuesta
  });
};

const quest4 = () => {
  const esPrimo = (prm) => {
    if (prm <= 0) {
      return false;
    }
    for (let i = 2; i <= Math.sqrt(prm); i++) {
      if (prm % i === 0) {
        return false;
      }
    }
    return true;
  };

  document.getElementById("formQuest4").addEventListener("submit", function (event) {
    event.preventDefault();
    let prm = parseInt(document.getElementById("prm").value);
    let sum = 0;
    for (let i = 0; i <= prm; i++) {
      if (esPrimo(i)) {
        sum += i;
      }
    }
    message = `La suma de los números primos menores que ${prm} es: ${sum}`;
    document.getElementById("answare").textContent = message;
    document.getElementById("answare").style.display = "block"; // Mostrar el div de respuesta
  });
};

const clearAnswer = () => {
  document.getElementById("answare").textContent = ""; // Limpiar el contenido del div de respuesta
  document.getElementById("nums").value = ""; // Limpiar el campo de entrada de la pregunta 1
  document.getElementById("cadena").value = ""; // Limpiar el campo de entrada de la pregunta 2
  document.getElementById("year").value = ""; // Limpiar el campo de entrada de la pregunta 3
  document.getElementById("prm").value = ""; // Limpiar el campo de entrada de la pregunta 4
};

document.getElementById("clearButton").addEventListener("click", function (event) {
  event.preventDefault();
  clearAnswer();
});


