import styled from "styled-components"
import Imgage from "../../assets/error.svg"
import colors from "../../utils/colors"

const ErrorImg = styled.img`
    width: 400px;

`

const Container = styled.div`
    align-content: center;
    width: 80%;
    background-color: ${colors.backgoundlight};
    padding: 20px;
    
`


const ErrorPage = ()=>{
    return(
        <Container>
            <h1>Erreur 😥😥😥! Page no trouvée.</h1>
            <ErrorImg src={Imgage}/>
        </Container>
    )
}

export default ErrorPage