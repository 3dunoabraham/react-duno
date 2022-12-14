import { ImFilePicture } from 'react-icons/im'
import { BsThreeDots, BsTrash, BsPlus, BsDot, BsCloudArrowDown, BsChevronLeft, BsChevronRight, BsExclamationTriangle } from 'react-icons/bs'
import { AiOutlineLoading } from 'react-icons/ai'


// ReactFunctionComponent
export const OInputNImagesJustUploaded = ({
    debug,theKey,handleDeleteImage = null,
    validatedFileType,foundFilename,foundSize,
    percentComplete,
}) => {
    return (<>
        <div className="mb-6 px-4">
            <div className="flex-center " style={{}}> 
                <div className="ims-bg-primary-trans ims-tx-primary flex-center tx-mdl  border-r-100p tx-lg" style={{minWidth:"50px",height:"50px"}}> 
                    <ImFilePicture />
                </div>
                <div className="flex-1 flex-col flex-align-start ml-2 noverflow tx-ellip">
                    <div className="w-100 ">
                        {foundFilename}
                    </div>
                    <div className="opaci-50">
                        {foundSize}
                    </div>
                </div>
                {false && !!handleDeleteImage &&
                    <div className="flex-center tx-lg clickble pt-0 pa-2 opaci-hov--50" onClick={()=>(handleDeleteImage(foundFilename,theKey))} > 
                        <BsTrash />
                    </div>
                }
                {false && !handleDeleteImage &&
                    <div className="flex-center tx-lg clickble pt-0 pa-2  spin-1"  > 
                        <AiOutlineLoading />
                    </div>
                }
            </div>
            <div className="flex-center" style={{}}> 

                <div className="" style={{width:"50px",height:"50px"}}> 
                </div>
                <div className="flex-1 ml-2 bg-b-opaci-20 border-r-25">
                    <div className="ims-bg-primary py-1 border-r-25" style={{width:parseInt(`${percentComplete}`)+"%"}}> </div>
                </div>
                <div className="tx-mdl pl-2" style={{}}> 
                    {parseInt(`${percentComplete}`)}%
                </div>
                {!validatedFileType && <>
                    <div className="flex-center pl-3 tx-lgx tx-red" title="Wrong Extension">
                        <BsExclamationTriangle />
                    </div>
                </>}
            </div>
        </div>
    </>)
}