import React, { useState, useEffect } from 'react';
import imagen from './cryptomonedas.png'
import Formulario from './components/Formulario';
import axios from 'axios';
import Spinner from './components/Spinner';
import Cotizacion from './components/Cotizacion';


function App() {

  const [ moneda, guardarMoneda ] = useState('');
  const [ criptomoneda, guardarCriptomoneda ] = useState('');
  const [ cargando, guardarCargando ] = useState(false);
  const [ resultado, guardarResultado ] = useState({});

  useEffect(() => {
    const cotizarCriptomoneda = async () => {

      //para que no se ejecute el llamado a la api apenas se carga la pagina si no hay una moneda
      if (moneda==='') return;
      
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      //console.log(resultado.data.DISPLAY[criptomoneda][moneda]);
      //mostrar spinner
      guardarCargando(true);

      //ocultar spinner y guardar resultado
      setTimeout(() => {
        guardarCargando(false)
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda])
      }, 3000);

    }

    cotizarCriptomoneda();
  }, [criptomoneda, moneda])

  //mostrar spinner
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado}/>;



  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={imagen} alt="imagen criptomonedas" className="logotipo"/>
        </div>
        <div className="one-half column">
          <h1>Cotiza Criptomonedas al Toque Roque</h1>
          
          <Formulario 
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
          />

          {componente}
        </div>
      </div>
    </div>
  );
}

export default App;
