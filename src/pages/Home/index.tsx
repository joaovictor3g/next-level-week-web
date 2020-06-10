import React from 'react';
import { FiLogIn, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/logo.svg';

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <div>
                    <img src={logo} alt="Ecoleta" />
                    </div>
                    <div className="new-collect-point">
                        <FiLogIn color="#2FB86E" size={20}/>
                        <button>
                            Cadastre um ponto de coleta
                        </button>
                    </div>
                </header>

                <main>
                    <h1>Seu marketplace de coleta de resíduos. </h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>

                    <Link to="/create-point">
                        <span>
                            <FiSearch />
                        </span>
                        <strong>Pesquisar pontos de coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
    );
}

export default Home;