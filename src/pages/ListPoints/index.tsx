import React, { useEffect, useState } from 'react'
import api from '../../services/api';

import './styles.css';

import logo from  '../../assets/logo.svg';

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

    async function filterPoints() {
        const response = await api.get(`/points?city=${city}&uf=${uf}&items=1,%202,%203,%204,%205,%206`)

        setPoints(response.data);
       
        setLength(response.data.length);

    }

    useEffect(() => {
        filterPoints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="principal">
            <img src={logo} alt="logo" />
            <p className="qtd-pontos">{length} pontos encontrados </p>
            <div className="content">
                {points.map((point) => (
                    <div key={point.id} className="points-container">
                        <img src={`http://192.168.0.106:3333/uploads/${point.image}`} alt="coleta"/>
                        <p>{point.name}</p>
                        
                    </div>
                ))}
            </div>
        </div>

    )
}

export default ListPoints;
