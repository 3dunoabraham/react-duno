import { useEffect } from 'react'


import { dd, isDevEnvironment } from '@/scripts/helpers/devHelper'
import { firstUpperCase } from '@/scripts/helpers/stringHelper'
import { OInputModule } from '@/components/molecules/OInputModule'
// ReactFunctionComponent
export const CustomForm =({
    unit,
    editMode,
    orgsList,
    values,
    inputsMapObj,
    updateNewData,
}) => {
    /*** MOUNTED or UPDATED ***/
    useEffect(() => {
        // dd("orgsList",orgsList)
    },[orgsList])

    return (<div className="flex flex-align-start mq_xs_md_flex-col" > {/*ref={ref}*/}

        
        <div className="flex-col flex-align-start flex-1 pt-0 pa-4">
            {Object.keys(inputsMapObj).map((item, index) => isDevEnvironment && !values[item] ? <div className="w-100 pb-8" key={index}>
                    <hr className="mb-3 w-100" style={{opacity:"100%"}} />
                    <div className="tx-red">failed field ({item})</div>
                    <hr className="mb-3 w-100" style={{opacity:"100%"}} />
                    {Object.keys(values).join(",")}
                    <hr className="mb-3 w-100" style={{opacity:"100%"}} />
                </div> : (
                <div className="w-100" key={index}>
                    <hr className="mb-3 w-100" style={{opacity:"40%"}} />
                    <div key={index} className={`flex-col  w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                        <OInputModule uid={unit.uid} updateNewData={updateNewData} label={inputsMapObj[item]._.label}
                            inputsMapObj={inputsMapObj[item]} editMode={editMode} values={values[item]}   inputName={item}
                            addFieldMode /*  optObjArray={inputsMapObj[item]._.orgs || orgsList} */
                        />
                    </div>
                </div>
            ))}
            <hr className="w-100"/>
        </div >


    </div> )
}