import { ChangeEvent, useState, useMemo, useRef, useEffect } from 'react'
import { useToggle, useOnClickOutside, useEventListener, useMap  } from 'usehooks-ts'
import { BsChevronDown, BsChevronUp, BsX, BsTrash, BsPlusLg } from 'react-icons/bs'






// optName,
// inputName, display, reference, optMap,
// debug=false,addMode=false,erasable=true,compact=false,isEntity=false,
// updateNewData,
// parseFunction = (x,y) => x,
import { useObjMap } from '@/scripts/helpers/useHooksHelper';
import { validateInteger } from '@/scripts/helpers/validationHelper';
// import { isDevEnvironment, dd, dlog } from '@/scripts/helpers/devHelper';
import { cx, cxWSwitch } from '@/scripts/helpers/stringHelper'
import { PostButton } from '@/components/atoms/PostButton'
import { InputSelect, InputSelectProps } from '@/components/atoms/InputSelect'


export interface InputRadioSelectProps {
    theInputObj: any; mapmapmap?; key:any; formObject?:any; valueObj?:any; optObj: any;
}
// ReactFunctionComponent
export const MultiInputRadioSelect = ({theInputObj,..._p}:InputSelectProps & InputRadioSelectProps) => {
    // const [formMap,formMap_actions] = useMap(Object.keys(theInputObj.inputsObj).filter(i=>[i.id,i]));
    // const [formMap,formMap_actions] = useObjMap(theInputObj.inputsObj);
    // const [filteredFormMap, filteredFormMap_actions] = useMap(Array.from(formMap).map(([k,value])=>[value.inputName,k === _p.key])); // inputName
    //  initialize state to default checked radio button
    const [modifiedObject,__set_modifiedObject] = useState({})
    // const [selected, setSelected] = useState(["","company","customer"][_p.valueObj.location_related]);
    const [radioValue, __set_radioValue] = useState(!!_p.valueObj.location_related ? `${_p.valueObj.location_related}` : "0");
    const radioValueString = useMemo(()=>{
        if (!radioValue || radioValue == "0") return "none"
        return ["none","company","customer"][radioValue]
    },[radioValue])
    const newRefreshedValue = useMemo(()=>
    {
        __set_radioValue(_p.valueObj.location_related)
        return true
    },[_p.valueObj.location_related]);
    const optMapMap = useMemo(()=>
    {
        let _optMapMap = new Map()
        Object.keys(theInputObj.inputsObj).map((aRadioSelect, index) =>
        {
            let theNewNewMap = new Map()
            let theOptArray:any[][] = Object.keys(_p.optObj[aRadioSelect]).map((opt,index)=>
            {
                if (!theInputObj.inputsObj[aRadioSelect].optSubName)
                {
                    theNewNewMap.set(_p.optObj[aRadioSelect][opt].id, _p.optObj[aRadioSelect][opt])
                } else {
                    // console.log("_p.optObj[aRadioSelect][opt].peopleid",_p.optObj[aRadioSelect][opt].peopleid)
                    theNewNewMap.set(_p.optObj[aRadioSelect][opt].peopleid, _p.optObj[aRadioSelect][opt])
                }
                return [_p.optObj[aRadioSelect][opt].id,_p.optObj[aRadioSelect][opt]]
            })
            _optMapMap.set(aRadioSelect,theNewNewMap)
        })
        return _optMapMap
    },[_p.optObj]);

 

    /****** UPDATE ******/
    const handleClearUpdate = (event) => {
        _p.updateNewData(
            {
                [theInputObj.radioName]:"0",
                [_p.inputName]:"0"
            }
        )
        __set_radioValue("0");
    }
        // dd("im hererererereer", {[_p.inputName]:""}, event)
        // _p.updateNewData({[theInputObj.radioName]:event.target.value,[_p.inputName]:""})
        // _p.updateNewData({[_p.inputName]:""})


        // dd("******** here",data)
    const handleUpdateNewData = (data) => {
        // console.log("handleUpdateNewData data.value")
        // console.log(data.value)
        if (data.value == "")
        {
            // dlog("handling empty")
        //     _p.updateNewData({inputName:[_p.inputName],value:""})
        //     _p.updateNewData({[theInputObj.radioName]:""})
        //     _p.updateNewData({[_p.inputName]:"",[theInputObj.radioName]:""})
        } else 
        {
            _p.updateNewData({
                [_p.inputName]:data.value,
                [theInputObj.radioName]:radioValue,
            })
        }
    }
        // Object.keys(theInputObj.inputsObj).map((aRadioSelect, index) => {
        //     console.log("aRadioSelect",aRadioSelect)
        //     _p.updateNewData({[_p.inputName]:""})
        // })
    const handleRadioChange = event => {
        // _p.updateNewData({[_p.inputName]:""})
        // console.log(`{[theInputObj.radioName]:event.target.value,[_p.inputName]:""}`)
        // console.log({[theInputObj.radioName]:event.target.value,[_p.inputName]:""})

        // _p.updateNewData(
        //     {
        //         [_p.inputName]:"",
        //         [theInputObj.radioName]:event.target.value,
        //     }
        // )
        __set_radioValue(event.target.value);
    };

    return (<>
        <div className={`flex-3 pr-8 flex-${_p.flex} flex-align-start flex-justify-start w-100 `}>
            <div className="flex-center">
                <div className="flex">
                    {Object.keys(theInputObj.inputsObj).map((aRadioSelect, index) => {
                        return (<div key={index} className={`flex-center  pr-4 clickble block  ${ radioValue == `${index+1}` ? "  ":" opaci-hov-50 "} `}>
                            <div className={` pos-rel flex flex-align-start pr-1 flex-justify-start w-100 `} >
                                <div className="" onClick={(e)=>(console.log/*(e.target.children)*/)}>
                                    <input type="radio" name="choose3" value={`${index+1}`} id={`${index+1}`} checked={`${index+1}` == radioValue}
                                        className="clickble block pa-3 scale-150 " onChange={handleRadioChange}
                                    />
                                </div>
                            </div>
                            {<label onClick={() => {handleRadioChange({target:{value:`${index+1}`}})}} data-for={`${index+1}`} className={`clickble  tx-bold-5 ims-tx-lightdark tx-smd flex py-2`} >
                                {theInputObj.inputsObj[aRadioSelect].title}
                            </label>}
                        </div>)
                    })}
                </div>

                <div className="flex-center ">

                    {("0" == radioValue) &&
                        <div className="opaci-50  ims-tx-dark flex flex-justify-start ims-border-faded border-r-8 py-2 tx-mdl w-min-300px px-4 mr-4">
                            <i className="opaci-25">Select Type</i>
                        </div>
                    }
                    {"0" != radioValue && Object.keys(theInputObj.inputsObj).map((aRadioSelect, index) => {
                        if (`${index+1}` != radioValue) return ""
                        return (<div key={index} className="">
                            <div className={`pos-rel flex flex-align-start  flex-justify-start w-100 ${radioValue == `${index+1}` ? "":" opaci-50 "}`} >
                                <div className={" pr-4 w-min-300px "+` ${radioValue == `${index+1}` ? "":" noclick "} `} >
                                    {true && `${index+1}` == radioValue && <>
                                        {radioValue == _p.valueObj[theInputObj.radioName] && <>
                                            {true && <InputSelect superErasable={true} isEntity={theInputObj.customFormat == "entity"}
                                                config={{placeholder:`Select ${theInputObj.inputsObj[aRadioSelect].title}`}}
                                                inputName={theInputObj.inputName}
                                                erasable={theInputObj.customFormat != "intrange" && theInputObj.customFormat != "enum"}
                                                updateNewData={handleUpdateNewData}
                                                addMode={false} 
                                                optMap={optMapMap.get(aRadioSelect)}  
                                                debug={_p.debug}
                                                reference={_p.valueObj[theInputObj.inputName]} /*   _p.formObject[_p.key]   */
                                                optName={theInputObj.inputsObj[aRadioSelect].optName} 
                                                optSubName={theInputObj.inputsObj[aRadioSelect].optSubName || null}
                                                // display={""}
                                                display={_p.valueObj[theInputObj.inputName] }
                                                parseFunction={theInputObj.limit ? (newVal,prevVal)=>{
                                                    if (theInputObj.customFormat == "intrange") { return validateInteger(newVal,prevVal,0,theInputObj.limit) }
                                                } : (x,y)=>x}
                                            />}
                                        </>}
                                        {radioValue != _p.valueObj[theInputObj.radioName] && <>
                                            {true && <InputSelect superErasable={true} isEntity={theInputObj.customFormat == "entity"}
                                                inputName={theInputObj.inputName}
                                                erasable={theInputObj.customFormat != "intrange" && theInputObj.customFormat != "enum"}
                                                config={{placeholder:`Select ${theInputObj.inputsObj[aRadioSelect].title}`}}
                                                addMode={false} 
                                                updateNewData={handleUpdateNewData}
                                                display={""} reference={""} /*   _p.formObject[_p.key]   */
                                                optMap={optMapMap.get(aRadioSelect)}  
                                                debug={_p.debug}
                                                optName={theInputObj.inputsObj[aRadioSelect].optName} 
                                                optSubName={theInputObj.inputsObj[aRadioSelect].optSubName || null}
                                                // display={""}
                                                parseFunction={theInputObj.limit ? (newVal,prevVal)=>{
                                                    if (theInputObj.customFormat == "intrange") { return validateInteger(newVal,prevVal,0,theInputObj.limit) }
                                                } : (x,y)=>x}
                                            />}
                                        </>}
                                    </>}
                                </div>
                            </div>
                        </div>)





                                    {/* false && `${index+1}` != radioValue && <>
                                        {radioValue == _p.valueObj[theInputObj.radioName] && <>
                                            {false && <InputSelect superErasable={true} isEntity={theInputObj.customFormat == "entity"}
                                                inputName={theInputObj.inputName}
                                                erasable={theInputObj.customFormat != "intrange" && theInputObj.customFormat != "enum"}
                                                updateNewData={handleClearUpdate}
                                                display={""} reference={""}  
                                                addMode={false} 
                                                optMap={optMapMap.get(aRadioSelect)}  
                                                debug={_p.debug}
                                                optName={theInputObj.inputsObj[aRadioSelect].optName} 
                                                optSubName={theInputObj.inputsObj[aRadioSelect].optSubName || null}
                                                
                                                parseFunction={theInputObj.limit ? (newVal,prevVal)=>{
                                                    if (theInputObj.customFormat == "intrange") { return validateInteger(newVal,prevVal,0,theInputObj.limit) }
                                                } : (x,y)=>x}
                                            />}
                                        </>}
                                        {radioValue != _p.valueObj[theInputObj.radioName] && <>
                                            {false && <InputSelect superErasable={true} isEntity={theInputObj.customFormat == "entity"}
                                                inputName={theInputObj.inputName}
                                                optMap={optMapMap.get(aRadioSelect)}  
                                                optName={theInputObj.inputsObj[aRadioSelect].optName}  optSubName={theInputObj.inputsObj[aRadioSelect].optSubName || null}
                                                updateNewData={handleClearUpdate}
                                                display={""} reference={""} 
                                                
                                                addMode={false} debug={_p.debug}
                                                erasable={theInputObj.customFormat != "intrange" && theInputObj.customFormat != "enum"}
                                                parseFunction={theInputObj.limit ? (newVal,prevVal)=>{
                                                    if (theInputObj.customFormat == "intrange") { return validateInteger(newVal,prevVal,0,theInputObj.limit) }
                                                } : (x,y)=>x}
                                            />}
                                        </>}

                                    </> */}




                    })}

                </div> 
                <div onClick={handleClearUpdate} className="pt-2 flex-center opaci-hov-50 ims-tx-dark clickble  tx-lg pb-2">
                    {/*<Child ref={childRef} />*/}
                    <BsTrash />
                </div>
            </div> 
        </div> 

        {/*<hr />
        <InputSelect {..._p} />*/}
    </>)
}
