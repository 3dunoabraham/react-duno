import { ReactNode, useRef } from 'react'
import { useOnClickOutside  } from 'usehooks-ts'
import { BsXLg } from 'react-icons/bs'

import styles from '@/styles/modules/StandardModal.module.css'

export interface ModalProps {
    handleClose: () => void;
    title?: string;
    subtitle?: string;
    children?: ReactNode;
}
// ReactFunctionComponent
export const StandardModal = ({
    handleClose,
    title = "Standard Modal",
    subtitle,
    children,
}: ModalProps) => {
    const $domObject = useRef(null)

    useOnClickOutside($domObject, handleClose)

    return(<div className="flex w-100 h-100vh pos-fixed top-0 left-0 flex-center bg-b-opaci-50 z-999">
        <div className="bg-white w-100 w-max-500px block z-1001 px-4 py-6 border-r-12" ref={$domObject}>
            <div className="flex-between">
                <span className="tx-mdl tx-bold-5">{title}</span>
                <button onClick={handleClose} className="opaci-hov-25 tx-mdl">
                    <BsXLg />
                </button>
            </div>
            {subtitle && <div className="pt-1 ims-tx-faded ">
                <span className=" tx-bold-4">{subtitle}</span>
            </div>}

            {children}
        </div>
    </div>)
}