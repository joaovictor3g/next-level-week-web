import React from 'react';
import { Link } from 'react-router-dom'
import { FiCheckCircle } from 'react-icons/fi';
import './styles.css';

const SuccessMessage = () => {
    return (    
        <div className="success-message">
            <span>
                <FiCheckCircle size={120} color="#34CB79" />
                <p>Cadastro confirmado! </p>
            </span>
        </div>
    );
} 

export default SuccessMessage;