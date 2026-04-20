import LogoImg from '../../assets/react.svg'
import World from '../../assets/main.jpg'
import styled from 'styled-components'
import colors from '../../utils/colors'

const LogoContainer = styled.div`
    width: 200px;
    height: 60px;
    border-radius: 12px;
    overflow: hidden;
    justify-items: center;
    margin: 0 auto;
    
`

const BackgroundImg = styled.img`
    width: 200px;
    height: 60px;
    
`
const ForgroudContainer = styled.span`
    position: absolute;
    display: flex;
    top: 0px;
    margin-left: 16px;
    gap: 8px;
`



const Logo = ()=>{
    return(
        <LogoContainer>
            <ForgroudContainer>
                <img src={LogoImg} alt="Logo" />
                <p style={
                    {
                        fontSize: "24px",
                        color: `${colors.logo}`,
                        fontWeight: "bold"
                    }
                }>react World</p>
            </ForgroudContainer>
            <BackgroundImg src={World}/>
        </LogoContainer>
    )
}

export default Logo