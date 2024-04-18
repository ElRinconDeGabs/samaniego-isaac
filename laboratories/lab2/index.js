function f1(n1, n2) {
  var num1 = n1;
  var num2 = n2;
  var resultn1, resultn2, resultn3, resultn4;

  resultn1 = num1 + num2;
  resultn2 = num1 - num2;
  resultn3 = num1 * num2;
  resultn4 = num1 / num2;

  document.getElementById("f1").innerHTML =
    "La suma es: " +
    resultn1 +
    "<p> La resta es: " +
    resultn2 +
    "<p> La multiplicación es: " +
    resultn3 +
    "<p> La división es: " +
    resultn4;
  console.log(resultn1, resultn2, resultn3, resultn4)
}

f1(10, 2);

function f2(word1, word2) {
  let w1 = word1;
  let w2 = word2;

  let message = (w1 += " " + w2);

  document.getElementById("f2").innerHTML = message;
  console.log(message)
}

f2("Hello", "World");

function f3(var1, var2) {
  const String = var1;
  const int = var2;

  let message = typeof String + "<p>" + typeof int;

  document.getElementById("f3").innerHTML = message;
  console.log(typeof String, typeof int)
}

f3("String", 4569);

function f4() {
  let object = [2134, "Hello", true, null];
  let message = "";

  for (let i = 0; i < object.length; i++) {
    message += object[i] + "<p>";
  }

  document.getElementById("f4").innerHTML = message;
  console.log(object);
}
f4();

function f5(num) {
  let sum = 0;

  for (let i = 0; i < num; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum = sum + i;
    }
  }
  document.getElementById("f5").innerHTML = "La suma es: " + sum;
  console.log(sum);
}
f5(10);
