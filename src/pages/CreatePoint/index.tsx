import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';

import axios from 'axios';

import logo from '../../assets/logo.svg';

import api from '../../services/api';

interface Item {
    id: number,
    name: string,
    image_url: string
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState([]);

    useEffect(() => {
        getItems();
    }, []);

    async function getItems() {
        const response = await api.get('items');

        setItems(response.data);
    }

    async function getUF() {
        const response =  await axios.get('http://servidor.ibge.gov.br/api/v1/localidades/estados')

        setUfs(response.data.sigla);

    }

    useEffect(() => {
        getUF();
    }, []);


    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form>
                <h1>Cadastro do <br /> ponto de coleta</h1>
            
                <fieldset>
                    <legend>
                        <h2>Dados</h2>    
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input 
                            type="text" 
                            name="name"
                            id="name"
                        />

                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="name">E-mail</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    id="email"
                                />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">WhatsApp</label>
                                <input  
                                    type="text" 
                                    name="whatsapp"
                                    id="whatsapp"
                                />
                        </div> 
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>   
                        <span>Selecione o endereço no mapa</span> 
                    </legend>

                    <Map center={[ -3.3488896, -39.1512064 ]} zoom={15}>
                        <TileLayer 
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={[ -3.3488896, -39.1512064 ]} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf" className="uf">Estado (UF)</label>
                            <select name="uf" id="uf">
                                <option value="0">Selecione uma UF</option>
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city" className="city">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecione uma cidade</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>    
                    </legend>

                    <ul className="items-grid">
                        {items.map((item) => (
                            <li key={item.id}>
                                <img src={item.image_url} alt={item.name} />
                                <span>{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar novo ponto de coleta
                </button>
            </form>
        </div>
    );
} 

export default CreatePoint;