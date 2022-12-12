import { ChangeEvent, useState, useMemo, useEffect } from 'react'
import { useEffectOnce, useToggle, useOnClickOutside, useMap, MapOrEntries, useMediaQuery } from 'usehooks-ts'
import { BsChevronDown, BsChevronUp, BsX, BsPlusLg } from 'react-icons/bs'


import { tenYearsAgoDateString, tenYearsFutureDateString } from '@/scripts/helpers/dateHelper'
import { useObjMap } from '@/scripts/helpers/useHooksHelper'
import { validateFloat, validateInteger, validateBigint, validateStringLength } from '@/scripts/helpers/validationHelper'
// import { dlog, dd } from '@/scripts/helpers/devHelper'
import { cx, cxWSwitch } from '@/scripts/helpers/stringHelper'
import { PostButton } from '@/components/atoms/PostButton'
import { InputSelect } from '@/components/atoms/InputSelect'
import { InputText } from '@/components/atoms/InputText'
import { InputDate } from '@/components/molecules/InputDate'
// import { InputColor } from '@/components/molecules/InputColor'
// import { MNputRadioSelect } from '@/components/molecules/MNputRadioSelect'
export interface ModuleOutputProps {
    uid: any; 
    inputName: string;
    label: string;
    sublabel?: string;
    addFieldMode?: boolean;
    inputsMapObj: any; 
    optsObj?: any;
    values: any; 
    flex?: any; 
    needsFullObjectAtAPI?: boolean; debug?: boolean; editMode?: boolean;
    updateNewData?: (arg:any) => void;
}
// ReactFunctionComponent
export const ModuleOutput = ({
    uid, inputName, label, sublabel, addFieldMode, inputsMapObj, values,
    optsObj = {}, flex = "wrap", needsFullObjectAtAPI = true, editMode, debug = false,
    updateNewData,
}: ModuleOutputProps) => {
    /****** CREATE ******/
    useEffect(() => {
        __set_formObject({})
        if (typeof inputsMapObj == "undefined") {return }
        if (!inputsMapObj) {return }
        Object.keys(inputsMapObj).map((item, index) => {
            const inputName = inputsMapObj[item].inputName ? inputsMapObj[item].inputName : item
            if (!values)
            {
                __set_formObject(current => ({...current,...{[item]:inputsMapObj[inputName].value}}))
            } else {
                __set_formObject(current => ({...current,...{[item]:""}}))
                if (values[inputName])
                {
                    __set_formObject(current => ({...current,...{[item]:values[inputName]}}))
                    switch (inputsMapObj[item].customFormat)
                    {
                        case "price":
                            // __set_formObject(current => ({...current,...{[item]:
                            //     validateFloat(
                            //         parseFloat(values[inputName]).toFixed(2),
                            //         values[inputName],
                            //         inputsMapObj[item].limit,
                            //         2,
                            //     )}})
                            // )
                            __set_formObject(current => ({...current,...{[item]:parseFloat(values[inputName]).toFixed(2)}}))
                            break;
                        // case "radio":
                        //     __set_formObject(current => ({...current,...{[inputsMapObj[item].radioName]:values[inputsMapObj[item].radioName]}}))
                        //     break;
                    }
                } else {
                    if (inputsMapObj[item].customFormat)
                    {
                        // set default values per format or type
                        switch (inputsMapObj[item].customFormat)
                        {
                            // case "price":
                            //     __set_formObject(current => ({...current,...{[item]:""}}))
                            //     break;
                        }
                    }
                }
            }
        })
        // console.log("danccccc",formObject)
    },[uid,values])



    /****** DATA ******/
    // list of fields to be rendered
    const inputsKeyList = useMemo(() => { return Object.keys(inputsMapObj).filter(i=>i!="_") }, [inputsMapObj]);
    const realInputsKeyList = useMemo(() => { return inputsKeyList.filter(i=>!inputsMapObj[i].autogen) }, [inputsKeyList,inputsMapObj]);
    const autogensKeyList = useMemo(() => { return inputsKeyList.filter(i=>inputsMapObj[i].autogen) }, [inputsKeyList,inputsMapObj]);
    const inputsMapArray:MapOrEntries<string, any> = useMemo(() => {
        return !inputsMapObj && !Object.keys(inputsMapObj).length ? [] :
            Object.keys(inputsMapObj).map((item) => [item, inputsMapObj[item]])
    }, [inputsMapObj]);
    const [inputsMap, inputsMap_actions] = useMap(inputsMapArray);
    // const [inputsMap2, inputsMap2_actions] = useObjMap(inputsMapObj);
    const [modifiedObject,__set_modifiedObject] = useState({})
    const [formObject,__set_formObject] = useState({})
    const autogenMapArray = useMemo(() => (inputsMapArray.filter(([k,v]) => !!v && !v.autogen)),[inputsMapArray])
    const hasAutogenOutputs = useMemo(() => (inputsMapArray.some(([k,v]) => !!v && v.autogen)),[inputsMapArray])
    const [formMapArray,formMapArray_actions] = useMap();

    // const optMapArray = useMemo(() => { return !optObjArray ? [] :
    //     optObjArray.map(object => {return [`${object.id}`, object]; }) } , [optObjArray]);
    // const [optMap, optMap_actions] = useMap<string, any>(optMapArray)
    const [mapmapmap, mapmapmap_actions] = useMap<string, any>()
    const optMapObj = useMemo(() => { 
        // let asd = {}
        for (let key in optsObj)
        {
            // console.log("optsObj[key]",key,optsObj[key])
            mapmapmap_actions.set(key, new Map(optsObj[key].map(object => {return [`${object.id}`, object]; })) )
            // asd[key] = new Map(optsObj[key].map(object => {return [`${object.id}`, object]; })) 
            // asd[key] = useMap(optsObj[key].map(object => {return [`${object.id}`, object]; })) 
            // optMapObj[]
        }
    }, [optsObj])

    const smallDevice = useMediaQuery('(max-width: 1200px)')



    /****** UPDATE ******/
    const handleUpdateNewData = (data) => {
        // dd("#3 data",data)
        const indexOf = Object.keys(inputsMapObj).filter(i=>(!!inputsMapObj[i].inputName && inputsMapObj[i].inputName == data.inputName))[0]
        let newFieldObj = !!indexOf ? {[inputsMapObj[indexOf].inputName]:`${data.value}`} : data
        let newDataObj = {...modifiedObject,...newFieldObj}
        __set_modifiedObject(newDataObj)
        // dd("#2 newDataObj",newDataObj,values)
        let valuesThatChanged = {...values}
        if (!needsFullObjectAtAPI)
        {
            for (const inputProp in values)
            {

                    // console.log("values[inputProp] == newDataObj[inputProp],values[inputProp], newDataObj[inputProp]")
                    // console.log(values[inputProp] == newDataObj[inputProp],values[inputProp], newDataObj[inputProp])
                if (!newDataObj.hasOwnProperty(inputProp))
                {
                    delete valuesThatChanged[inputProp]
                    // delete newDataObj[inputProp]
                }
            }
        }
        let newParsed = { inputName, value: {...valuesThatChanged,...newDataObj}}
        // dd("#1 handleUpdateNewData",newParsed)
        updateNewData(newParsed)
    }



    /****** HTML ******/
    return (<>


        <div className="flex w-100  mq_xs_md_flex-col">
            <div className="flex flex-1 w-max-400px pt-0 ">
                <div className="flex-1 flex-col flex-align-start w-20 tx-bold-5 tx-smd ims-tx-lightdark pr-4 invisible">
                    <div className={cx(smallDevice && "tx-mdl")}>{label}</div>
                    {!!sublabel &&
                        <div className="tx-bold-3 tx-sm pt-1">{sublabel}</div>
                    }
                </div>
            </div>
        </div>

        {hasAutogenOutputs && !editMode && <>
            <hr />
            <div className="flex w-100  mq_xs_md_flex-col">

                <div className="flex flex-1 w-max-400px pt-0 "> </div>
                <div className="flex-3 flex-align-start flex-wrap flex-justify-start w-100">
                {autogensKeyList.map((key,index)=>{
                    const theInputObj = inputsMapObj[key]
                    return <div key={key} className=" px-4 py-3 border-r-8 ims-hov-primary-faded w-200px">
                            {theInputObj.title && <div className="pb-2 tx-bold-5 ims-tx-lightdark tx-smd">{theInputObj.title}</div>}
                            {theInputObj.value && <div className=" ims-tx-faded tx-smd">{theInputObj.value}</div>}
                        </div>
                    })}
                </div>
            </div>
        </>}


    </>)
}