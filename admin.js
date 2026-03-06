import { db } from "./firebase.js";
import { ref, onValue, set, update, remove, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const panel = document.getElementById("panel");
const newPlayerInput = document.getElementById("newPlayer");

async function ensureStructure() {
  const snapshot = await get(ref(db, 'players'));
  if (!snapshot.exists()) {
    await set(ref(db, 'players'), {}); // tworzy pusty obiekt jeśli nie istnieje
  }
}

async function refreshPanel() {
  await ensureStructure();
  onValue(ref(db, "players"), (snapshot) => {
    const data = snapshot.val() || {};
    panel.innerHTML = "";
    for (const player in data) {
      panel.innerHTML += `
      <div class="row">
        <div class="name">${player}</div>
        <div class="score">${data[player]}</div>
        <button onclick="change('${player}',1)">+1</button>
        <button onclick="change('${player}',3)">+3</button>
        <button onclick="change('${player}',-1)">-1</button>
        <button onclick="change('${player}',-3)">-3</button>
        <button onclick="reset('${player}')">reset</button>
        <button onclick="del('${player}')">usuń</button>
      </div>
      `;
    }
  }, { onlyOnce: false });
}

window.change = async (player, val) => {
  const playerRef = ref(db, "players/" + player);
  const snapshot = await get(playerRef);
  if (snapshot.exists()) {
    const newVal = snapshot.val() + val;
    await set(playerRef, newVal < 0 ? 0 : newVal);
  }
};

window.reset = async (player) => {
  await set(ref(db, "players/" + player), 0);
};

window.del = async (player) => {
  await remove(ref(db, "players/" + player));
};

window.addPlayer = async () => {
  const name = newPlayerInput.value.trim();
  if (!name) return alert("Wpisz nazwę gracza");
  await ensureStructure();
  await set(ref(db, "players/" + name), 0);
  newPlayerInput.value = "";
};

window.resetAll = async () => {
  await set(ref(db, "players"), {});
};

refreshPanel();