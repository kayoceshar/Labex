import React from "react";
import { AllContainer, TripsContainer } from "./style";
import { useRequestData } from "../../Hooks/useRequestData";
import Loading from '../../Images/Loading-Labex.svg'
import { BASE_URL } from "../../Constants/Constants";

function TripsList() {

    const [dataTrips, isLoading, error] = useRequestData(`${BASE_URL}/trips`)

        const tripsList = dataTrips && dataTrips.trips.map((trip) => {
            return (
                <TripsContainer key={trip.id}>
                        <p>{trip.name}</p>
                        <p>{trip.description}</p>
                        <p>{trip.planet}</p>
                        <p>{trip.durationInDays} dias | {trip.date}</p>
                </TripsContainer>
            )
        })

    return (
        <div>
        {isLoading && <img src={Loading} alt="ícone de carregamento"/>}
        {!isLoading && error && <p>Ops! Erro.</p>}
        {!isLoading && dataTrips && dataTrips.trips.length > 0 && (
            <AllContainer>
                <ul>{tripsList}</ul>
            </AllContainer>
        )}
        {!isLoading && dataTrips && dataTrips.trips.length === 0 && <p>Sem viagens disponíveis.</p>}
        </div>
    )
}

export default TripsList;