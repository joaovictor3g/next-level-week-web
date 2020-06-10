import React, { useState, useEffect } from 'react';
import { FiLogIn, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

import Search from '../../components/Search';
import logo from '../../assets/logo.svg';

const Home = () => {
    const [isClicked, setClicked] =useState(false);

    return (
        <>
            <div id="page-home">
                <div className="content">
                    <header>
                        <div>
                        <img src={logo} alt="Ecoleta" />
                        </div>
                        <div className="new-collect-point">
                            <FiLogIn color="#2FB86E" size={20}/>
                            <Link to="/create-point" >
                                Cadastre um ponto de coleta
                            </Link>
                        </div>
                    </header>

                    <main>
                        <h1>Seu marketplace de coleta de resíduos. </h1>
                        <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>

                        <button onClick={()=>setClicked(true)}>
                            <span>
                                <FiSearch />
                            </span>
                            <strong>Pesquisar pontos de coleta</strong>
                        </button>
                    </main>
                </div>
            </div>
            {isClicked ? <Search />: null}
        </>
    );
}

export default Home;