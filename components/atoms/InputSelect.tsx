import { ChangeEvent, useState, useMemo, forwardRef, useImperativeHandle, useRef, useEffect } from 'react'
import { useToggle, useOnClickOutside, useEventListener, useMap  } from 'usehooks-ts'
import { BsChevronDown, BsChevronUp, BsX, BsTrash, BsPlusLg } from 'react-icons/bs'


import { isDevEnvironment } from '@/scripts/helpers/devHelper';
import { jss, jssWSwitch, isEqInLowerCase, isIncInLowerCase } from '@/scripts/helpers/stringHelper'
import { PostButton } from '@/components/atoms/PostButton'
export interface OInputSelectProps {
    optMap?: any; sublabel?: string; defaultDisplay?: string; label?: string;
     inputName?: string; display?: string; value?: string; optName?: any;
    /* CONFIG */ editMode?: boolean; isEntity?: boolean; addMode?: boolean; erasable?: boolean; config?: any;
    /* UPDATE */ updateNewData?: any;
}
// ReactFunctionComponent
export const OInputSelect = ({
    optName = "label",
    optMap, sublabel, defaultDisplay, label,  inputName, display, value,
    isEntity, editMode, addMode,
    config = {},
    erasable = true, 
    updateNewData,
}: OInputSelectProps) => {
    return (<>
        <div className="w-50 tx-bold-5 tx-smd ims-tx-lightdark pr-4">
            {label || "Label"}
            {!!sublabel &&
                <div className="tx-bold-3 tx-sm pt-1">{sublabel}</div>
            }
        </div>
        <div className="w-50 ">

            {!editMode  ?
                <div className={`tx-md ims-tx-faded pl-5 pr-4 ${!!defaultDisplay ? "tx-i" : ""}`}>
                    {!!defaultDisplay ? defaultDisplay : display}
                </div>
                :
                <div className="flex ">
                    <InputSelect erasable={erasable}  inputName={ inputName}
                        isEntity={isEntity} debug={config.debug} config={config}
                        updateNewData={updateNewData} addMode={addMode} optMap={optMap} reference={value}
                        optName={optName}
                        display={(display == "None" && !!defaultDisplay) ? defaultDisplay : display}
                    />
                </div>
            }
        </div>
    </>)
}



export interface InputSelectProps {
    inputName?: string; display?: string; reference?: string; optName?: any;
    optMap?: any; flex?: string; optSubName?: string;
    /* CONFIG */ editMode?: boolean; isEntity?: boolean; addMode?: boolean;
    debug?: boolean; erasable?: boolean; compact?: boolean; config?: any;
    /* UPDATE */ updateNewData?: any; parseFunction?: any;
}
// CORE ReactFunctionComponent
export const InputSelect = ({
    inputName, reference, display, optName, optMap, optSubName = "",
    debug=false,addMode=false,erasable=true,compact=false,isEntity=false,
    config = {},
    updateNewData,
    parseFunction = (x,y) => x,
}:InputSelectProps) => {
    /****** CREATE ******/
    useEffect(() => {
        s__theId(reference)
        s__displayValue(display == "None" ? "" : display)
    },[])



    /****** DATA ******/
    const $displayInput = useRef(null)
    const $domContainer = useRef(null)
    const [addNewMode, __toggle_addNewMode, s__addNewMode] = useToggle(false)
    const [isOpen, __toggle_isOpen, s__isOpen] = useToggle(false);
    const [displayValue, s__displayValue] = useState<string>('')
    const [theId, s__theId] = useState<string>('')
    const [descriptionInput, s__descriptionInput] = useState<string>('')
    const isDisplayAndTypeMatching = useMemo(() =>{
        let theType = optMap.get(`${theId}`)
        if (!theType) return true
        if (!!optSubName) return displayValue == theType[optName][optSubName]
        if (!optSubName) return displayValue == theType[optName]
    } , [optMap,displayValue, theId,optName, optSubName]); // DEPENDENCIES
    const isKeyMatchingReference = useMemo(() =>{
        return reference == theId
    } , [reference, theId]); // DEPENDENCIES
    const FILTERED_optMap = useMemo(() =>{
        if (!optMap || !optMap.size) return []
        let theType = optMap.get(`${theId}`)
        if (theType && !optSubName && displayValue == theType[optName]) return optMap
        if (theType && !!optSubName && displayValue == theType[optName][optSubName]) return optMap
        if (reference == displayValue) return optMap
        if (reference == "None") return optMap
        if (displayValue == "None") return optMap

        return new Map(
            [...optMap].filter(([key, value]) =>
                {
                //     // console.log("***********--- optName,",optName,key, value,value[optName])
                    if (!value[optName]) return true
                    if (typeof value[optName] == "string")
                    {
                        return isIncInLowerCase(`${value[optName]}`,`${displayValue}`)
                    }
                    return isIncInLowerCase(`${value[optName][optSubName]}`,`${displayValue}`)
                }
            )
        )
    } , [optMap,displayValue, theId,optName,optSubName]); // DEPENDENCIES
    const newDataObject = useMemo(() => ({
        label:displayValue,
        description:descriptionInput
    }), [displayValue, descriptionInput]); // DEPENDENCIES
    const getTypeRefField = useMemo(() => {
        let theType = optMap.get(`${theId}`)
        if (!theType) return "n/a"
        if (!!optSubName) return theType[optName][optSubName]
        return theType[optName]
    }, [optMap, theId,optName, optSubName]); // DEPENDENCIES



    /****** UPDATE ******/
    const setNewSelection = (option) => {
        if (!!optSubName) {s__theId(`${option.peopleid}`); s__displayValue(option[optName][optSubName]) }
        if (!optSubName) {s__theId(`${option.id}`); s__displayValue(option[optName]) }
        
        s__isOpen(false)
        let newUpdateObject = { inputName, value:`${!optSubName ? option.id : option.peopleid}`}
        updateNewData(newUpdateObject)
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        s__displayValue(parseFunction(event.target.value,displayValue))
    }
    const handleClickOutside = () => {
        if (displayValue == "" && display != "None" && display != "")
        {
            if (!!optSubName) setNewSelection({peopleid:"",[optName]:""})
            if (!optSubName) setNewSelection({id:"",[optName]:""})
        }
        
        let theType = optMap.get(`${theId}`)
        if (isDisplayAndTypeMatching && display != "None" && display != "") return s__isOpen(false)
        if (!FILTERED_optMap.size) return s__isOpen(false)
        
        let _value = FILTERED_optMap.entries().next().value[1]
        if (!optSubName && !!_value[optName])
        {
            if (isEqInLowerCase(displayValue,_value[optName]))
            {
                setNewSelection(_value)
            }
        } 
        if (!!optSubName && !!_value[optName] && _value[optName][optSubName])
        {
            if (`${displayValue}`.toLowerCase() === _value[optName][optSubName].toLowerCase())
            {
                setNewSelection({..._value})
            }
        } 
        s__isOpen(false)
    }
    const superClearInput = () => {clearInput(); handleClickOutside() }
    const clearInput = () => {s__displayValue(''); $displayInput.current.focus() }
    const handle_onkeypress = (e) => {if (e.keyCode == 9) {handleClickOutside()} }
    useOnClickOutside($domContainer, handleClickOutside)
    useEventListener('keydown', handle_onkeypress, $displayInput)



    /****** HTML ******/
    return (


        <div className="pos-rel  w-100" ref={$domContainer}>
            <input type="text" defaultValue={theId} hidden />

            <div className={jss("flex  w-100  ims-tx-dark ims-border-faded border-r-8",false?" ims-border-error ":"")}>

                <input ref={$displayInput} value={displayValue} onClick={() => s__isOpen(true)} onChange={handleChange} 
                    type="text" placeholder={config.placeholder}
                    className={jss( "py-2 tx-mdl block opaci-hov-75 noborder w-100 ml-1 clickble",
                                    compact ? "px-1" : "px-4")}
                    readOnly={config.isReadOnly}
                />
                {erasable && isOpen && <div onClick={clearInput} className="px-1 flex-center opaci-hov-50 clickble  tx-lg">
                     
                    <BsX />
                </div> }
                <div onClick={__toggle_isOpen} className="px-2 flex-center opaci-hov-75 clickble  ">
                    {isOpen ? <BsChevronUp /> : <BsChevronDown />}
                </div>
            </div>

            {isOpen &&
                <div className={
                    " pos-abs bottom-0 ims-border-faded border-r-8 "+
                    " right-0 w-100 ims-box-shadow-1 tx-mdl z-999 bg-white  "+
                    (isOpen ? "" : "")} 
                    style={{transform:"translateY(99%)", maxHeight: "320px", overflowY: "auto"}}
                >
                    {(FILTERED_optMap.size == 0 || optMap.size == 0) && <>
                        <div className="opaci-50 pa-2 noclick">
                            N/A
                        </div>
                    </>}
                    {Array.from(FILTERED_optMap.entries()).map(([key, optField],index) => (
                        <div key={index} className="ims-hov-primary-faded clickble "
                            onClick={() => {setNewSelection(!optSubName ? optField : optField)}}
                        >
                            <div className="pa-3">{optSubName ? optField[optName][optSubName] : optField[optName]}</div>
                        </div>
                    ))}
                    {addMode &&
                        <div className="bg-white  tx-md" >
                            {/*WIP:for when the user wants to add a new option on the fly*/false && addNewMode &&
                                <div className="flex-col py-2  w-100">
                                    <hr className="w-100" />
                                    <input type="text" defaultValue={descriptionInput}
                                        onChange={(e) => {s__descriptionInput(e.target.value)}} className="mt-2 mb-1"
                                    />
                                    <PostButton  theData={newDataObject} />
                                </div>
                            }
                            <hr />
                            <div onClick={() => { __toggle_addNewMode() }}
                                className="clickble opaci-hov--50 flex-center tx-bold-5 ims-tx-primary "
                            >
                                {!addNewMode ?
                                    <><small><BsPlusLg /></small><span className="pa-3">Add New</span></>
                                    :
                                    <><span><BsX /></span><span className="pa-3">Cancel</span></>
                                }
                            </div>
                        </div>
                    }
                </div>
            }
        </div>


    )
}