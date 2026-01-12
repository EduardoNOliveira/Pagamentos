o<script>
const USER = "Eduardo";
const PASS_HASH = "c7a5a1e6c93bde91b2c90d4dbf8e1f08c60a8b2d92c8b4e4f5d3d6f8d9c3c2a1";

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
</script>
