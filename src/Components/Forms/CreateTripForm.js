import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../Constants/Constants";
import useForm from "../../Hooks/useForm";
import { ScreenForm, Loader } from "./style";
import Loading from '../../Images/Loading-Labex.svg'
import Planets from '../Planets.json'

function CreateTripForm() {

    const [form, onChange, clear] = useForm( { name: "", planet: "", date: "", description: "", durationInDays: "" })
    
    const planets = Planets
    const [loadingForm, setLoadingForm] = useState(false)

    const CreateTrip = () => {
        axios.post(`${BASE_URL}/trips`, form, {
            headers: {
                "Content-Type": "application/json",
                "auth": window.localStorage.getItem("token")
            }
        })
        .then((response) => {
            setLoadingForm(false)
            window.alert("Parabéns! Viagem criada!")
            clear()
        })
        .catch((error) => {
            setLoadingForm(false)
            window.alert("OPS!ERRO! Verifique as informações corretamente!")
        })
    }

    const handleClick = (e) => {
        setLoadingForm(true)
        e.preventDefault()
        CreateTrip()
    }

    const listPlanets = planets.map((item) => {
        return (
            <option key={item.id} value={item.planet}> {item.planet} </option>
        )
    })

    const date = new Date()
    const year = date.getFullYear();
    const day = date.getDate();
    const month = ( date.getMonth() > 9 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`);    
    const today = `${year}-${month}-${day}`

    return (
        <div>

        {loadingForm && <Loader><img src={Loading} alt="icone de carregamento"/></Loader>}

        <ScreenForm onSubmit={handleClick}>

            <label htmlFor="name"> Nome </label>
            <input 
                name="name" 
                value={form.name} 
                type="text" 
                placeholder="Nome da Viagem" 
                onChange={onChange} 
                pattern="^.{5,}" 
                required
                autoFocus
            />
            <select 
                name="planet" 
                value={form.planet} 
                onChange={onChange} 
                required
            >
                <option defaultValue="" selected>Escolha o Planeta</option>
                {listPlanets}
            </select>

            <label htmlFor="date">Início</label>
            <input 
                name="date" 
                value={form.date} 
                type="date" 
                placeholder="Início da viagem" 
                onChange={onChange}
                min={today}
                required
            />

            <label htmlFor="description"> Descrição </label>
            <input 
                name="description" 
                value={form.description} 
                type="text" 
                placeholder="Descrição da viagem" 
                onChange={onChange} 
                pattern="^.{30,}" 
                required
            />

            <label htmlFor="durationInDays"> Duração em dias </label>
            <input 
                name="durationInDays" 
                value={form.durationInDays} 
                type="number" 
                placeholder="Duração da viagem (em dias)" 
                onChange={onChange}
                min={50}
                required
            />
            <button>Criar</button>
        </ScreenForm>
        </div>
    )
}

export default CreateTripForm; 