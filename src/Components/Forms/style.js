import styled from "styled-components";

export const ScreenForm = styled.form`
    display: flex;
    width: 60vw;
    margin: 25px;
    flex-direction: column;
    gap: 20px;
    
    
    @media(max-device-width : 800px) {
        width: 100%;
        justify-content: center;
        text-align: center;
        margin: 18px 0;
    }
    input, select {
        
        color: black;
        background-color: #D1FF87;
        border: none;
        box-sizing:border-box;
        width: 100%;
        padding: 15px;
        @media(max-device-width : 800px) {
        width: 90vw;
        justify-content: center;
        text-align: center;
    }
    }
    label {
        display: none;
    }
    button {
        align-self: center;
        background-color: #7BAD2A;
        color: #D1FF87;
        border-radius: 10px;
        width: 130px;
        padding: 15px;
        border: solid 1px #7BAD2A;
        box-shadow: 1px 3px 5px #aaa;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        @media(max-device-width : 800px) {
        width: 120px;
        font-size: 0.8rem;
    }
        :hover {
            cursor: pointer;
            border: 1px solid #7BAD2A;
            background-color: #D1FF87;
            color: #78AD09
        }
        :active {
            transform:scale(0.98)
        }
    }
`

export const Loader = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: 50%;
    display: flex;
    justify-content: center;
    align-items: center;` 