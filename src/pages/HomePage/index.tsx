import styled from "styled-components"
import Countries from "../../components/Countries"
import Logo from "../../components/Logo"

const Container = styled.div`
    width: 80%;
    margin: 0 auto
`

const HomePage = () =>{
    return(
        <Container>
        <Logo/>
        <Countries/>
        </Container>
    )
}

export default HomePage