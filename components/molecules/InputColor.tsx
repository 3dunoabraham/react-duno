import { ChangeEvent, useState, useMemo, useRef, useEffect } from 'react'
import { useToggle, useOnClickOutside, useEventListener, useDebounce } from 'usehooks-ts'
import { BsChevronDown, BsChevronUp, BsX, BsPlusLg } from 'react-icons/bs'


// import { isDevEnvironment, dd } from '@/scripts/helpers/devHelper';
import { cx } from '@/scripts/helpers/stringHelper'
// ReactFunctionComponent
export const InputColor = ({
    reference,  inputName,
    updateNewData,
}) => {
    /****** CREATE ******/
    useEffect(() => {
        __set_theColor(reference)
    },[])



    /****** DATA ******/
    const $domContainer = useRef(null)
    const [theColor, __set_theColor] = useState<string>(reference)
    const debouncedValue = useDebounce(theColor, 999)
    const [updateCount, __set_updateCount] = useState(0)



    /****** UPDATE ******/
    const makeTheUpdate = () =>
    {
        if (theColor === reference && updateCount == 0) return

        // console.log(`theColor | ${theColor}`,reference,"|",updateCount)
        updateNewData({ inputName, value:`${theColor}`})
        __set_updateCount(updateCount+1)
        // console.log(`updated and summed`)

    }
    useEffect(() => { 
        makeTheUpdate()
    }, [debouncedValue])
    const handleChange = (event) => {
        __set_theColor(event.target.value)
    }
    const handleBlur = (event) => {
        __set_theColor(event.target.value)
        makeTheUpdate()
    }

    

    /****** HTML ******/
    return (


        <div className="pos-rel w-100 pt-1 pb-2" ref={$domContainer} style={{transform: "scale(1.68) translate(10px,2px)"}}>
            <input className="pa-0 border-r-5  ims-border-faded" type="color" value={theColor} onChange={handleChange} onBlur={handleBlur} />
        </div>


    )
}