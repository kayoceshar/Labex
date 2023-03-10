import React, { useState } from "react";
import { ScreenForm, Loader } from "./style";
import Loading from '../../Images/Loading-Labex.svg'
import { useNavigate } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import axios from "axios";
import { BASE_URL } from "../../Constants/Constants";

function LoginForm() {

    const [form, onChange, clear] = useForm({email: "", password: ""})
    const [loadingForm, setLoadingForm] = useState(false)
    const navigate = useNavigate()
    

    const Login = () => {
        axios.post(`${BASE_URL}/login`, form, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            setLoadingForm(false)
            window.localStorage.setItem("token", response.data.token)
            navigate("/admin/trips/list")
        })
        // senha e/ou email incorretos.
        .catch((error) => {
            setLoadingForm(false)
            window.alert("E-mail e/ou senha incorretos.")
            clear()
        })
    }

    const handleClick = (e) => {
        setLoadingForm(true)
        e.preventDefault()
        Login()
    }

    return (
        <div>

        {loadingForm && <Loader><img src={Loading} alt="ícone de carregamento"/></Loader>}

        <ScreenForm onSubmit={handleClick}>

            <label htmlFor="email">Seu E-mail</label>
            <input 
                name="email" 
                type="email" 
                value={form.email} 
                placeholder="E-mail" 
                onChange={onChange} 
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                required
                autoFocus
            />

            <label htmlFor="password"> Sua Senha </label>
            <input 
                name="password" 
                type="password" 
                value={form.password} 
                placeholder="Senha" 
                onChange={onChange} 
                required
            />
            <button>Login</button>
        </ScreenForm>
        </div>
    )
}

export default LoginForm; 