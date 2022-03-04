const criptoMonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const btnCotizar = document.querySelector('#cotizar');
const formulario = document.querySelector('#formulario');

const objBusqueda = {
    moneda:"",
    criptomoneda:""
}

//Promise
const obtenerCriptomonedas = criptomonedas => new Promise(resolve =>{
    resolve(criptomonedas);
});

    document.addEventListener('DOMContentLoaded', () => {
    consultarCriptomonedas();
   
    formulario.addEventListener('submit', submitFormulario);

    criptoMonedasSelect.addEventListener('change', leerValor);
    monedaSelect.addEventListener('change', leerValor);
});

function consultarCriptomonedas(e){
    
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";


    fetch(url)
        .then(respuesta => respuesta.json() )
        .then(resultado => obtenerCriptomonedas(resultado.Data))
        .then(criptomonedas => selectCriptomonedas(criptomonedas));
        

}

function selectCriptomonedas(criptomonedas){
    criptomonedas.forEach(cripto => {
        const {FullName, Name} = cripto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent= FullName;
        criptoMonedasSelect.appendChild(option);
    });
}

function leerValor(e){
    objBusqueda[e.target.name] = e.target.value;
    
}
function submitFormulario(e){
    e.preventDefault();
    //validar

    const {moneda, criptomoneda} = objBusqueda;

    if(moneda === '' || criptomoneda ===''){
        mostrarAlerta('Ambos campos son obligatorio');
    }


    //Consultar API

    consultarApi();

}
function consultarApi(){
    const {criptomoneda, moneda} = objBusqueda; 0
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(cotizacion => mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda]))
}

function mostrarCotizacionHTML(cotizacion){
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;

    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `Cotizacion ${PRICE}`;

    formulario.appendChild(precio);
}


function mostrarAlerta(mensaje){
   const existeError = document.querySelector('.error');
   if(!existeError){
       const divMensaje = document.createElement('div');
    divMensaje.classList.add('error');

    divMensaje.textContent = mensaje;
    formulario.appendChild(divMensaje);

    setTimeout(()=>{
        divMensaje.remove();
    },1500);
}
   }
    
