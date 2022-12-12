import { useMemo, useRef } from 'react'
import { useMap } from 'usehooks-ts'


import { useArrayMapPlus } from '@/scripts/helpers/useHooksHelper'
import { IUnit, IUnitBaseOpts } from '@/scripts/types/unit'
import { firstUpperCase } from '@/scripts/helpers/stringHelper'
import { IMS_PrimaryButton, IMS_FadedButton } from '@/components/atoms/IMS_PrimaryButtons'
import { OInputSelect } from '@/components/atoms/InputSelect'
import { OInputEnum } from '@/components/molecules/OInputEnum'
import { ControlGallery } from '@/components/molecules/ControlGallery'
import { ControlMeasure } from '@/components/molecules/ControlMeasure'
// import { dlog, dd, isDevEnvironment } from '@/scripts/helpers/devHelper';
export interface UnitMainFormProps {
    updateNewData?: any;
    unit?: IUnit;
    optMapObj?: IUnitBaseOpts,
    editMode?: boolean;
}
// ReactFunctionComponent
export const UnitMainForm = ({
    updateNewData,
    unit,
    optMapObj,
    editMode
}: UnitMainFormProps) => {
    /****** DATA ******/
    const [conditions, conditions_actions, conditions_obj] = useArrayMapPlus(optMapObj.conditions,"id", unit.condition,"id");
    const [statuses, statuses_actions, statuses_obj] = useArrayMapPlus(optMapObj.statuses,"id", unit.status,"id");
    const [model_styles, model_styles_actions, model_styles_obj] = useArrayMapPlus(optMapObj.model_styles,"id", unit.model_style,"label");

    const [distributors, distributors_actions, distributors_obj] = useArrayMapPlus(optMapObj.distributors,"id", unit.distributor,"name");
    const [manufacturers, manufacturers_actions, manufacturers_obj] = useArrayMapPlus(optMapObj.manufacturers,"id", unit.manufacturer,"name");
    const [dealers, dealers_actions, dealers_obj] = useArrayMapPlus(optMapObj.dealers,"id", unit.dealer,"name");
    const [owners, owners_actions, owners_obj] = useArrayMapPlus(optMapObj.owners,"id", unit.owner,"name");
    // const isValidUnit = useMemo(() => unit.uid != "0000-0000", [unit]);
    // const isAddMode = useMemo(() => !isValidUnit && !editMode, [isValidUnit,editMode]);
    const unit_brand = useMemo(() => { return !optMapObj ? -1 : optMapObj.manufacturers.filter(object => {return object.name == unit.brand; })[0] } , [optMapObj,unit]);
    const DEFAULT_INPUT_KEYMAP_OBJECT = {
        "size": {
            width: {title:"Width", format_title:"ft/in", format_titles:["feet","inches"], value: "11", floatField: "9", },
            length: {title:"Length", format_title:"ft/in", format_titles:["feet","inches"], value: "11", floatField: "9", },
            height: {title:"Height", format_title:"ft/in", format_titles:["feet","inches"], value: "11", floatField: "9", },
        },
    }

    /****** UPDATE ******/
    const updateGallery = (newDataObj) => {
    }
    const updateField = (newDataObj) => {
        updateNewData(newDataObj)
    }
    const updateEntityField = (newDataObj) => {
        updateNewData(newDataObj)
    }


    /****** HTML ******/
    return (
        <div className="flex flex-align-start  mq_xs_md_flex-col"> 


            <div className="flex-col flex-align-start flex-1 pt-0 pa-4">
                <div className={`    flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    {<OInputSelect  label="Retailer" sublabel="Name visible on unit"
                        defaultDisplay={unit.brand == "None" ? unit.manufacturer : ""} display={unit.brand}
                        optMap={manufacturers} optName={"name"} value={unit_brand ? unit_brand.id : unit.brand}
                        editMode={editMode} addMode  updateNewData={updateEntityField}   inputName="brand"
                        config={{isReadOnly:true}}
                    />}
                </div>
                    <div className={`flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <OInputSelect  label="Style" updateNewData={updateField}  inputName="model_style"
                        display={unit.model_style} value={model_styles_obj ? model_styles_obj.id : 0 } optMap={model_styles} 
                        editMode={editMode} addMode 
                    /> 
                </div>
                <div className={`     flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <ControlMeasure  label={"Size"}  updateNewData={updateField}  inputName="size"
                        display={"W 15’3” - L 11’ - H -"} value={unit.size}
                        inputkeyobj={DEFAULT_INPUT_KEYMAP_OBJECT.size} editMode={editMode} />
                </div>
                <div className={`flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <OInputEnum  label="Condition" updateNewData={updateField}  inputName="condition" 
                        display={conditions.get(`${unit.condition}`) ? conditions.get(`${unit.condition}`).label : "New"}
                        value={unit.condition} optMap={conditions} 
                        editMode={editMode} 
                    />
                </div>
                <div className={`flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <OInputEnum  label="Inventory Status" updateNewData={updateField}  inputName="status" 
                        display={statuses.get(`${unit.status}`) ? statuses.get(`${unit.status}`).label : "New"}
                        value={unit.status} optMap={statuses} 
                        editMode={editMode} 
                    />
                </div>
                <div className={` flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`} >
                    {<OInputSelect  label="Dealer" isEntity  config={{isReadOnly:true}}
                        display={unit.dealer} value={dealers_obj ? dealers_obj.id : 0}
                        optMap={dealers} optName={"name"}
                        editMode={editMode} addMode  updateNewData={updateEntityField}   inputName="dealer"
                    />}
                </div>
                <div className={` flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`} >
                    {<OInputSelect  label="Distributor" sublabel="The company providing unit to Dealer" isEntity  config={{isReadOnly:true}}
                        display={unit.distributor} value={distributors_obj ? distributors_obj.id : unit.distributor }
                        optMap={distributors} optName={"name"}
                        editMode={editMode} addMode  updateNewData={updateEntityField}   inputName="distributor"
                    />}
                </div>
                <div className={` flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`} >
                    {<OInputSelect  label="Manufacturer" sublabel="Known sometimes as “Retailer”. Who Built the unit?"
                        display={unit.manufacturer} value={manufacturers_obj ? manufacturers_obj.id : unit.manufacturer } config={{isReadOnly:true}}
                        optMap={manufacturers} optName={"name"}
                        editMode={editMode} addMode  updateNewData={updateEntityField}   inputName="manufacturer"
                    />}
                </div>
                <div className={` flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`} >
                    {<OInputSelect  label="Unit Manager" isEntity 
                        display={unit.owner} value={owners_obj ? owners_obj.id : unit.owner } config={{isReadOnly:true}}
                        optMap={owners} optName={"name"}
                        editMode={editMode} addMode  updateNewData={updateEntityField}   inputName="owner" erasable={false}
                    />}
                </div>
            </div>

            <div className="flex-col">
                <div className="flex-col">
                    <></>
                    <div className="">
                        <ControlGallery uid={unit.uid} label="Upload File" display={unit.image} updateNewData={updateGallery}
                            value={unit.images} editMode={editMode} filelist={unit.images} max={(unit.size && unit.size.width) ? parseInt(unit.size.width.inches) : 0}
                        />
                    </div>
                </div>
                {/* !isValidUnit && <button>
                    <IMS_PrimaryButton content="Upload File" />
                </button> */}
            </div>

            
        </div>
    )
}