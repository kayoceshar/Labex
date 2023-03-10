import styled from "styled-components";

export const AllContainer = styled.div`
    margin-top: 17px;
    background-color: #D1FF87;
    border-radius: 12px;
    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 25px;
        padding: 15px;
        margin: 0;
        @media(max-device-width : 800px) {
        justify-content: center;
        align-items: center;
            }
        }
    @media(max-device-width : 800px) {
    width: 100vw;
    }
`

export const TripsContainer = styled.div`
    width: 40vw;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 10px;
    background-color: #D1FF87;
    border-radius: 10px;
    border: 1px solid #7BAD2A;
    list-style: none;
    color: black;
    text-transform: uppercase;
    text-align: center;
    padding: 25px;
    box-sizing:border-box;
        p:nth-child(1) {
            font-weight: 900;
        }
        p:nth-child(2) {
            font-size: 0.8rem;
        }
        p:nth-child(3) {
            font-weight: 700;
        }
        p:nth-child(4) {
            font-size: 0.8rem;
            font-weight: 900;
        }
    :hover {
        background-color: #C3FA6B;
        border: 1px solid black;
    }
    @media(max-device-width : 800px) {
        width: 80vw;
    }
`