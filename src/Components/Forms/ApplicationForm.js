import React from "react";
import { useState } from "react";
import axios from "axios";
import { useRequestData } from "../../Hooks/useRequestData";
import useForm from "../../Hooks/useForm";
import CountriesList from '../CountriesList.json'
import { BASE_URL } from "../../Constants/Constants";
import { ScreenForm, Loader } from "./style";
import Loading from '../../Images/Loading-Labex.svg'

function ApplicationForm() {

    
    const [form, onChange, clear] = useForm({ name: "", age: "", applicationText: "", profession: "", country: "" })
    const [inputId, setInputId] = useState("")
    const [dataTrips, isLoading, error] = useRequestData(`${BASE_URL}/trips`)    
    const [loadingForm, setLoadingForm] = useState(false)
    const countries = CountriesList

    const Applying = (tripId) => {

        axios.post(`${BASE_URL}/trips/${tripId}/apply`, form, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then ((response) => {
            setLoadingForm(false)
            window.alert("Obrigado por se inscrever!")
            clear()
        })
        .catch((error) => {
            setLoadingForm(false)
            window.alert("Algo deu errado, por favor verifique as informações!")
        })
    }

    // Criando o botão de enviar

    const handleClick = (e) => {
        e.preventDefault()
        Applying(inputId)
        setLoadingForm(true)
    }

    // Opções de Países e viagens.

    const tripsList = dataTrips && dataTrips.trips.map((trip) => {
        return (
            <option key={trip.id} value={trip.id}> {trip.name} </option>
        )
    })

    const listCountries = countries.map((item) => {
        return (
            <option key={item.sigla} value={item.nome_pais}> {item.nome_pais} </option>
        )
    })

    return (
        <div>

        {loadingForm && <Loader><img src={Loading} alt="botão de loading"/></Loader>}

        <ScreenForm onSubmit={handleClick}>
            {isLoading && (
                <select value={inputId} onChange={(e) => (setInputId(e.target.value))}>
                    <option>Escolha uma viagem</option>
                    <option>Carregando...</option>
                </select>
            )}
            {/* lógica para caso tenha algum problema */}
            {!isLoading && error && (
                <select value={inputId} onChange={(e) => (setInputId(e.target.value))}>
                    <option>Escolha uma viagem</option>
                    <option>Ops! Ocorreu um erro.</option>
                </select>
            )}
            {/* lógica para caso tudo ocorra bem */}
            {!isLoading && dataTrips && dataTrips.trips.length > 0 && (
                <select value={inputId} onChange={(e) => (setInputId(e.target.value))} autoFocus>
                    <option>Escolha uma viagem</option>
                    {tripsList}
                </select>
            )}
            {/* lógica para caso não tenha nenhuma viagem disponível */}
            {!isLoading && dataTrips && dataTrips.trips.length === 0 && (
                <select value={inputId} onChange={(e) => (setInputId(e.target.value))}>
                    <option>Escolha uma viagem</option>
                    <option>Nenhuma viagem disponível.</option>
                </select>
            )}

            <label htmlFor="name"> Seu Nome </label>
            <input 
                name="name" 
                value={form.name} 
                onChange={onChange} 
                placeholder="Seu Nome"
                pattern="[\s\S]{3,}"
                type="text"
                required
            />

            <label htmlFor="age"> Sua Idade </label>
            <input 
                name="age" 
                value={form.age} 
                onChange={onChange}  
                placeholder="Sua Idade"
                type="number"
                min={18}
                required
            />

            <label htmlFor="applicationText"> Texto de Candidatura </label>
            <input 
                name="applicationText" 
                value={form.applicationText} 
                onChange={onChange} 
                placeholder="Texto de Candidatura"
                type="text"
                pattern="[\s\S]{30,}"
                required
            />

            <label htmlFor="profession"> Sua Profissão </label>
            <input 
                name="profession" 
                value={form.profession} 
                onChange={onChange} 
                placeholder="Sua Profissão"
                type="text"
                pattern="[\s\S]{8,}"
                required
            />
            <select 
                name="country" 
                value={form.country} 
                onChange={onChange} 
                required
            >
                <option defaultValue="" selected>Selecione o seu País</option>
                {listCountries}
            </select>
            <button>Enviar</button>
            </ScreenForm>
        </div>
    )
}

export default ApplicationForm;