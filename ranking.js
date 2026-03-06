import { db } from "./firebase.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const ranking = document.getElementById("ranking");

onValue(ref(db, "players"), (snapshot) => {
  const data = snapshot.val() || {};
  ranking.innerHTML = "";

  const players = Object.entries(data);
  if(players.length === 0) {
    ranking.innerHTML = "<p>Brak danych do wyświetlenia</p>";
    return;
  }

  players.sort((a, b) => b[1] - a[1]);
  const maxPoints = players[0][1];

  players.forEach(([name, points]) => {
    const percent = maxPoints ? ((points / maxPoints) * 100).toFixed(1) : 0;
    ranking.innerHTML += `
      <div class="row">
        <div class="name">${name}</div>
        <div class="score">${points}</div>
        <div class="score">${percent}%</div>
      </div>
    `;
  });
});