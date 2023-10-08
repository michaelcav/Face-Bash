import React, { useState, useEffect } from 'react';
import './register.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';

export default function Register() {
  const initialInputs = {
    username: '',
    email: '',
    password: '',
    name: '',
  };

  const [inputs, setInputs] = useState(initialInputs);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await Yup.object().shape({
        username: Yup.string().required('Username é obrigatório'),
        email: Yup.string().email('Digite um email válido').required('Email é obrigatório'),
        password: Yup.string().min(4, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
        name: Yup.string().required('Nome é obrigatório'),
      }).validate(inputs, { abortEarly: false });

      await axios.post('http://localhost:8800/api/auth/register', inputs);
      setSuccessMessage('Sua conta foi criada com sucesso!');
      setInputs(initialInputs);
      setErrors({});
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      } else if (axios.isAxiosError(error)) {
        setErrors({ general: error.response?.data || 'Ocorreu um erro.' });
      } else {
        setErrors({ general: 'Ocorreu um erro.' });
      }
      setSuccessMessage('');
    }
  };

  const isFormEmpty = Object.values(inputs).every((value) => value === '');

  return (
    <div className="register">
      <div className="card">
      <h1 className='titulo'>Face Bash</h1>
      <hr />
        <div className="right">
          <h1>Crie a sua conta</h1>
          <form>
            {['username', 'email', 'password', 'name'].map((field) => (
              <div key={field}>
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  value={inputs[field]}
                  onChange={handleChange}
                />
                {errors[field] && (
                  <p className="error" style={{ color: 'red', fontWeight: '600' }}>
                    {errors[field]}
                  </p>
                )}
              </div>
            ))}
            {errors.general && (
              <p className="error"
               style={{ color: 'red', fontWeight: "300" }}>
                {errors.general}
              </p>
            )}
            {successMessage && (
              <p className="success" style={{ color: 'green' }}>
                {successMessage}
              </p>
            )}
            <button onClick={handleClick} disabled={isFormEmpty} className={isFormEmpty ? 'disabled' : ''}>
              Register
            </button>
          </form>
        </div>
        <div className="left">
          <span>Você já tem uma conta?</span>
          <Link 
          to="/login"
          style={{textDecoration: "none", color: "inherit"}}>
            <span className='text-login'>faça o seu login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
