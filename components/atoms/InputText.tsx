import { ChangeEvent, useEffect, useState, useRef, useMemo, ReactNode } from 'react'
import { useDebounce, useEffectOnce, useOnClickOutside, useEventListener } from 'usehooks-ts'


// import { dlog } from '@/scripts/helpers/devHelper'
export interface OutputInputTextProps {
    label: string;
    sublabel?: string;
     inputName?: string;
    display: ReactNode | string;
    value: string;
    /****** CONFIG ******/
    editMode?: boolean;
    /*** UPDATER ***/
    updateNewData?: any;
}
// ReactFunctionComponent non-usedComponent
export const OutputInputText = ({
    updateNewData,
    label,
     inputName,
    sublabel,
    display,
    value,
    editMode,
}: OutputInputTextProps) => {
    return (<>
        <div className="w-50 tx-bold-5 tx-smd ims-tx-lightdark pr-4">
            {label || "Label"}
            {!!sublabel &&
                <div className="tx-bold-3 tx-sm pt-1">{sublabel}</div>
            }
        </div>
        <div className="w-50">
            {!editMode && 
                <div className="tx-md ims-tx-faded pl-5 pr-4">
                    <div className="tx-mdl  ims-tx-faded"> {display} </div>
                </div>
            }
            {editMode && <div className="flex"> <InputText  inputName={ inputName} updateNewData={updateNewData} reference={value} /> </div>}
        </div>
    </>)
}



// CORE ReactFunctionComponent
export const InputText = ({
     inputName,
    reference,
    /*** UPDATER ***/
    updateNewData,
    parseFunction = (x,y) => x,
}) => {
    /****** CREATE ******/
    useEffectOnce(() => {
        __set_theValue(reference)
    })


    /****** STATE ******/
    const $domObject = useRef(null)
    const [theValue, __set_theValue] = useState<string>('')
    const [updateCount, __set_updateCount] = useState(0)
    const debouncedValue = useDebounce<string>(theValue, 999)
    const isSameAsReference = useMemo(() => debouncedValue == reference, [debouncedValue,reference]);


    /****** UPDATE ******/
    const handle_onblur = (e) => {
        const _newValue = e.target.value
        if (_newValue === reference && updateCount == 0) return
        __set_theValue(`${e.target.value}`)
        updateNewData({ inputName, value: `${e.target.value}`})
        __set_updateCount(updateCount+1)
    }
    const updateValueWithDebounce = () =>
    {
        if (debouncedValue == "") return
        if (theValue === reference && updateCount == 0) return
        updateNewData({ inputName, value: debouncedValue})
        __set_updateCount(updateCount+1)
    }
    useEventListener('blur', handle_onblur, $domObject)
    useEffect(() => { 
        updateValueWithDebounce()

    }, [debouncedValue,reference])
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        __set_theValue(parseFunction(event.target.value,theValue))
    }


    /****** HTML ******/
    return (
        <div className="flex-col w-100">
            <input type="text" value={theValue} onChange={handleChange} ref={$domObject}
                className="py-2 px-4 w-100 ims-tx-dark ims-border-faded border-r-5 tx-mdl"
            />
        </div>
    )
}