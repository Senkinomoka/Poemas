const textarea = document.getElementById("poema");
const titulo = document.getElementById("titulo");
const lista = document.getElementById("lista");

const { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } = window.firebaseTools;
const db = window.db;

/* PUBLICAR */
async function guardarPoema() {
  await addDoc(collection(db, "poemas"), {
    titulo: titulo.value || "Sin título",
    contenido: textarea.value,
    fecha: new Date().toLocaleString()
  });

  textarea.value = "";
  titulo.value = "";

  mostrarPoemas();
}

/* MOSTRAR */
async function mostrarPoemas() {
  lista.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "poemas"));

  querySnapshot.forEach((docu) => {
    const data = docu.data();

    const item = document.createElement("div");
    item.classList.add("post");

    item.innerHTML = `
      <h3 contenteditable="true">${data.titulo}</h3>
      <p contenteditable="true">${data.contenido}</p>
      <small>${data.fecha}</small>
      <br>
      <button onclick="editar('${docu.id}', this)">Guardar cambios</button>
      <button onclick="eliminar('${docu.id}')">Eliminar</button>
    `;

    lista.appendChild(item);
  });
}

/* ELIMINAR */
async function eliminar(id) {
  await deleteDoc(doc(db, "poemas", id));
  mostrarPoemas();
}

/* EDITAR */
async function editar(id, btn) {
  const post = btn.parentElement;
  const nuevoTitulo = post.querySelector("h3").innerText;
  const nuevoContenido = post.querySelector("p").innerText;

  await updateDoc(doc(db, "poemas", id), {
    titulo: nuevoTitulo,
    contenido: nuevoContenido
  });

  alert("Actualizado ✅");
}

mostrarPoemas();
