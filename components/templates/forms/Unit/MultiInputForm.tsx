import { useMemo, useEffect } from 'react'
import { useMap } from 'usehooks-ts'


// import { dd, isDevEnvironment } from '@/scripts/helpers/devHelper'
import { ddom } from '@/scripts/helpers/devHelper'
import { firstUpperCase } from '@/scripts/helpers/stringHelper'
import { MultiOutputCustom } from '@/components/molecules/MultiOutputCustom'
import { MultiOutputInputCustom } from '@/components/molecules/MultiOutputInputCustom'
// ReactFunctionComponent
export const UnitMultiInputForm =({
    unit, orgsList,
    // customerList,
    values, optMapObj,
    peoplesObj,
    editMode,
    updateNewData,
}) => {
    const peoplesObj_investorList = useMemo(() => {
        return peoplesObj.investorList.map((x)=>({...x,_name:`${x.full_name.first_name} ${x.full_name.last_name}`}))
    },[peoplesObj])
    const peoplesObj_customerList = useMemo(() => {
        return peoplesObj.customerList.map((x)=>({...x,_name:`${x.full_name.first_name} ${x.full_name.last_name}`}))
    },[peoplesObj])
    const axlesObjArray:any = Array.from(Array(4).keys()).map(i => ({label:`${i+1}`,id:`${i+1}`}))
    // const [measureMapGeneral, measureMapGeneral_actions] = useMap<string, any>(axlesObjArray)
    const inputsMapObj = {
        "price": {
            _: {label: "Price",flex:"wrap"},
            sales_price: {title:"Sales Price", inputName:"retail_price", value: "---", widget: "string", customFormat: "price", limit:999000, },
            min_sales_price: {title:"Min Sales Price", inputName:"min_retail_price", value: "---", widget: "string", customFormat: "price", limit:999000, },
            lease_price: {title:"Lease Price", inputName:"agreement_price", value: "---", widget: "string", customFormat: "price", limit:999000, },
            min_lease_price: {title:"Min Lease Price", inputName:"min_agreement_price", value: "---", widget: "string", customFormat: "price", limit:999000, },
        },
        "characteristics": {
            _: {label: "Characteristics",flex:"wrap"},
            color: {title:"Color", value: "Grey", widget: "string", customFormat: "", limit: 24, inputName:"color", },
            axles: {title:"Axles", value: "2", widget: "select", customFormat: "intrange", inputName:"axles", limit:4, config:{isReadOnly: true},  optName:"label"},
            hitch_type: {title:"Hitch Type", value: "AB", widget: "string", customFormat: "tiny", inputName:"hitch_type", },
            shipping_weight: {title:"Shipping Weight (lbs)", value: "2000", widget: "string", customFormat: "integer", inputName:"shipping_weight", limit: 99000 },
            gvwr: {title:"GVWR (lbs)", value: "2005", widget: "string", customFormat: "integer", inputName:"gvwr", limit: 99999 },
        },
        "registration_title": {
            _: {label: "Title",flex:"wrap"},
            title_status: {title:"Title Status", value: "Pending", widget: "select", customFormat: "enum", config:{isReadOnly: true}, optName:"label",inputName:"title_status", },
            title_number: {title:"Title No.", value: "645964548547", widget: "string", customFormat: "bigint", limit: 30, inputName:"title_number", },
            title_state: {title:"Title State", value: "NJ", widget: "select", customFormat: "enum", addMode: true, optName:"label", inputName:"title_state", },
            mso: {title:"MSO", value: "64596454854722115", widget: "string", customFormat: "", inputName:"mso", },
        },
        "locations": {
            _: {label: "Location",flex:"col"},
            location: {title:"Customer or Company", value: "Barbie Trailers", widget: "select", customFormat: "radio", addMode: true, path: true, inputName:"location",
                radioName:"location_related", titlesObj: {"1":"Company","2":"Customer",},
                inputsObj:{
                    company: {title:"Company", value: "", widget: "select", customFormat: "entity", inputName:"company", optName: "name"},
                    customer: {title:"Customer", value: "", widget: "select", customFormat: "entity", inputName:"customer", optName: "_name"},
                    // ,
                },
            },
            physical_as_of: {title:"Physical As Of Date", value: "", widget: "date", customFormat: "", inputName:"physical_as_of"},
            county: {autogen: true, title:"County", value: "Polanko", widget: "", customFormat: "", },
            address: {autogen: true, title:"Address", value: "2222 Fortune Way, Clovis California, 96587", widget: "", customFormat: "", },
        },
        "gps": {
            _: {label: "GPS",flex:"wrap"},
            serial: {title:"Serial", value: "123456789ABC", widget: "string", customFormat: "", inputName:"serial", },
            manufacturer: {title:"Manufacturer", value: "Garmin", widget: "string", customFormat: "entity", addMode: true, inputName:"manufacturer", },
        },
        "investors": {
            _: {label: "Investor",flex:"wrap"},
            // current_investor: {title:"Current Investor", value: "Mitch’s Holdings", widget: "select", customFormat: "entity", optName: "_name", inputName:"current_investor", },
            // previous_investor: {title:"Previous Investor", value: "Trailer Fanatics", widget: "select", customFormat: "entity", optName: "_name", inputName:"previous_investor", },

            current_investor: {title:"Current Investor", value: "", widget: "select", customFormat: "entity", optName:"_name", inputName:"current_investor", },
            previous_investor: {title:"Previous Investor", value: "", widget: "select", customFormat: "entity", optName:"_name", inputName:"previous_investor", },
            // current_investor: {title:"Current Investor", value: "Mitch’s Holdings", widget: "string", customFormat: "", inputName:"current_investor", },
            // previous_investor: {title:"Previous Investor", value: "Trailer Fanatics", widget: "string", customFormat: "", inputName:"previous_investor", },
        },
    }



    return (<div className="flex flex-align-start mq_xs_md_flex-col" > {/*ref={ref}*/}

        {/*<h1>
            Init Custom Form
        </h1>*/}

        <div className="flex-col flex-align-start flex-1 pt-0 pa-4">



            <div className="w-100">
                <hr className="mb-3 w-100" style={{opacity:"40%"}} />
                <div className={`flex-col  w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <MultiOutputInputCustom uid={unit.uid} updateNewData={updateNewData} label={inputsMapObj["price"]._.label}
                        flex={inputsMapObj["price"]._.flex}
                        inputsMapObj={inputsMapObj["price"]} editMode={editMode} values={values["price"]}   inputName={"price"}
                        addFieldMode  
                    />
                </div>
            </div>
            {false && ddom("array",values["characteristics"])}
            <div className="w-100">
                <hr className="mb-3 w-100" style={{opacity:"40%"}} />
                <div className={`flex-col  w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <MultiOutputInputCustom uid={unit.uid} updateNewData={updateNewData} label={inputsMapObj["characteristics"]._.label}
                        flex={inputsMapObj["characteristics"]._.flex}
                        inputsMapObj={inputsMapObj["characteristics"]} editMode={editMode} values={values["characteristics"]}  
                        inputName={"characteristics"} 
                        addFieldMode  optsObj={{axles:axlesObjArray}} 
                    />
                </div>
            </div>
        {/*
        */}
        {/*
        */}
            <div className="w-100">
                <hr className="mb-3 w-100" style={{opacity:"40%"}} />
                <div className={`flex-col  w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <MultiOutputInputCustom uid={unit.uid} updateNewData={updateNewData} label={inputsMapObj["registration_title"]._.label}
                        flex={inputsMapObj["registration_title"]._.flex}
                        inputsMapObj={inputsMapObj["registration_title"]} editMode={editMode} values={values["registration_title"]} 
                        inputName={"registration_title"} 
                        addFieldMode   optsObj={{title_status:optMapObj.title_statuses,title_state:optMapObj.title_states}}
                    />
                </div>
            </div>

            
            <div className="w-100">
                <hr className="mb-3 w-100" style={{opacity:"40%"}} />
                <div className={`flex-col  w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <MultiOutputInputCustom uid={unit.uid} updateNewData={updateNewData} label={inputsMapObj["locations"]._.label}
                        flex={inputsMapObj["locations"]._.flex} 
                        inputsMapObj={inputsMapObj["locations"]} editMode={editMode} values={values["locations"]}   inputName={"locations"}
                        addFieldMode  optsObj={{company:orgsList,customer:peoplesObj_customerList}}  needsFullObjectAtAPI={false} 
                    />
                    {!editMode &&
                        <MultiOutputCustom uid={unit.uid} updateNewData={updateNewData} label={inputsMapObj["locations"]._.label}
                            flex={inputsMapObj["locations"]._.flex} 
                            inputsMapObj={inputsMapObj["locations"]} editMode={false} values={values["locations"]}   inputName={"locations"}
                            addFieldMode  optsObj={{company:orgsList,customer:peoplesObj_customerList}}  needsFullObjectAtAPI={false} 
                        />
                    }
                </div>
            </div>
            
            <div className="w-100">
                <hr className="mb-3 w-100" style={{opacity:"40%"}} />
                <div className={`flex-col  w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <MultiOutputInputCustom uid={unit.uid} updateNewData={updateNewData} label={inputsMapObj["gps"]._.label}
                        flex={inputsMapObj["gps"]._.flex}
                        inputsMapObj={inputsMapObj["gps"]} editMode={editMode} values={values["gps"]}   inputName={"gps"}
                        addFieldMode  
                    />
                </div>
            </div>
            
            <div className="w-100">
                <hr className="mb-3 w-100" style={{opacity:"40%"}} />
                <div className={`flex-col  w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <MultiOutputInputCustom uid={unit.uid} updateNewData={updateNewData} label={inputsMapObj["investors"]._.label}
                        flex={inputsMapObj["investors"]._.flex} 
                        inputsMapObj={inputsMapObj["investors"]} editMode={editMode} values={values["investors"]}   inputName={"investors"}
                        addFieldMode  optsObj={{current_investor:peoplesObj_investorList,previous_investor:peoplesObj_investorList}} 
                    />
                </div>
            </div>

            <hr className="w-100"/>
        </div >


    </div> )
}