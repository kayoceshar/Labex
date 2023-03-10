import React, {useState} from "react";
import { useRequestData } from "../../Hooks/useRequestData";
import Loading from '../../Images/Loading-Labex.svg'
import LoadingDel from '../../Images/Loading-Delete-Labex.svg'
import { BASE_URL } from "../../Constants/Constants";
import { AllContainer } from "../TripsList/style";
import { TripContainer } from "./style";
import axios from "axios";
import Delete from "../../Images/Delete.png"
import { Link } from "react-router-dom";

function ManageTrips() {

    
    const token = window.localStorage.getItem("token")
    const [dataTrips, isLoading, error, reload, setReload] = useRequestData(`${BASE_URL}/trips`)
    const [loadingForm, setLoadingForm] = useState(false)

    const Deleting = (tripId) => {

        

        if(window.confirm("Confirma a exclusão da viagem?")) {
            axios.delete(`${BASE_URL}/trips/${tripId}`, {
            headers: {
                "auth": token
            }
        })
            .then((response) => {
                setLoadingForm(false)
                window.alert("Viagem excluída com sucesso")
                setReload(!reload)
            })
            .catch((error) => {
                setLoadingForm(false)
                window.alert("ERRO! Tente novamente!")
            })
        } else {
            setLoadingForm(false)
        }
    }

    const onClickDelete = (trip) => {
        setLoadingForm(true)
        Deleting(trip)
    }

    const imageB = !loadingForm ? <img src={Delete} alt="Botão deletar"/> : <img src={LoadingDel} alt="Carregando"/>

    const tripsList = dataTrips && dataTrips.trips.map((trip) => {

        const link = `/admin/trips/${trip.id}`

        return (
            <TripContainer key={trip.id}>
                <li>
                <Link to={link}>
                    <span>{trip.name}</span>
                </Link>
                    <button onClick={() => onClickDelete(trip.id)}> {imageB} </button>
                </li>
            </TripContainer>
        )
    })

    return (
        <div>
            {isLoading && <img src={Loading} alt="ícone de carregamento"/>}
            {!isLoading && error && <p>OPS! erro!</p>}
            {!isLoading && dataTrips && dataTrips.trips.length > 0 && (
                <AllContainer>
                    <ul>{tripsList}</ul>
                </AllContainer>
            )}
            {!isLoading && dataTrips && dataTrips.trips.length === 0 && <p>Nenhuma Viagem Encontrada.</p>}
        </div>
    )
}

export default ManageTrips;