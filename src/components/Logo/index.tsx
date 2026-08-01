import LogoImg from '../../assets/react.svg'
import World from '../../assets/main.jpg'
import colors from '../../utils/colors'


const Logo = ()=>{
    return(
        <div className="w-1/5 h-12 rounded-lg overflow-hidden flex items-center justify-center mx-auto">
            <span className="flex flex-row items-center justify-center gap-2 absolute">
                <img src={LogoImg} alt="Logo" />
                <p style={
                    {
                        fontSize: "24px",
                        color: `${colors.logo}`,
                        fontWeight: "bold"
                    }
                }>react World</p>
            </span>
            <img src={World} className="w-full h-full object-cover" />
        </div>
    )
}

export default Logo