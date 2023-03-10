import styled from "styled-components";

export const TripContainer = styled.div`
    width: 42vw;
    display: flex;
    margin: 15px;
    background-color: #7BAD2A;
    border: 1px solid #7BAD2A;
    border-radius: 15px;
    @media(max-device-width : 800px) {
        width: 100%;
    }
    a {
        text-decoration: none;
        color: black;
        :hover {
            opacity: 85%;
            transition: all 0.5s;
        }
        :active {
            color: black;
        }
    }
    li {
        display: grid;
        text-transform: uppercase;
        font-weight: 700;
        padding: 35px;
        align-items: center;
        width: 35vw;
        grid-template-columns: 85% 15%;
        @media(max-device-width : 800px) {
        width: 100%;
        justify-content: center;
        text-align: center;
    }
        button {
            border: none;
            align-self: center;
            background-color: #7BAD2A;
            :hover {
                cursor: pointer;
                opacity: 85%;
                transition: all 0.5s;
            }
            img {
                background-color: #7BAD2A;
            }
        }
    }
    
    :hover {
        box-shadow: 1px 3px 5px #aaa;
        cursor: pointer;
        background-color: #D1FF87;
        img {background-color: #D1FF87;}
        button {background-color: #D1FF87;}
    }
` 