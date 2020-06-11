import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

import logo from  '../../assets/logo.svg';
import HomeBckg from '../../assets/home-background.svg';

interface Points {
    id: number,
    name: string,
    image: string,
    email: string,
    whatsapp: string,

}

const ListPoints = () => {
    const city = sessionStorage.getItem('city');
    const uf = sessionStorage.getItem('uf');
    const [points, setPoints] = useState<Points[]>([]);
    const [length, setLength] = useState<number>(0);
    const [id, setId] = useState<number>(0)

    async function filterPoints() {
        const response = await api.get(`/list-points?city=${city}&uf=${uf}`)

        setPoints(response.data);
       
        setLength(response.data.length);

    }

    useEffect(() => {
        filterPoints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
        <header className="headwer">
            <span>
                <img src={logo} alt="logo" />
                <p className="qtd-pontos">{length} pontos encontrados </p>
            </span>
            <Link to="/">
                <FiArrowLeft size={20} color="green" />
                <p>Voltar para Home</p>
            </Link>
        </header>
        <div className="principal">
            <div className="content">
                {points.map((point) => (
                    <div key={point.id} className="points-container">
                        <img src={`http://192.168.0.106:3333/uploads/${point.image}` || HomeBckg} alt="coleta"/>
                        <p>{point.name}</p>
                        <p className="items">Papeis e papelão</p>
                        <p className="city-uf">{city}, {uf}</p>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}

export default ListPoints;
