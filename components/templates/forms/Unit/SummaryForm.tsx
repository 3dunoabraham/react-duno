import Link from 'next/link'
import { ChangeEvent, useEffect, useState, useRef, useMemo, ReactNode } from 'react'
import { useDebounce, useEffectOnce, useOnClickOutside, useEventListener } from 'usehooks-ts'


import { validateFloat, validateInteger, validateBigint, validateStringLength } from '@/scripts/helpers/validationHelper'
import { InputText } from '@/components/atoms/InputText'
import { IMS_PrimaryButton, IMS_FadedButton } from '@/components/atoms/IMS_PrimaryButtons'
// ReactFunctionComponent
export const UnitSummaryForm =({ unit }) =>
{
    /****** CREATE ******/
    // useEffectOnce(() => {
    //     console.log("unit.vin")
    //     console.log(unit.vin)
    //     // s__vinValue(unit.vin)
    // })



    /****** DATA ******/
    // const $domObject = useRef(null)
    const [vinValue, s__vinValue] = useState<string>('')



    /****** HTML ******/
    return (


        <div className="flex-wrap ims-tx-faded  tx-md ">
            <div className="pr-2 py-1  flex-center">
                <div className="tx-bold-6 pr-1">Sales Status:</div>
                Available
            </div>
            <div className="pr-2  py-1 flex-center">
                <div className="tx-bold-6 pr-1">Unit ID:</div>
                {unit.uid}
            </div>
            <div className="pr-2  py-1 flex-center w-250px">
                <div className="tx-bold-6 pr-1">VIN:</div>
                {/*<input type="textF" defaultValue={"123ABCV63261356"} />*/}
                {/*<button onClick={()=>{}}  className="pa-1 w-min-200px ">
                    <IMS_FadedButton content="x" />
                </button>*/}
                <InputText   inputName={"vin"} updateNewData={()=>{}} reference={unit.vin}
                    parseFunction={(newVal,prevVal)=>{return validateStringLength(newVal,prevVal,17)}}
                />

            </div>
            <div className=" pa-1 mx-1 nowrap">
                <span className="tx-bold-8">Work Order:</span>
                <Link href="/unit/5835-9669"><a className="ims-tx-link opaci-hov--50 pl-0 pa-1 tx-bold-5"> abc-12345</a></Link>
            </div>
        </div>

        
    )
}