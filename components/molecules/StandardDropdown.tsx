import { ReactNode, useRef } from 'react'


// ReactFunctionComponent
export const StandardDropdown = ({
    title = "Standard Modal",
    isOpen,
    children,
}) => {
    const $domObject = useRef(null)



    if (!isOpen) return
    return(


        <div className={" ims-border-faded border-r-8  w-100 ims-box-shadow-1 tx-mdl z-100 bg-white  "+(isOpen ? "" : "")} 
            style={{ maxHeight: "320px", overflowY: "auto"}}
        >
        	{children}
    	</div>


    )
}