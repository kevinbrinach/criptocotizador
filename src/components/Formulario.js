import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Criptomoneda from './Criptomoneda';
import Error from './Error';

function Formulario({guardarMoneda, guardarCriptomoneda}) {

    const [criptomonedas, guardarCriptomonedas] = useState([]);
    const [ monedaCotizar, guardarMonedaCotizar ] = useState('');
    const [ criptoCotizar, guardarCriptoCotizar ] = useState('');
    const [ error, guardarError ] = useState(false);

    useEffect(() => {
        
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=USD';

            const resultado = await axios.get(url);

            // console.log(resultado.data.Data)
            //guardar en el estate
            guardarCriptomonedas(resultado.data.Data)
        }

        consultarAPI();
    }, []);

    //validar que ambos campos esten llenos
    const cotizarMoneda = (e) => {
        e.preventDefault();
        //validar que los campos esten llenos
        if(monedaCotizar ==='' || criptoCotizar === '') {
            guardarError(true);
            return
        }
        //pasar datos al componente principal
        guardarError(false);
        guardarMoneda(monedaCotizar);
        guardarCriptomoneda(criptoCotizar);
    }

    //mostrar el error en caso de que exista
    const componente = (error) ? <Error mensaje="ambos campos son obligatorios"/> : null;

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {componente}
            <div className="row">
                <label>Elige tu Moneda</label>
                <select
                    className="u-full-width"
                    onChange={ e => guardarMonedaCotizar(e.target.value) }
                >
                    <option value="">-Elige tu Moneda</option>
                    <option value="USD">Dolar Americano</option>
                    <option value="EUR">Euro</option>
                    <option value="GBP">Libras Esterlinas</option>
                    <option value="ARS">Peso Argentino</option>
                    <option value="MXN">Peso Mexicano</option>
                </select>
            </div>

            <div className="row">
                <label>Elige una Criptomoneda</label>
                <select
                    className="u-full-width"
                    onChange={ e => guardarCriptoCotizar(e.target.value) }
                >
                    <option value="">-Elige tu Criptomoneda</option>
                    { criptomonedas.map(criptomoneda => (
                        <Criptomoneda 
                            key={criptomoneda.CoinInfo.Id}
                            criptomoneda={criptomoneda}
                        />
                    ))}
                </select>
            </div>
            <input type="submit" className="button-primary u-full-width" value="Cotizar" />
        </form>
    )

}

export default Formulario;