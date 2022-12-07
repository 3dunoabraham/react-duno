import { ChangeEvent, useState, useMemo, useRef, useEffect } from 'react'
import { useToggle, useOnClickOutside, useEventListener, useMap  } from 'usehooks-ts'
import { BsChevronDown, BsChevronUp, BsX, BsPlusLg } from 'react-icons/bs'


import { useObjMap } from '@/scripts/helpers/useHooksHelper';
import { validateInteger } from '@/scripts/helpers/validationHelper';
// import { isDevEnvironment, dd } from '@/scripts/helpers/devHelper';
import { cx, cxWSwitch } from '@/scripts/helpers/stringHelper'
import { PostButton } from '@/components/atoms/PostButton'
import { InputSelect, InputSelectProps } from '@/components/atoms/InputSelect'
export interface OutputInputEnumProps {
    optMap?: any; value?: any; sublabel?: string; label?: string;  inputName?: string; display?: string;
    /* CONFIG */ debug?: boolean; editMode?: boolean;
    /* UPDATE */ updateNewData?: any;
}
// ReactFunctionComponent
export const OutputInputEnum = ({
    updateNewData, optMap, value,
    sublabel, label,  inputName, display,
    debug = false, editMode,
}: OutputInputEnumProps) => {
    return (<>
        

        <div className="w-50 tx-bold-5 tx-smd ims-tx-lightdark pr-4">
            {label || "Label"}
            {!!sublabel &&
                <div className="tx-bold-3 tx-sm pt-1">{sublabel}</div>
            }
        </div>
        <div className="w-50 ">

            {!editMode  ?
                <div className="tx-md ims-tx-faded pl-5 pr-4">
                    {display}
                </div>
                :
                <div className="flex ">

                    {<InputSelect erasable={false}  inputName={ inputName} updateNewData={updateNewData} optMap={optMap} reference={value} optName="label" display={display} />}
                </div>
            }
        </div>


    </>)
}