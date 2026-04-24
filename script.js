const titulo = document.getElementById("titulo");
const contenido = document.getElementById("contenido");
const categoria = document.getElementById("categoria");
const lista = document.getElementById("lista");

/* GUARDAR POST */
function guardarPost() {
  if (!titulo.value || !contenido.value) {
    alert("Completa los campos");
    return;
  }

  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  const nuevo = {
    titulo: titulo.value,
    contenido: contenido.value,
    categoria: categoria.value || "General",
    fecha: new Date().toLocaleString()
  };

  posts.unshift(nuevo);
  localStorage.setItem("posts", JSON.stringify(posts));

  titulo.value = "";
  contenido.value = "";
  categoria.value = "";

  mostrarPosts();
  mostrarToast();

  setTimeout(() => {
    document.querySelector(".feed").scrollIntoView({
      behavior: "smooth"
    });
  }, 100);
}

/* MOSTRAR POSTS */
function mostrarPosts() {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  lista.innerHTML = "";

  posts.forEach((p, index) => {
    const item = document.createElement("div");
    item.classList.add("post");

    item.innerHTML = `
      <h3>${p.titulo}</h3>
      <span>${p.categoria}</span>
      <pre><code>${escapeHTML(p.contenido)}</code></pre>
      <small>${p.fecha}</small>
    `;

    lista.appendChild(item);

    // animación tipo app
    item.style.opacity = 0;
    item.style.transform = "translateY(10px)";

    setTimeout(() => {
      item.style.transition = "0.4s";
      item.style.opacity = 1;
      item.style.transform = "translateY(0)";
    }, index * 80);
  });
}

/* EVITAR HTML INYECTADO */
function escapeHTML(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* TOAST */
function mostrarToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

/* INICIAR */
mostrarPosts();
