import { ChangeEvent, useEffect, useState, useMemo, useRef } from 'react'
import { useDebounce, useEffectOnce } from 'usehooks-ts'
import { BsCalendar } from 'react-icons/bs'


// import { dd } from '@/scripts/helpers/devHelper'
import { parseUTCString } from '@/scripts/helpers/dateHelper'
import { IMS_PrimaryButton, IMS_FadedButton } from '@/components/atoms/IMS_PrimaryButtons'
// CORE ReactFunctionComponent
export const InputDate = ({
    reference,
    inputName,
    hasTime = false,
    minDate = null,
    maxDate = null,
    updateNewData,
}) => {
    const [refreshCount2, setRefreshCount2] = useState("")
    const [refreshCount, setRefreshCount] = useState<number>(0)
    const [value, setValue] = useState("")
    // const [valueDate, setValueDate] = useState("")
    useEffectOnce(() => {
        // console.log("typeof", typeof reference, "|",reference,"|",!reference)
        let theParsedDate = parseUTCString(new Date(reference))
        // dd("****",reference,"|",theParsedDate)
        setValue(hasTime ? theParsedDate : theParsedDate.split("T")[0])
        // setValueDate(theParsedDate.split("T"))

    })
    const $theInput = useRef<any>()

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        // console.log("event.target.value")
        // console.log(event.target.value)
        setValue(event.target.value)

        updateNewData({inputName, value: getStringForAPI(event.target.value), })
            // hasTime ? event.target.value.replace("T"," ")+":00" : event.target.value+" 00:00:00",
        // if (hasTime)
        // {
        //     updateNewData({inputName,value:event.target.value.replace("T"," ")+":00"})
        // } else {
        //     updateNewData({inputName,value:event.target.value.replace("T"," ")+":00"})
        // }
    }
    // const handleDateTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setValue(event.target.value)
    //     updateNewData({inputName,value:event.target.value.replace("T"," ")+":00"})
    // }

    const updateAllToNow = () => { 
        let theUTCNow = parseUTCString(new Date())
        setValue(getStringForLocal(theUTCNow))
        updateNewData({inputName, value: getStringForAPI(theUTCNow), })
    }
    const getStringForLocal = (dateString) => { 
        return hasTime ? dateString : dateString.split("T")[0]
    }
    const getStringForAPI = (dateString) => { 
        return hasTime ? dateString.replace("T"," ")+":00" : dateString.split("T")[0]
        // return hasTime ? dateString.replace("T"," ")+":00" : dateString.split("T")[0]+" 00:00:00"
    }
    // const getTheNowStringLocal = () => { 
    //     let theUTCNow = parseUTCString(new Date())
    //     let theNowString = hasTime ? theUTCNow.replace("T"," ")+":00" : theUTCNow.split("T")[0]
    //     return theNowString
    // }
    const handleCalendarClick = () => { 
        if (!$theInput) return
        // console.log($theInput?.current)
        if (!reference)
        {
            updateAllToNow()
        }

        $theInput?.current.showPicker()
        // $theInput?.current.focus()
        // $theInput
    }
    return (
        <div className="flex-center w-100 pos-rel" >
            <div onClick={handleCalendarClick} className="pos-abs left-0 pl-3 ims-tx-lightdark clickble" /*onClick={handleCalendarClick}*/><BsCalendar /></div>
            {/*<input  type="datetime-local" value={value} onChange={handleDateTimeChange} onInput={handleDateTimeChange} ref={$theInput}
                className="py-2 px-4 pl-8 w-100 ims-tx-dark ims-border-faded border-r-5 tx-mdl"
            />*/}

            <input onClick={handleCalendarClick} type="date" value={value} onChange={handleDateChange} onInput={handleDateChange} ref={$theInput}
                min={minDate} max={maxDate}
                className="py-2 px-4 pl-8 w-100 ims-tx-dark ims-border-faded border-r-5 tx-mdl"
            />
            <button onClick={updateAllToNow}  className="pa-1">
                <IMS_FadedButton content="" precontent={<div className="nowrap tx-sm ims-tx-link">Set Today</div>} />
            </button>
        </div>
    )
}