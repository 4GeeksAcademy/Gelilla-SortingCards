import "./style.css";
function main() {
  const suits = ["♦", "♥", "♠", "♣"];
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

  const drawBtn = document.getElementById("drawBtn");
  const sortBtn = document.getElementById("sortBtn");
  const cardAmountInput = document.getElementById("cardAmount");
  const cardsContainer = document.querySelector(".cards");
  const logContainer = document.querySelector(".sort-log");

  let cardValuesToShow = [];

  function generateRandomCard() {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return { suit, value };
  }

  function getCardValue(val) {
    if (val === "J") return 11;
    if (val === "Q") return 12;
    if (val === "K") return 13;
    if (val === "A") return 14;
    return parseInt(val);
  }

  function createCard({ suit, value }) {
    const card = document.createElement("div");
    card.className = "card-box";

    const isRed = suit === "♥" || suit === "♦";
    const colorClass = isRed ? "red" : "black";

    card.innerHTML = `
      <div class="card-body ${colorClass}">
        <div class="top">${suit}</div>
        <div class="num">${value}</div>
        <div class="bottom">${suit}</div>
      </div>
    `;
    return card;
  }

  drawBtn.addEventListener("click", () => {
    const count = parseInt(cardAmountInput.value);
    cardsContainer.innerHTML = "";
    logContainer.innerHTML = "";
    cardValuesToShow = [];

    if (isNaN(count) || count <= 0) {
      alert("Please enter a valid number");
      return;
    }

    for (let i = 0; i < count; i++) {
      const cardData = generateRandomCard();
      cardValuesToShow.push(cardData);
      const cardElement = createCard(cardData);
      cardsContainer.appendChild(cardElement);
    }
  });

  sortBtn.addEventListener("click", () => {
    if (cardValuesToShow.length === 0) return;

    logContainer.innerHTML = "<h4>Selection Sort Log:</h4>";

    let arr = [...cardValuesToShow];

    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;

      for (let j = i + 1; j < arr.length; j++) {
        if (getCardValue(arr[j].value) < getCardValue(arr[minIdx].value)) {
          minIdx = j;
        }
      }

      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];

      // Visual step log
      const stepRow = document.createElement("div");
      stepRow.className = "log-step";

      const label = document.createElement("div");
      label.className = "log-label";
      label.innerText = i;

      const cardsRow = document.createElement("div");
      cardsRow.className = "log-cards";

      arr.forEach(card => {
        const cardEl = createCard(card);
        cardsRow.appendChild(cardEl);
      });

      stepRow.appendChild(label);
      stepRow.appendChild(cardsRow);
      logContainer.appendChild(stepRow);
    }
  });
}

main();
