import { ChangeEvent, useState, useMemo, useEffect } from 'react'
import { useEffectOnce, useOnClickOutside, useMap, MapOrEntries, useMediaQuery } from 'usehooks-ts'
import { BsChevronDown, BsChevronUp, BsX, BsPlusLg } from 'react-icons/bs'


// import { dlog, dd } from '@/scripts/helpers/devHelper'
import { tenYearsAgoDateString, tenYearsFutureDateString } from '@/scripts/helpers/dateHelper'
import { useObjMap } from '@/scripts/helpers/useHooksHelper'
import { validateFloat, validateInteger, validateBigint, validateStringLength } from '@/scripts/helpers/validationHelper'
import { jss, jssWSwitch } from '@/scripts/helpers/stringHelper'
import { PostButton } from '@/components/atoms/PostButton'
import { InputSelect } from '@/components/atoms/InputSelect'
import { InputText } from '@/components/atoms/InputText'
import { InputDate } from '@/components/molecules/InputDate'
// import { InputColor } from '@/components/_backup/InputColor'
import { OInputRadioSelect } from '@/components/molecules/OInputRadioSelect'
export interface OInputModuleProps {
    uid: any; inputName: string; label: string; sublabel?: string; addFieldMode?: boolean;
    inputsMapObj: any; optsObj?: any; values: any; flex?: any;
    needsFullObjectAtAPI?: boolean; debug?: boolean; editMode?: boolean;
    updateNewData?: (arg:any) => void;
}
// ReactFunctionComponent
export const OInputModule = ({
    uid, inputName, label, sublabel, inputsMapObj,
    values, optsObj = {}, flex = "wrap",
    needsFullObjectAtAPI = true, editMode, debug = false, addFieldMode,
    updateNewData,
}: OInputModuleProps) => {
    /****** CREATE ******/
    useEffect(() => {
        s__formObject({})
        if (typeof inputsMapObj == "undefined") {return }
        if (!inputsMapObj) {return }
        Object.keys(inputsMapObj).map((item, index) => {
            const inputName = inputsMapObj[item].inputName ? inputsMapObj[item].inputName : item
            if (!values)
            {
                s__formObject(current => ({...current,...{[item]:inputsMapObj[inputName].value}}))
            } else {
                s__formObject(current => ({...current,...{[item]:""}}))
                if (values[inputName])
                {
                    s__formObject(current => ({...current,...{[item]:values[inputName]}}))
                    switch (inputsMapObj[item].customFormat)
                    {
                        case "price":
                            // s__formObject(current => ({...current,...{[item]:
                            //     validateFloat(
                            //         parseFloat(values[inputName]).toFixed(2),
                            //         values[inputName],
                            //         inputsMapObj[item].limit,
                            //         2,
                            //     )}})
                            // )
                            s__formObject(current => ({...current,...{[item]:parseFloat(values[inputName]).toFixed(2)}}))
                            break;
                        // case "radio":
                        //     s__formObject(current =>
                                // ({...current,...{[inputsMapObj[item].radioName]:values[inputsMapObj[item].radioName]}}))
                        //     break;
                    }
                } else {
                    if (inputsMapObj[item].customFormat)
                    {
                        // set default values per format or type
                        switch (inputsMapObj[item].customFormat)
                        {
                            // case "price":
                            //     s__formObject(current => ({...current,...{[item]:""}}))
                            //     break;
                        }
                    }
                }
            }
        })
        // console.log("danccccc",formObject)
    },[uid,values])



    /****** DATA ******/
    const smallDevice = useMediaQuery('(max-width: 1200px)')
    const inputsMapArray:MapOrEntries<string, any> = useMemo(() => {
        return !inputsMapObj && !Object.keys(inputsMapObj).length ? [] :
            Object.keys(inputsMapObj).map((item) => [item, inputsMapObj[item]])
    }, [inputsMapObj]);
    const [inputsMap, inputsMap_do] = useMap(inputsMapArray);
    const [formMapArray,formMapArray_do] = useMap();
    const [mapmapmap, mapmapmap_do] = useMap<string, any>()
    const inputsKeyList = useMemo(() => { return Object.keys(inputsMapObj).filter(i=>i!="_") }, [inputsMapObj]);
    const realInputsKeyList = useMemo(() => { return inputsKeyList.filter(i=>!inputsMapObj[i].autogen) }
    , [inputsKeyList,inputsMapObj]);
    const autogensKeyList = useMemo(() => { return inputsKeyList.filter(i=>inputsMapObj[i].autogen) }
    , [inputsKeyList,inputsMapObj]);
    const [modifiedObject,s__modifiedObject] = useState({})
    const [formObject,s__formObject] = useState({})
    const autogenMapArray = useMemo(() => (inputsMapArray.filter(([k,v]) => !!v && !v.autogen)),[inputsMapArray])
    const hasAutogenOutputs = useMemo(() => (inputsMapArray.some(([k,v]) => !!v && v.autogen)),[inputsMapArray])
    const optMapObj = useMemo(() => { 
        for (let key in optsObj)
        {
            mapmapmap_do.set(key, new Map(optsObj[key].map(object => {return [`${object.id}`, object]; })) )
        }
    }, [optsObj])



    /****** UPDATE ******/
    const handleUpdateNewData = (data) => {
        const indexOf = Object.keys(inputsMapObj)
                        .filter(i=>(    !!inputsMapObj[i].inputName &&
                                        inputsMapObj[i].inputName == data.inputName))[0]
        let newFieldObj = !!indexOf ? {[inputsMapObj[indexOf].inputName]:`${data.value}`} : data
        let newDataObj = {...modifiedObject,...newFieldObj}
        s__modifiedObject(newDataObj)
        let valuesThatChanged = {...values}
        if (!needsFullObjectAtAPI)
        {
            for (const inputProp in values)
            {
                if (!newDataObj.hasOwnProperty(inputProp)) {delete valuesThatChanged[inputProp] }
            }
        }
        let newParsed = { inputName, value: {...valuesThatChanged,...newDataObj}}
        updateNewData(newParsed)
    }



    /****** HTML ******/
    return (<>


        <div className="flex w-100  mq_xs_md_flex-col">
            <div className="flex flex-1 w-max-400px pt-0 ">
                <div className="flex-1 flex-col flex-align-start w-20 tx-bold-5 tx-smd ims-tx-lightdark pr-4">
                    <div className={jss(smallDevice && "tx-mdl")}>{label}</div>
                    {!!sublabel && <div className="tx-bold-3 tx-sm pt-1">{sublabel}</div> }
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
                        {( theInputObj.widget != "select" ||
                         (theInputObj.widget == "select" && theInputObj.customFormat != "radio") ) &&
                            <div>
                                {theInputObj.title &&
                                    <div className="pb-2 tx-bold-5 ims-tx-lightdark tx-smd">{theInputObj.title}</div>
                                }
                            </div>
                        }
                        {!theInputObj.inputName && theInputObj.value && (
                            <div className={jss("  tx-smd ",theInputObj.path
                                                                ? " ims-tx-link tx-bold-5 clickble opaci-hov--50"
                                                                : " ims-tx-faded opaci-50 ")}
                            >
                                . {theInputObj.value} .
                            </div>
                        )}
                        {!!theInputObj.inputName && !values[theInputObj.inputName] && (
                            <div className={jss(" tx-smd ",theInputObj.path
                                                                ? " ims-tx-link tx-bold-5 clickble  opaci-hov--50"
                                                                : " ims-tx-faded ")}
                            >
                                ---
                            </div>
                        ) }
                        {!!theInputObj.inputName && values[theInputObj.inputName] && (
                            <div className={"flex-center flex-justify-start autoverflow "+
                                    jssWSwitch(theInputObj.customFormat,["narrow","price","integer",""],[150,120,80,200])+
                                    jss(" tx-smd ",theInputObj.path
                                        ? " ims-tx-link tx-bold-5 clickble tx-md opaci-hov--50"
                                        : " ims-tx-faded  ")}
                            >
                                {theInputObj.customFormat == "price" && (values[theInputObj.inputName] == "0.00"
                                    ? "---"
                                    : `$${values[theInputObj.inputName]}` )
                                }
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
                        {theInputObj.title && theInputObj.customFormat != "radio" &&
                            <div className="pb-2 tx-bold-5 ims-tx-lightdark tx-smd">{theInputObj.title}</div>
                        }
                        {/* theInputObj.widget == "color" &&
                            <div className="mr-6">
                                <InputColor  inputName={theInputObj.inputName}
                                    updateNewData={handleUpdateNewData} reference={formObject[key]}  
                                />
                            </div>
                        */}
                        {theInputObj.widget == "string"
                          &&<div className={
                                    jssWSwitch(theInputObj.customFormat,["tiny","narrow","price","integer","entity",""],
                                                                        [100,150,120,120,240,200])}
                                >
                                <InputText inputName={theInputObj.inputName} updateNewData={handleUpdateNewData}
                                    reference={formObject[key]}
                                    parseFunction={theInputObj.limit ? (newVal,prevVal)=>{
                                        if (theInputObj.customFormat == "price")
                                        {   return validateFloat(newVal,prevVal,theInputObj.limit) }
                                        if (theInputObj.customFormat == "integer")
                                        { return validateInteger(newVal,prevVal,0,theInputObj.limit) }
                                        if (theInputObj.customFormat == "bigint")
                                        { return validateBigint(newVal,prevVal,theInputObj.limit) }
                                        if (theInputObj.customFormat == "")
                                        { return validateStringLength(newVal,prevVal,theInputObj.limit) }
                                    } : (x,y)=>x}
                                />
                            </div>
                        }
                        {theInputObj.widget == "date"
                          &&<div className={jssWSwitch(theInputObj.customFormat,["narrow",""],[150,350])}>
                                <InputDate minDate={tenYearsAgoDateString} maxDate={tenYearsFutureDateString}
                                    inputName={theInputObj.inputName}
                                    updateNewData={handleUpdateNewData} reference={formObject[key]}  
                                />
                            </div>
                        }
                        {theInputObj.widget == "select" && theInputObj.customFormat != "radio"
                          &&<div className={ !theInputObj.customWidth
                                    ? jssWSwitch(theInputObj.customFormat, ["tiny","narrow","entity","intrange","","enum"],
                                                                        [100,200,250,100,200,250])
                                    : `w-max-${theInputObj.customWidth}px`
                                }
                              >
                                <InputSelect isEntity={theInputObj.customFormat == "entity"}
                                    inputName={theInputObj.inputName}
                                    erasable={theInputObj.customFormat != "intrange" && theInputObj.customFormat != "enum"}
                                    updateNewData={handleUpdateNewData} addMode={false} 
                                    /* optMap={optMap} */
                                    optMap={mapmapmap.has(key) ? mapmapmap.get(key) : new Map()}  
                                    debug={debug}
                                    reference={formObject[key]}
                                    optName={theInputObj.optName}
                                    optSubName={theInputObj.optSubName || null}
                                    config={"config" in theInputObj ? theInputObj.config : {}}
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
                                        if (theInputObj.customFormat == "intrange") {
                                            return validateInteger(newVal,prevVal,0,theInputObj.limit)
                                        }
                                    } : (x,y)=>x}
                                />
                            </div>
                        }
                        {theInputObj.widget == "select" && theInputObj.customFormat == "radio"
                          &&<div className={
                                    jssWSwitch(theInputObj.customFormat, ["tiny","narrow","entity","intrange","","enum"],
                                                                        [200,150,220,100,200,250])}
                              >
                              {!true && <>
                                  -|{optsObj["customer"].length}|-
                                  </>}
                                {theInputObj.customFormat == "radio" &&
                                    <OInputRadioSelect isEntity={theInputObj.customFormat == "entity"}
                                        valueObj={values}
                                        mapmapmap={mapmapmap} key={key} formObject={formObject}
                                        theInputObj={theInputObj} flex={flex}
                                        inputName={theInputObj.inputName}
                                        erasable={theInputObj.customFormat != "intrange" && theInputObj.customFormat != "enum"}
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
                                            if (theInputObj.customFormat == "intrange")
                                            { return validateInteger(newVal,prevVal,0,theInputObj.limit) }
                                        } : (x,y)=>x}
                                    />
                                }
                            </div>
                        }
                    </div>
                })}
            </div>}
        </div>


    </>)
}