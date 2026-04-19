import LogoImg from '../../assets/react.svg'
import World from '../../assets/main.jpg'
import styled from 'styled-components'

const LogoContainer = styled.div`
    width: 200px;
    height: 60px;
`

const BackgroundImg = styled.img`
    width: 200px;
    height: 60px;
    object-fit: fill;
   
`
const ForgroudContainer = styled.span`
    position: absolute;
    display: flex;
`
const ForgroudImg = styled.img`

`


const Logo = ()=>{
    return(
        <LogoContainer>
            <ForgroudContainer>
                <ForgroudImg src={LogoImg} alt="Logo" />
                <p>react World</p>
            </ForgroudContainer>
            <BackgroundImg src={World}/>
        </LogoContainer>
    )
}

export default Logo