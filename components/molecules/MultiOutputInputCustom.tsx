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
import { InputColor } from '@/components/molecules/InputColor'
import { MultiInputRadioSelect } from '@/components/molecules/MultiInputRadioSelect'
export interface MultiOutputInputCustomProps {
    uid: any; //map
    inputName: string;
    label: string;
    sublabel?: string;
    addFieldMode?: boolean;
    inputsMapObj: any; //map
    optsObj?: any;
    values: any; //map
    flex?: any; //map
    needsFullObjectAtAPI?: boolean; debug?: boolean; editMode?: boolean;
    updateNewData?: (arg:any) => void;
}
// ReactFunctionComponent
export const MultiOutputInputCustom = ({
    uid,
    inputName,
    label,
    sublabel,
    addFieldMode,
    inputsMapObj,
    values,
    optsObj = {},
    flex = "wrap",
    needsFullObjectAtAPI = true,
    editMode, debug = false,
    updateNewData,
}: MultiOutputInputCustomProps) => {
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
                <div className="flex-1 flex-col flex-align-start w-20 tx-bold-5 tx-smd ims-tx-lightdark pr-4">
                    <div className={cx(smallDevice && "tx-mdl")}>{label}</div>
                    {!!sublabel &&
                        <div className="tx-bold-3 tx-sm pt-1">{sublabel}</div>
                    }
                </div>
            </div>
            {!editMode && <div className={`flex-3 flex-wrap flex-align-start flex-justify-start w-100`}>
                {realInputsKeyList.map((key,index)=>{
                    const theInputObj = inputsMapObj[key]
                    return <div key={key} className=" px-4 py-3 border-r-8 ims-hov-primary-faded w-min-100px">
                        
                        {theInputObj.widget == "select" && theInputObj.customFormat == "radio" && <div>
                            <div className="flex">
                                <div className={`${values[theInputObj.radioName] != 2 && "opaci-50"}`}>
                                    {theInputObj.titlesObj[Object.keys(theInputObj.titlesObj)[1]]}
                                </div>
                                <div className="px-1 opaci-50">
                                    or
                                </div>
                                <div className={`${values[theInputObj.radioName] != 1 && "opaci-50"}`}>
                                    {theInputObj.titlesObj[Object.keys(theInputObj.titlesObj)[0]]}
                                </div>
                            </div>
                        </div>}
                        {( theInputObj.widget != "select" || (theInputObj.widget == "select" && theInputObj.customFormat != "radio") ) && <div>
                            {theInputObj.title && <div className="pb-2 tx-bold-5 ims-tx-lightdark tx-smd">{theInputObj.title}</div>}
                        </div>}
                        {/*|{key}|*/}
                        {!theInputObj.inputName && theInputObj.value && (
                            <div className={cx("  tx-smd ",theInputObj.path ? " ims-tx-link tx-bold-5 clickble opaci-hov--50" : " ims-tx-faded opaci-50 ")}>
                                .{theInputObj.value}.
                            </div>
                        )}
                        {!!theInputObj.inputName && !values[theInputObj.inputName] && (
                            <div className={cx(" tx-smd ",theInputObj.path ? " ims-tx-link tx-bold-5 clickble  opaci-hov--50" : " ims-tx-faded ")}>
                                ---
                            </div>
                        ) }
                        {!!theInputObj.inputName && values[theInputObj.inputName] && (
                            <div className={"flex-center flex-justify-start autoverflow "+
                                    cxWSwitch(theInputObj.customFormat,["narrow","price","integer",""],[150,120,80,200])+
                                    cx(" tx-smd ",theInputObj.path ? " ims-tx-link tx-bold-5 clickble tx-md opaci-hov--50" : " ims-tx-faded  ")}
                            >
                                {theInputObj.customFormat == "price" && (values[theInputObj.inputName] == "0.00" ? "---" : `$${values[theInputObj.inputName]}` )}
                                {theInputObj.widget == "color" && (
                                    <div className="ims-border-faded box-shadow-1 pt-5 px-5 border-r-5"
                                        style={{background:values[theInputObj.inputName]}}
                                    >
                                    </div>
                                )}
                                {theInputObj.customFormat != "price" &&
                                    theInputObj.widget != "color" &&
                                        theInputObj.customFormat != "enum" &&
                                                theInputObj.customFormat != "date" &&
                                                    // theInputObj.inputName != "location" &&
                                                        values[theInputObj.inputName]}
                                {(theInputObj.customFormat == "enum") &&
                                    mapmapmap.has(key) &&
                                        !!mapmapmap.get(key).size &&
                                            !!mapmapmap.get(key).get(formObject[key]) &&
                                                mapmapmap.get(key).get(formObject[key]).label}
                            </div>
                        )}
                    </div>
                })}
            </div>}
            {editMode && <div className={`flex-3 flex-${flex} flex-align-start flex-justify-start w-100`}>
                {realInputsKeyList.map((key,index)=>{
                    const theInputObj = inputsMapObj[key]
                    return <div key={key+"edit"} className=" px-4 py-3 border-r-8 ims-hov-primary-faded">
                        {theInputObj.title && theInputObj.customFormat != "radio" && <div className="pb-2 tx-bold-5 ims-tx-lightdark tx-smd">{theInputObj.title}</div>}
                        {theInputObj.widget == "color" &&
                            <div className="mr-6">
                                <InputColor  inputName={theInputObj.inputName} updateNewData={handleUpdateNewData} reference={formObject[key]}   />
                            </div>
                        }
                        {theInputObj.widget == "string"
                          &&<div className={
                                    cxWSwitch(theInputObj.customFormat,["tiny","narrow","price","integer","entity",""],[100,150,120,120,240,200])}
                                >
                                <InputText   inputName={theInputObj.inputName} updateNewData={handleUpdateNewData} reference={formObject[key]}
                                    parseFunction={theInputObj.limit ? (newVal,prevVal)=>{
                                        if (theInputObj.customFormat == "price") {   return validateFloat(newVal,prevVal,theInputObj.limit) }
                                        if (theInputObj.customFormat == "integer") { return validateInteger(newVal,prevVal,0,theInputObj.limit) }
                                        if (theInputObj.customFormat == "bigint") { return validateBigint(newVal,prevVal,theInputObj.limit) }
                                        if (theInputObj.customFormat == "") { return validateStringLength(newVal,prevVal,theInputObj.limit) }
                                    } : (x,y)=>x}
                                />
                            </div>
                        }
                        {theInputObj.widget == "date"
                          &&<div className={cxWSwitch(theInputObj.customFormat,["narrow",""],[150,350])}>
                                <InputDate minDate={tenYearsAgoDateString} maxDate={tenYearsFutureDateString} inputName={theInputObj.inputName} updateNewData={handleUpdateNewData} reference={formObject[key]}   />
                            </div>
                        }
                        {theInputObj.widget == "select" && theInputObj.customFormat != "radio"
                          &&<div className={
                                    cxWSwitch(theInputObj.customFormat, ["tiny","narrow","entity","intrange","","enum"],
                                                                        [100,200,250,100,200,250])}
                              >
                                <InputSelect isEntity={theInputObj.customFormat == "entity"}
                                    inputName={theInputObj.inputName} erasable={theInputObj.customFormat != "intrange" && theInputObj.customFormat != "enum"}
                                    updateNewData={handleUpdateNewData} addMode={false} 
                                    /* optMap={optMap} */
                                    optMap={mapmapmap.has(key) ? mapmapmap.get(key) : new Map()}  
                                    debug={debug}
                                    reference={formObject[key]}
                                    optName={theInputObj.optName}
                                    optSubName={theInputObj.optSubName || null}
                                    display={
                                                !!theInputObj.optSubName
                                                ? formObject[key][theInputObj.optSubName]
                                                : (
                                                    theInputObj.customFormat != "enum"
                                                    ? formObject[key]
                                                    : (
                                                        mapmapmap.get(key).has(formObject[key])
                                                        ? mapmapmap.get(key).get(formObject[key]).label
                                                        : ""
                                                    )
                                                )
                                            }
                                    parseFunction={theInputObj.limit ? (newVal,prevVal)=>{
                                        if (theInputObj.customFormat == "intrange") { return validateInteger(newVal,prevVal,0,theInputObj.limit) }
                                    } : (x,y)=>x}
                                />
                            </div>
                        }
                        {theInputObj.widget == "select" && theInputObj.customFormat == "radio"
                          &&<div className={
                                    cxWSwitch(theInputObj.customFormat, ["tiny","narrow","entity","intrange","","enum"],
                                                                        [200,150,220,100,200,250])}
                              >
                              {!true && <>
                                  -|{optsObj["customer"].length}|-
                                  </>}
                                {theInputObj.customFormat == "radio" && <MultiInputRadioSelect isEntity={theInputObj.customFormat == "entity"}
                                    valueObj={values}
                                mapmapmap={mapmapmap} key={key} formObject={formObject} theInputObj={theInputObj} flex={flex}
                                    inputName={theInputObj.inputName} erasable={theInputObj.customFormat != "intrange" && theInputObj.customFormat != "enum"}
                                    updateNewData={handleUpdateNewData} addMode={false} 
                                    /* optMap={optMap} */
                                    optObj={optsObj}  
                                    debug={debug}
                                    reference={formObject[key]}
                                    optName={theInputObj.customFormat == "entity" ? "name" : "label"}
                                    display={theInputObj.customFormat != "enum" ?
                                                formObject[key] :
                                                (mapmapmap.get(key).has(formObject[key]) ?
                                                    mapmapmap.get(key).get(formObject[key]).label :
                                                    "")}
                                    parseFunction={theInputObj.limit ? (newVal,prevVal)=>{
                                        if (theInputObj.customFormat == "intrange") { return validateInteger(newVal,prevVal,0,theInputObj.limit) }
                                    } : (x,y)=>x}
                                />}
                            </div>
                        }
                    </div>
                })}
            </div>}
        </div>

        {false && hasAutogenOutputs && !editMode && <>
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