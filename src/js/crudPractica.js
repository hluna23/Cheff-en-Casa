// variables globales

const formularioUI = document.getElementById("formulario");
const listCompraUI = document.getElementById("listCompra");

let arrayCompra = [];

// Funciones
const agregarCompra = (compra) => {
  let itemCompra = {
    compra: compra,
    estado: "false",
  };
  arrayCompra.push(itemCompra);

  return itemCompra;

  
}
 
  
const compraDB = () => {
  localStorage.setItem("compra", JSON.stringify(arrayCompra));
  enlistarDB();
};


const enlistarDB = () => {
  listCompraUI.innerHTML = "";
  arrayCompra = JSON.parse(localStorage.getItem("compra"));
  if (arrayCompra === null) {
    arrayCompra = [];
  } else {
    arrayCompra.forEach(element => {
      listCompraUI.innerHTML += `<div class="alert alert-danger mr-5"role="alert"> <img src="../imagens/logoF(1).png"alt="Search Icon"class="img-fluid ms-2 mb-1 float-flex mr-5"style="max-width: 30px; cursor: pointer"/><b>${element.compra}</b> - ${element.estado}<span class="float-right"><img src="../imagens/boligrafo(1).png"alt="Edit"class="img-fluid ms-2 mb-1 mr-5"style="max-width: 30px"/><img src="../imagens/borrar(1).png"alt="Delete"class="img-fluid ms-2 mb-1 mr-5" style="max-width: 30px"/></span></div>`;});
  }
};

const eliminarDB = (compra) => {

  let indexArray;
  arrayCompra.forEach((element, index) => {
  if (element.compra === compra) {
    indexArray = index
  } 
});
  arrayCompra.splice(indexArray, 1);
  localStorage.setItem("compra", JSON.stringify(arrayCompra));
  compraDB()
}



// eventListeners

formularioUI.addEventListener("submit", (e) => {
  e.preventDefault();
  let actividadUI = document.getElementById("actividad").value;

  agregarCompra(actividadUI);
  compraDB();

  formularioUI.reset();
});

document.addEventListener("DOMContentLoaded", enlistarDB);

listCompraUI.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.alt === "Edit" || e.target.alt === "Delete") {
    const texto = e.target.offsetParent.childNodes[2].innerHTML;
    const otroTexto = e.target.offsetParent.childNodes[4].innerText;
    if(e.target.alt === "Delete")
      eliminarDB(texto, otroTexto);
  }
  if(e.target.alt === "Edit"){

  }


});
