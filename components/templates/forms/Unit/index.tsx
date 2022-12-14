import Link from 'next/link'
import { useState, useMemo, useRef } from 'react'
import { useToggle, useMap } from 'usehooks-ts'
import { BsCollection, BsCheckCircle, BsPencil, BsFileEarmark, BsPencilSquare, BsHourglassSplit, BsCheckAll, BsExclamationTriangle } from 'react-icons/bs';
import { useEffectOnce, useIsFirstRender, useIsMounted, useIsClient, useSsr, useEventListener  } from 'usehooks-ts'


import { IUnit } from '@/scripts/types/unit'
import { DEFAULT_UNIT, } from '@/scripts/types/unit/constants'
import { isStrInteger } from '@/scripts/helpers/stringHelper';
import { dd, dlog } from '@/scripts/helpers/devHelper';
// import { isDevEnvironment  } from '@/scripts/helpers/devHelper';
import { PostData, PostButton } from '@/components/atoms/PostButton'
import { IMS_PrimaryButton, IMS_FadedButton } from '@/components/atoms/IMS_PrimaryButtons'
import { UnitSummary } from '@/components/organisms/Unit/Summary'
import { StandardModal } from '@/components/molecules/StandardModal'
import { NputFile } from '@/components/molecules/InputFile'
import { UnitMainForm } from './MainForm'
import { UnitSummaryForm } from './SummaryForm'
import { UnitMultiInputForm } from './MultiInputForm'
export interface UnitFormProps {
    unit?: IUnit;
    isLoadingRefetching?: any;
    peoplesObj?: any;
    optMapObj?: any;
    orgsList?: any;
    refetch?: () => void;
}
// ReactFunctionComponent
export const UnitFormComponent = ({
    unit,
    optMapObj,
    orgsList,
    peoplesObj,
    isLoadingRefetching,
    refetch=()=>{},
  ...others
}: UnitFormProps) => {
    /****** CREATE ******/
    useEffectOnce(() => {
        setRefreshCount(refreshCount+1)
    })



    /****** DATA ******/
    const $mainDOMObject = useRef(null)
    const [isLoadingEditing, s__isLoadingEditing] = useState<boolean>(false);
    const [succesfulRequest, s__succesfulRequest] = useState<boolean>(true);
    const [editMode, __toggle_editMode, s__editMode] = useToggle(false);
    const [standardModal, __toggle_standardModal, s__standardModal] = useToggle(false);
    const [changedData, changedData_do] = useMap()
    const [newBaseData, s__newBaseData] = useState()
    const { isBrowser } = useSsr()
    const isFirst = useIsFirstRender()
    const [refreshCount, setRefreshCount] = useState<number>(0)
    const isMounted = useIsMounted()
    const customSummaryFormValues = useMemo(() => {
        let { vin } = unit

        return ({
            vin,
        })
    }, [unit])
    const customFormValues = useMemo(() => {
        const {retail_price,min_retail_price, agreement_price, min_agreement_price,} = unit.price || DEFAULT_UNIT.price
        let {axles, color, gvwr, hitch_type, shipping_weight,} = unit.characteristics || DEFAULT_UNIT.characteristics
        let {mso, title_number, title_state, title_status,} = unit.registration_title || DEFAULT_UNIT.registration_title
        let {manufacturer, serial,} = unit.gps || DEFAULT_UNIT.gps
        let {previous_investor, current_investor} = unit.investors || DEFAULT_UNIT.investors
        let {location, physical_as_of, location_related} = unit.locations || DEFAULT_UNIT.locations

        return ({
            price: { retail_price, min_retail_price, agreement_price, min_agreement_price, },
            characteristics: {axles, color, gvwr, hitch_type, shipping_weight,},
            registration_title: {mso, title_number, title_state, title_status,},
            gps: {manufacturer, serial},
            investors: {previous_investor, current_investor},
            locations: {location, physical_as_of, location_related},
        })
    }, [unit]);
    const isValidUnit = useMemo(() => unit.uid != "0000-0000", [unit]);
    const handleTopBottomSave = () => {
        if (isLoadingEditing) return 
        if (!isValidUnit) return 
        if (!editMode) return toggle_editMode()
        toggle_editMode()
    }
    const blockIfEditing = useMemo(()=>{
        return !isValidUnit || editMode ? "Save" : isLoadingEditing ? "stopcursor" : ""
    },[isValidUnit,isLoadingEditing,editMode])



    /****** UPDATE ******/
    const updateNewData = (newDataObj) => {
        // console.log("#R0000T updateNewData reached", newDataObj)
        /*debug*/ dd("#R0000T updateNewData reached", newDataObj)
        changedData_do.set(newDataObj. inputName, newDataObj.value)
    }
    const resetForm = () => {
        alert("reseting form")
    }
    const toggle_editMode = async () => {
        __toggle_editMode()
        if (editMode) // save edit 
        {
            let the_url = `https://ims.jinaron.com/api/v1/unit/${unit.uid}/edit/`
            const changedFieldnames = Array.from(changedData.keys()).join(",")
            if (!changedFieldnames.length) { return }
                
            s__isLoadingEditing(true)

            let the_data = Object.fromEntries(changedData) 
            // /*debug*/ dlog("the_data = Object.fromEntries(changedData)",the_data,"*")
            if (changedData.has("locations"))
            {
                Object.keys(the_data.locations)/*.reverse()*/.map((key,index)=>
                {
                    if (key in the_data.locations && the_data.locations[key] == "None") return
                    the_data[key] = the_data.locations[key]
                })
                delete the_data["locations"]
            }

            if (changedData.has("investors"))
            {
                Object.keys(the_data.investors).map((key,index)=>
                {
                    if (
                            key in the_data.investors &&
                            (
                                the_data.investors[key] == "None" ||
                                (the_data.investors[key] != "" && !isStrInteger(`${the_data.investors[key]}`))
                            )
                        ) return
                    the_data[key] = the_data.investors[key]
                })
                delete the_data["investors"]
            }
            // dd("PREREQUEST parsed data",the_data)
            try {
                const res = await PostData(the_url, the_data, "PUT");
                setRefreshCount(refreshCount+1)
                if (res)
                {
                    s__succesfulRequest(res.ok)
                    // if (isDevEnvironment) { console.log("Succesfully updated", res) }
                    await refetch()
                    s__isLoadingEditing(false)
                    changedData_do.reset()
                }
            } catch (err)    {
                s__succesfulRequest(false)
                s__isLoadingEditing(false)
                changedData_do.reset()
                console.log("error")
                console.log(err)
                    await refetch()
            }
        }
    }



    /****** HTML ******/
    if (!unit) return (
        <div >
            No unit Found
        </div >
    )
    return(<>

        
    <div className="flex-between mq_xs_md_flex-col">

        <div className="flex-col pt-3">
            <h1 className="tx-bold-5 ims-tx-dark flex ">
                {isValidUnit ? `${editMode ? 'Edit' : 'Details'} - Trailer` : "Add Unit"}
            </h1>
        </div>
        <div className="flex mq_xs_md_flex-col">
            <div className="flex-wrap">
                {isValidUnit && !editMode && <>

                    <button onClick={__toggle_standardModal} className="pa-1">
                        <div className="tx-smd ims-tx-faded tx-bold-6 opaci-hov-75 pa-1 flex-center flex-row mq_xs_flex-col">
                            <BsCollection className="ml-2 tx-mdl " />
                            <div className="px-1"> <span>History</span> <span className="pl-1">(3)</span> </div>
                        </div>
                    </button>
                    <button onClick={__toggle_standardModal} className="pa-1">
                        <div className="tx-smd ims-tx-faded tx-bold-6 opaci-hov-75 pa-1 flex-center flex-row mq_xs_flex-col">
                            <BsFileEarmark className="ml-2 tx-mdl " />
                            <div className="px-1"> <span>Documents</span> <span className="pl-1">(9)</span> </div>
                        </div>
                    </button>
                    <button onClick={__toggle_standardModal} className="pa-1">
                        <div className="tx-smd ims-tx-faded tx-bold-6 opaci-hov-75 pa-1 flex-center flex-row mq_xs_flex-col">
                            <BsPencilSquare className="ml-2 tx-mdl " />
                            <div className="px-1"> <span>Notes</span> <span className="pl-1">(6)</span> </div>
                        </div>
                    </button>
                </>}
            </div>
            <div>
                {editMode && <>
                    <button onClick={__toggle_editMode}  className="pa-1">
                        <IMS_FadedButton content="Cancel" />
                    </button>
                </>}
                <button onClick={handleTopBottomSave} className={`pa-1 ${blockIfEditing}`}>
                    <IMS_PrimaryButton content={!isValidUnit || editMode ? "Save" : isLoadingEditing ? "Editing" : "Edit"}
                        precontent={<div className="pr-2 pt-1"><BsPencil/></div>}
                    />
                </button>

                <div className="pos-rel">
                    <div className={((isLoadingEditing || isLoadingRefetching) && refreshCount>1 ? "appear-appear" : "")+" appear-hiding-2 right-0 pos-abs mx-3"}
                        style={{transform:"translate(150%,-80%)"}}
                    >
                        <div className=" opaci-10 ims-tx-shadow-2 hover-1 tx-xl"><BsHourglassSplit /></div>
                    </div>
                    <div className={(!isLoadingEditing && refreshCount>1 ? "appear-once-2" : "")+" appear-hiding right-0 appear-hiding-2 pos-abs  mx-3"}
                        style={{transform:"translate(150%,-100%)"}}
                    >
                        {succesfulRequest ? <div className="tx-green opaci-75 hover-2 tx-xl"><BsCheckAll /></div> : 
                            <div className="tx-red opaci-50 shakefull-2 tx-xl"><BsExclamationTriangle /></div>}
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div className="flex pt-2 pb-3"> {isValidUnit  && (
        !editMode 
            ? <UnitSummary unit={unit} />
            : <UnitSummaryForm unit={unit} refetch={refetch} updateNewData={updateNewData} values={customSummaryFormValues}/>
    ) } </div>

    <hr/>
    <main className="pt-8 mt-3 pos-rel" ref={$mainDOMObject}>
        <UnitMainForm refetch={refetch} editMode={editMode} unit={unit} optMapObj={optMapObj} updateNewData={updateNewData} />
        <UnitMultiInputForm orgsList={orgsList} /* customerList={customerList} */ peoplesObj={peoplesObj}
            updateNewData={updateNewData} values={customFormValues}
            editMode={editMode} unit={unit} optMapObj={optMapObj}
        />


        
        {(!editMode) && 
            <div className={`flex flex-justify-end  mb-6 w-100 `}>
                <button onClick={handleTopBottomSave} className={`pa-1 ${blockIfEditing}`}>
                    <IMS_PrimaryButton content={!isValidUnit || editMode ? "Save" : isLoadingEditing ? "Editing" : "Edit"}
                        precontent={<div className="pr-2 pt-1"><BsPencil/></div>}
                    />
                </button>
            </div>
        }


        {(!isValidUnit || editMode) && 
            <div className="flex-justify-end w-100 pos-rel">
                {(isValidUnit && editMode) && 
                    <button onClick={__toggle_editMode}  className="pa-1">
                        <IMS_FadedButton content="Cancel" />
                    </button>
                }
                <button onClick={handleTopBottomSave} className="pa-1">
                    <IMS_PrimaryButton content={"Save"} />
                </button>

            </div>
        }

    </main>

    {standardModal &&
        <StandardModal title="Documents" subtitle="Upload, remove and view files accompanying this trailer" handleClose={__toggle_standardModal}>
            <div className="pa-8 ">
                <NputFile  label="Upload File" display={"display"} value={"test"} editMode={editMode} />
            </div>
        </StandardModal>
    }

    </>)
}