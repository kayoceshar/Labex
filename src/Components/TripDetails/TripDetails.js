import React, { useState } from "react";
import { useRequestData } from "../../Hooks/useRequestData";
import { BASE_URL } from "../../Constants/Constants";
import { useParams } from "react-router-dom";
import { ApprovedContainer, CandidateContainer, TitlePage, DetailsContainer, Loader } from "./style";
import Loading from '../../Images/Loading-Labex.svg'
import { Button, ButtonsDiv, Title } from "../../pages/style";
import { TripsContainer } from '../TripsList/style'
import axios from "axios";

function TripDetails() {

    const pathParams = useParams();  
    
    const [dataTrip, isLoading, error, reload, setReload] = useRequestData(`${BASE_URL}/trip/${pathParams.id}`, {headers: {
        auth: window.localStorage.getItem("token")
    }})
    const [loadingForm, setLoadingForm] = useState(false)

    const title = dataTrip && <TitlePage> {dataTrip.trip.name} </TitlePage>

    const listInfo = dataTrip && (
        <TripsContainer>
            <p>{dataTrip.trip.description}</p>
            <p>{dataTrip.trip.planet}</p>
            <p>{dataTrip.trip.durationInDays} dias | {dataTrip.trip.date}</p>
        </TripsContainer>)

    const DecideCandidate = (candidateId, decide) => {

        const body = {
            "approve": decide
        }

        axios.put(`${BASE_URL}/trips/${pathParams.id}/candidates/${candidateId}/decide`, body, {
            headers: {
                "Content-Type" : "application/json",
                "auth": window.localStorage.getItem("token")
            }
        })
        .then((response) => {
            if(decide) {
                setLoadingForm(false)
                window.alert("Candidato Aceito!")
                setReload(!reload)
            } else {
                setLoadingForm(false)
                window.alert("Candidato recusado.")
                setReload(!reload)
            }
        })
        .catch((error) => {
            console.log(error.response.data)
        })
    }

    const onClickDecide = (person, decide) => {
        setLoadingForm(true)
        DecideCandidate(person, decide)
    }

    const candidates = dataTrip && dataTrip.trip.candidates.map((person) => {
        return (
        <CandidateContainer key={person.id}>
            <p>Nome: <span>{person.name}</span></p>
            <p>Idade: <span>{person.age} anos</span></p>
            <p>Texto de aplicação: <span>{person.applicationText}</span> </p>
            <p>País: <span>{person.country}</span> </p>
            <p>Profissão: <span>{person.profession}</span></p>
            <ButtonsDiv>
                <Button onClick={()=> {onClickDecide(person.id, true)}}>Aprovar</Button>
                <Button onClick={()=> {onClickDecide(person.id, false)}}>Recusar</Button>
            </ButtonsDiv>

        {loadingForm && <Loader><img src={Loading} alt="Carregando"/></Loader>}

        </CandidateContainer>
        )
    })

    const listApproved= dataTrip && dataTrip.trip.approved.map((person) => {
       return <ApprovedContainer key={person.id}>
        <p>{person.name}, {person.age} anos, {person.country}</p>
        </ApprovedContainer>
    })

    return (
        <DetailsContainer>
            {isLoading && <img src={Loading} alt="ícone de carregamento"/>}
            {!isLoading && error && <p>Ops! Erro!</p>}
            {!isLoading && dataTrip && <span>{title}</span>}

            {isLoading && <img src={Loading} alt="ícone de carregamento"/>}
            {!isLoading && error && <p>Ops! Erro!</p>}
            {!isLoading && dataTrip && <div>{listInfo}</div>}

            <Title>Candidatos Pendentes</Title>

            {isLoading && <img src={Loading} alt="ícone de carregamento"/>}
            {!isLoading && error && <p>Ops! Erro!</p>}
            {!isLoading && dataTrip && dataTrip.trip.candidates.length > 0 && <ul>{candidates}</ul>}
            {!isLoading && dataTrip && dataTrip.trip.candidates.length === 0 && <p>Nenhum candidato novo.</p>}

            <Title>Candidatos Aprovados</Title>

            {isLoading && <img src={Loading} alt="ícone de carregamento"/>}
            {!isLoading && error && <p>Ops! Erro!</p>}
            {!isLoading && dataTrip && dataTrip.trip.approved.length > 0 && <ul>{listApproved}</ul>}
            {!isLoading && dataTrip && dataTrip.trip.approved.length === 0 && <p>Sem candidatos aprovados.</p>}
        </DetailsContainer>
    )
}

export default TripDetails;