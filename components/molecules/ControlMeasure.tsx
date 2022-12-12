import { ChangeEvent, useState, useMemo, ReactNode } from 'react'
import { useEffectOnce, useToggle, useOnClickOutside, useMap, MapOrEntries, useMediaQuery } from 'usehooks-ts'
import { BsChevronDown, BsChevronUp, BsX, BsPlusLg } from 'react-icons/bs'


import { validateInteger } from '@/scripts/helpers/validationHelper'
import { firstUpperCase, cx, cxWSwitch } from '@/scripts/helpers/stringHelper'
import { PostButton } from '@/components/atoms/PostButton'
import { InputSelect } from '@/components/atoms/InputSelect'
import { InputText } from '@/components/atoms/InputText'
export interface ControlMeasureProps {
     inputName?: string;
    updateNewData?: any;
    sublabel?: string;
    label: string;
    display?: string;
    value: string;
    editMode?: boolean;
    inputkeyobj: any; 
}
// ReactFunctionComponent
export const ControlMeasure = ({
     inputName,
    updateNewData,
    sublabel,
    label,
    display,
    value,
    editMode,
    inputkeyobj,
}: ControlMeasureProps) => {
    /*** MOUNTED ***/
    useEffectOnce(() => {
        let _value = typeof value == "string" ? JSON.parse(value) : value
        // if (!inputkeyobj) return Object.keys(inputkeyobj).map((item, index) => {inputkeyForm_actions.set(item,[0,0])})

        Object.keys(inputkeyobj).map((item, index) => {inputkeyForm_actions.set(item, _value ? (_value[item] ? Object.values(_value[item]) : [0,0]) : [0,0]) })
    })

    const inputkeyArray:MapOrEntries<string, any> = useMemo(() => {
        return !inputkeyobj && !Object.keys(inputkeyobj).length ? [] : Object.keys(inputkeyobj).map((item) => [item, inputkeyobj[item]])
    } , [inputkeyobj]);
    const [inputkeyMap, inputkeyMap_actions] = useMap(inputkeyArray);
    const [inputkeyForm, inputkeyForm_actions] = useMap();

    const measureArraySpecific:any = Array.from(Array(61).keys()).map(i => ([`${i}`,{label:`${i}`,id:`${i}`}]))
    const measureArrayGeneral:any = Array.from(Array(13).keys()).map(i => ([`${i}`,{label:`${i}`,id:`${i}`}]))
    const [measureMapSpecific, measureMapSpecific_actions] = useMap<string, any>(measureArraySpecific)
    const [measureMapGeneral, measureMapGeneral_actions] = useMap<string, any>(measureArrayGeneral)
    const local_updateNewData = (newData) => {
        // let fixedNullValue = newData.value === "" ? 
        let spreatParse = Object.keys(inputkeyobj).map(item => {
            if (item != newData. inputName.split(":")[0])
            {
                // console.log("leave as is")
                return `"${item}":`+
                    `{"${inputkeyobj[item].format_titles[0]}":${inputkeyForm.get(item)[0]},`+
                    `"${inputkeyobj[item].format_titles[1]}":${inputkeyForm.get(item)[1]}}`
            }

            if (inputkeyobj[item].format_titles[0] == newData. inputName.split(":")[1])
            {
                inputkeyForm_actions.set(item, [newData.value,inputkeyForm.get(item)[1]])
                return `"${item}":`+
                    `{"${inputkeyobj[item].format_titles[0]}":${newData.value},`+
                    `"${inputkeyobj[item].format_titles[1]}":${inputkeyForm.get(item)[1]}}`
            }

            if (inputkeyobj[item].format_titles[1] == newData. inputName.split(":")[1])
            {
                inputkeyForm_actions.set(item, [inputkeyForm.get(item)[0],newData.value])
                return `"${item}":`+
                    `{"${inputkeyobj[item].format_titles[0]}":${inputkeyForm.get(item)[0]},`+
                    `"${inputkeyobj[item].format_titles[1]}":${newData.value}}`
            }
        })
        const newMeasure = (`{${spreatParse.join(",")}}`).replace(/:,/g,':"",').replace(/:}/g,':""}')
        // console.log("newMeasure",newMeasure)
        updateNewData({ inputName,value:JSON.parse(newMeasure)})
    }

    const smallDevice = useMediaQuery('(max-width: 1200px)')

    return (<div className="flex flex-align-start w-100  mq_xs_md_flex-col">


        <div className="flex w-50 pt-0 ">
            <div className="flex-1 flex-col flex-align-start w-20 tx-bold-5 tx-smd ims-tx-lightdark pr-4">
                <div className={cx(smallDevice && "tx-mdl")}>{label}</div>
                {!!sublabel &&
                    <div className="tx-bold-3 tx-sm pt-1">{sublabel}</div>
                }
            </div>
        </div>
        <div className="w-50 flex-col flex-align-start ">
            {!editMode
              &&<div className="tx-md ims-tx-faded pl-5 pr-4 flex">
                    {Array.from(inputkeyMap.entries()).map(([key, aValue],index) => (<div key={key} className="pr-2 flex">
                            {!!value && !!value[key] && <>
                                <b className="pr-1">{aValue.title[0]}</b>
                                {/*|
                                {!!value[key][aValue.format_titles[0]] ? "yes" : "no"}|
                                {!!value[key][aValue.format_titles[1]] ? "yes" : "no"}|
                                |*/}
                                {!value[key][aValue.format_titles[0]] && !value[key][aValue.format_titles[1]] && <>
                                    --
                                </>}
                                {(!!value[key][aValue.format_titles[0]] || !!value[key][aValue.format_titles[1]]) && <>
                                    {/*<b className="pr-1">{aValue.title[0]}</b>*/}
                                    
                                    {!!value[key][aValue.format_titles[0]] ? <div className="">
                                            {value[key][aValue.format_titles[0]]}
                                            &apos;
                                    </div> : (!value[key][aValue.format_titles[1]]) && <i>-</i> }
                                    {(!!value[key][aValue.format_titles[1]] && !!parseInt(value[key][aValue.format_titles[1]])) ? (
                                        <div className="">
                                            {value[key][aValue.format_titles[1]]}
                                            &quot;
                                        </div>
                                    ) : (!value[key][aValue.format_titles[0]]) && <i>-</i> }
                                </>}
                                {index+1 < inputkeyMap.size && (<div> <i>,</i> </div>)}
                            </>}
                    </div> ))}
                </div>
            }
            {editMode && Array.from(inputkeyMap.entries()).map(([key, aValue]) => (

                <div key={key+"edit"} className="  border-r-8  flex-between w-100 my-1">
                    {aValue.title && <>
                        <div className="flex-1 pb-2 tx-bold-5 ims-tx-lightdark tx-smd">{aValue.title} ({aValue.format_title})</div>
                    </>}


                    <div className={"w-30 "}>
                        <InputSelect compact  inputName={`${key}:${aValue.format_titles[0]}`} updateNewData={local_updateNewData}
                            addMode={false} optMap={measureMapSpecific} parseFunction={(newVal,prevVal)=>validateInteger(newVal,prevVal,0,60)}
                            reference={value && value[key] ? value[key][aValue.format_titles[0]] : 0} optName="label"
                            display={!inputkeyForm.get(key) ? "0" : `${inputkeyForm.get(key)[0]}`} erasable={false} config={{isReadOnly:true}}
                        />
                    </div>

                    {aValue.floatField
                      &&<div className="w-30  ml-1">
                            <InputSelect compact  inputName={`${key}:${aValue.format_titles[1]}`} updateNewData={local_updateNewData}
                                addMode={false} optMap={measureMapGeneral}
                                parseFunction={(newVal,prevVal)=>validateInteger(newVal,prevVal,0,12)}
                                reference={value && value[key] ? value[key][aValue.format_titles[1]] : 0} optName="label"
                                display={!inputkeyForm.get(key) ? "0" : `${inputkeyForm.get(key)[1]}`} erasable={false} config={{isReadOnly:true}}
                            />
                            {/*<InputSelect erasable={false} optMap={new Map()} reference={aValue.floatField.value} optName="label" display={aValue.floatField.value} />*/}
                        </div>
                    }
                </div>
            ))}
        </div>


    </div>)
}