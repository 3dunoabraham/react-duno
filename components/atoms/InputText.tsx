import { ChangeEvent, useEffect, useState, useRef, useMemo, ReactNode } from 'react'
import { useDebounce, useEffectOnce, useOnClickOutside, useEventListener } from 'usehooks-ts'


// import { dlog } from '@/scripts/helpers/devHelper'
// CORE ReactFunctionComponent
export const InputText = ({
    inputName, reference,
    /* UPDATE */ updateNewData, parseFunction = (x,y) => x,
}) => {
    /****** CREATE ******/
    useEffectOnce(() => {
        s__theValue(reference)
    })



    /****** DATA ******/
    const $domObject = useRef(null)
    const [theValue, s__theValue] = useState<string>('')
    const [updateCount, s__updateCount] = useState(0)
    const debouncedValue = useDebounce<string>(theValue, 999)
    const isSameAsReference = useMemo(() => debouncedValue == reference, [debouncedValue,reference]);



    /****** UPDATE ******/
    const handle_onblur = (e) => {
        const _newValue = e.target.value
        if (_newValue === reference && updateCount == 0) return

        s__theValue(`${e.target.value}`)
        updateNewData({ inputName, value: `${e.target.value}`})
        s__updateCount(updateCount+1)
    }
    const updateValueWithDebounce = () =>
    {
        if (debouncedValue == "") return
        if (theValue === reference && updateCount == 0) return
            
        updateNewData({ inputName, value: debouncedValue})
        s__updateCount(updateCount+1)
    }
    useEventListener('blur', handle_onblur, $domObject)
    useEffect(() => {updateValueWithDebounce() }, [debouncedValue,reference])
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        s__theValue(parseFunction(event.target.value,theValue))
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