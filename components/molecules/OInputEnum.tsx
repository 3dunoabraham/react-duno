import { ChangeEvent, useState, useMemo, useRef, useEffect } from 'react'
import { useOnClickOutside, useEventListener, useMap  } from 'usehooks-ts'
import { BsChevronDown, BsChevronUp, BsX, BsPlusLg } from 'react-icons/bs'


import { useObjMap } from '@/scripts/helpers/useHooksHelper';
import { validateInteger } from '@/scripts/helpers/validationHelper';
// import { isDevEnvironment, dd } from '@/scripts/helpers/devHelper';
import { jss, jssWSwitch } from '@/scripts/helpers/stringHelper'
import { PostButton } from '@/components/atoms/PostButton'
import { InputSelect, InputSelectProps } from '@/components/atoms/InputSelect'
export interface OInputEnumProps {
    optMap?: any; value?: any; sublabel?: string; label?: string;  inputName?: string; display?: string;
    /* CONFIG */ debug?: boolean; editMode?: boolean; config?: any;
    /* UPDATE */ updateNewData?: any;
}
// ReactFunctionComponent
export const OInputEnum = ({
    updateNewData, optMap, value,
    sublabel, label,  inputName, display, config = {},
    debug = false, editMode,
}: OInputEnumProps) => {
    const memoizedMergedConfig = useMemo(() => {
        return {...{isReadOnly:true},...config}
    }, [config])



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

                    {<InputSelect erasable={false} config={memoizedMergedConfig} inputName={ inputName} updateNewData={updateNewData} optMap={optMap} reference={value} optName="label" display={display} />}
                </div>
            }
        </div>


    </>)
}