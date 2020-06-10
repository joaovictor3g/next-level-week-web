import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api';

const Search = () => {
    const [city, setCity] = useState<string>('');
    const [uf, setUf] = useState<string>('');

    const history = useHistory();

    function handleNavigateToPoints() {
        sessionStorage.setItem('city', city);
        sessionStorage.setItem('uf', uf);
        
        history.push('/list-points');
    }

    return (
        <div className="form-search">
            <div className="content-searched">
                <h2>Pontos de coleta</h2>
                <input placeholder="Digite a cidade" onChange={e=>setCity(e.target.value)} value={city}/>
                <input placeholder="Digite o estado"onChange={e=>setUf(e.target.value)} value={uf}/>
            
                <button className="submit" onClick={handleNavigateToPoints}>
                    Buscar
                </button>
                    
                
            </div>
        </div>
        
    );

};

export default Search;