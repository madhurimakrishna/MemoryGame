const board = document.getElementById("game-board");
let score = 0;
let flippedCards = [];
let lockBoard = false;


const images = Array.from({ length: 6 }, (_, i) => `/images/${theme}/img${i + 1}.jpg`);
const cards = [...images, ...images]; 


cards.sort(() => 0.5 - Math.random());


cards.forEach((src, index) => {
  const card = document.createElement("div");
  card.className = "col";
  card.innerHTML = `
    <div class="card h-100 flip-card" data-src="${src}">
      <img src="/images/back.jpg" class="card-img-top card-back" />
      <img src="${src}" class="card-img-top card-front d-none" />
    </div>
  `;
  board.appendChild(card);
});


board.addEventListener("click", e => {
  const card = e.target.closest(".flip-card");
  if (!card || lockBoard) return;

  const front = card.querySelector(".card-front");
  const back = card.querySelector(".card-back");

  if (!front.classList.contains("d-none")) return;

  front.classList.remove("d-none");
  back.classList.add("d-none");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    lockBoard = true;
    const [first, second] = flippedCards;
    const match = first.dataset.src === second.dataset.src;

    setTimeout(() => {
      if (!match) {
        first.querySelector(".card-front").classList.add("d-none");
        first.querySelector(".card-back").classList.remove("d-none");
        second.querySelector(".card-front").classList.add("d-none");
        second.querySelector(".card-back").classList.remove("d-none");
      } else {
        score += 10;
        document.getElementById("score").textContent = score;
        if (document.querySelectorAll(".d-none.card-back").length === cards.length) {
          fetch("/score", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `score=${score}`
          });
        }
      }
      flippedCards = [];
      lockBoard = false;
    }, 800);
  }
});
