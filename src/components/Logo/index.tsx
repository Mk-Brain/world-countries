import LogoImg from '../../assets/react.svg'
import World from '../../assets/main.jpg'

const Logo = ()=>{
    return(
        <>
        <img src={World}/>
        <div>
            <p>react World</p>
            <img src={LogoImg} alt="Logo" />
        </div>
            
        </>
    )
}

export default Logo