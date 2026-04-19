const USER = "Eduardo";
const PASS_HASH = "e3ba5360c7eee2b0adaf703733c1131cebac9145205975a0b624380238de302d";

async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;
  const h = await sha256(p);

  if (u === USER && h === PASS_HASH) {
    localStorage.setItem("auth", "ok");
    location.href = "index.html";
  } else {
    alert("Usuário ou senha inválido");
  }
}

function checkAuth() {
  if (localStorage.getItem("auth") !== "ok") {
    location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("auth");
  location.href = "login.html";
}
