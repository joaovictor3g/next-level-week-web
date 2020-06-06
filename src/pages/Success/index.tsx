import React from 'react';
import { Link } from 'react-router-dom'
import { FiCheckCircle } from 'react-icons/fi';
import './styles.css';

const SuccessMessage = () => {
    return (    
        <div className="sucess-message">
            <span>
                <FiCheckCircle size={120} color="green" />
            </span>
            <span>
                Cadastro confirmado! <Link to='/' >Voltar para tela inicial</Link>
            </span>
        </div>
    );
} 

export default SuccessMessage;