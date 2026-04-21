import styled from "styled-components"
import Imgage from "../../assets/error.svg"
import colors from "../../utils/colors"

const ErrorImg = styled.img`
    width: 400px;

`

const Container = styled.div`
    margin: 10%;
    width: 80%;
    background-color: ${colors.backgoundlight};
    padding: 20px;
    
`


const ErrorPage = ()=>{
    return(
        <Container>
            <h1>Erreur 😥😥😥! Page non trouvée.</h1>
            <div>
                <ErrorImg src={Imgage}/>
            </div>
            
        </Container>
    )
}

export default ErrorPage