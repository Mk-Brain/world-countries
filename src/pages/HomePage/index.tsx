
import Countries from "../../components/Countries"
import Logo from "../../components/Logo"



const HomePage = () =>{
    return(
        <div className="px-16 py-4 flex flex-col items-center justify-center gap-4">
        <Logo/>
        <Countries/>
        </div>
    )
}

export default HomePage