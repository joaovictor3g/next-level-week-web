import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import axios from 'axios';

import logo from '../../assets/logo.svg';

import api from '../../services/api';

interface Item {
    id: number,
    name: string,
    image_url: string
}

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [selectedUF, setSelectedUF] = useState('0');
    const [cityName, setCityName] = useState<string[]>([]);

    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    })

    const history = useHistory();

    const [selectedItems, setSelectedItems] = useState<number[]>([])

    useEffect(() => {
        getItems();
    }, []);

    async function getItems() {
        const response = await api.get('items');

        setItems(response.data);
    }

    async function getUF() {
        const response =  await axios.get<IBGEUFResponse[]>('http://servicodados.ibge.gov.br/api/v1/localidades/estados')
        
        const ufInitials = response.data.map(uf => uf.sigla);

        setUfs(ufInitials);

    }

    useEffect(() => {
        getUF();
    }, []);

    function handleSelectUF(e: ChangeEvent<HTMLSelectElement>) {
        setSelectedUF(e.target.value);
    }

    function handleSelectedCity(e: ChangeEvent<HTMLSelectElement>) {
        setSelectedCity(e.target.value);
    }

    async function getCities() {
        if(selectedUF==='0')
            return;

        const response = await axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`);

        const cityNames = response.data.map(city => city.nome)

        setCityName(cityNames);
    }

    useEffect(() => {
        getCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedUF]);

    function handleMapClick(e: LeafletMouseEvent) {
        setSelectedPosition([
            e.latlng.lat,
            e.latlng.lng
        ])
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            
            setInitialPosition([latitude, longitude]);
        })
    }, []);

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id)

        if(alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id)
        
            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([ ...selectedItems, id ]);  
        }

        
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const { name, email, whatsapp } = formData;
        const uf = selectedUF;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items
        }

        try {
            await api.post('/points', data);

            alert('Ponto de coleta criado');
            history.push('/');
        
        } catch (err) {
            alert('Deu ruim')
            return false;
        }
    }

    return (
        <div 
        id="page-create-point" 
            
        >
            <header>
                <img src={logo} alt="Ecoleta" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
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
                            onChange={handleInputChange}
                        />

                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="name">E-mail</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    id="email"
                                    onChange={handleInputChange}
                                />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">WhatsApp</label>
                                <input  
                                    type="text" 
                                    name="whatsapp"
                                    id="whatsapp"
                                    onChange={handleInputChange}
                                />
                        </div> 
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>   
                        <span>Selecione o endereço no mapa</span> 
                    </legend>

                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}> 
                        <TileLayer 
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={selectedPosition} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf" className="uf">Estado (UF)</label>
                            <select name="uf" id="uf" value={selectedUF} onChange={handleSelectUF}>
                                <option value="0">Selecione uma UF</option>

                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city" className="city">Cidade</label>
                            <select 
                                name="city" 
                                value={selectedCity} 
                                onChange={handleSelectedCity} 
                                id="city"
                            >
                                <option value="0">Selecione uma cidade</option>
                                
                                {cityName.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                                
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
                            <li 
                                key={item.id} 
                                onClick={()=>handleSelectItem(item.id)}
                                className={selectedItems.includes(item.id) ? 'selected': ''}
                            >
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