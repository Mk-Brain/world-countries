import type { ReactNode } from "react";

const DialogTitleSection = ({children} : {children : ReactNode}) =>{
    return(
        <div className="flex items-center justify-start gap-2">
            {children}
        </div>
    );
}

export default DialogTitleSection