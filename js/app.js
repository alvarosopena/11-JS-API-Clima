const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
    formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e){
    e.preventDefault();
    //Validar
    const ciudad = document.querySelector("#ciudad").value;
    const pais = document.querySelector("#pais").value;

    if(ciudad==="" || pais===""){
        //error
        mostrarError("Ambos campos son obligatorios");

    }

    //Consultar API
    consultarAPI(ciudad,pais);
}

function mostrarError(mensaje){
    
    const alerta = document.querySelector(".bg-red-100");
    //para que no se repita el cartel
    if (!alerta) {
    //Crear alerta
    const alerta = document.createElement("div");

    alerta.classList.add("bg-red-100", "border-red-400", "text-red-700","px-4","py-3","rounded","max-w-md","mx-auto","mt-6","text-center");

    alerta.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class="block">${mensaje}</span>
    `;

    container.appendChild(alerta);

    //Elimnar alerta after 3 seg.
    setTimeout(() => {
        alerta.remove();
    }, 3000)

    }
}

function consultarAPI(ciudad,pais){
    const appID = "d9983e626e4296b8c22c5604d99159ed";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}` ;

    Spinner(); //muestra spinner de carga

    fetch(url)
        .then( respuesta => respuesta.json())
        .then( datos => {
            limpiarHTML();// Limpiar el html previo
            if(datos.cod === "404"){
                mostrarError("Ciudad no encontrada")
                return;
            }
            //Imprimir respuesta en html
            console.log(datos);
            mostrarClima(datos);
        })
}

function mostrarClima(datos){
    const { name, main:{ temp, temp_max, temp_min } } = datos;
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);
    
    const ciudad = document.createElement("p");
    ciudad.innerHTML = `Clima en ${name}`;
    ciudad.classList.add("font-bold", "text-2xl");

    const actual = document.createElement("p");
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add("font-bold", "text-6xl");

    const tempMax = document.createElement("p");
    tempMax.innerHTML = `Temperatura maxima: ${max} &#8451;`;
    tempMax.classList.add("font-bold", "text-xl");

    const tempMin = document.createElement("p");
    tempMin.innerHTML = `Temperatura minima: ${min} &#8451;`;
    tempMin.classList.add("font-bold", "text-xl");


    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("text-center", "text-white");
    
    resultadoDiv.appendChild(ciudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);

}

const kelvinACentigrados = (grados) => parseInt(grados-273.15);


function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {

    limpiarHTML();
  
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
  
    divSpinner.innerHTML = `
      <div class="sk-circle1 sk-circle"></div>
      <div class="sk-circle2 sk-circle"></div>
      <div class="sk-circle3 sk-circle"></div>
      <div class="sk-circle4 sk-circle"></div>
      <div class="sk-circle5 sk-circle"></div>
      <div class="sk-circle6 sk-circle"></div>
      <div class="sk-circle7 sk-circle"></div>
      <div class="sk-circle8 sk-circle"></div>
      <div class="sk-circle9 sk-circle"></div>
      <div class="sk-circle10 sk-circle"></div>
      <div class="sk-circle11 sk-circle"></div>
      <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);

  }