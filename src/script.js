document.addEventListener("DOMContentLoaded", function () {
  const API_URL = "https://currency-exchange-api-sqei.onrender.com/api/rates";

  const fromCurrency = document.getElementById("from-currency");
  const toCurrency = document.getElementById("to-currency");
  const amount = document.getElementById("amount");
  const convertButton = document.getElementById("convert-button");
  const resultDiv = document.getElementById("result");

  // Llenar las opciones de monedass
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      const currencies = Object.keys(data);
      currencies.forEach((currency) => {
        const option1 = document.createElement("option");
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));

  // Manejar la conversión
  convertButton.addEventListener("click", function () {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amountValue = parseFloat(amount.value);

    if (isNaN(amountValue)) {
      resultDiv.textContent = "Por favor, ingrese una cantidad válida.";
      return;
    }

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const rateFrom = data[from][to];
        const convertedAmount = amountValue * rateFrom;
        resultDiv.textContent = `${amountValue} ${from} = ${convertedAmount.toFixed(
          2
        )} ${to}`;
      })
      .catch((error) => console.error("Error fetching data:", error));
  });
});
