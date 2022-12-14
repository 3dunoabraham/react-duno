import { ChangeEvent, useEffect, useState, useMemo, useRef } from 'react'
import { useToggle, useOnClickOutside, useMap, useMediaQuery, useInterval, useEventListener } from 'usehooks-ts'
import { BsThreeDots, BsTrash, BsPlus, BsDot, BsCloudArrowDown, BsChevronLeft, BsChevronRight, BsExclamationTriangle } from 'react-icons/bs'
import { AiOutlineLoading } from 'react-icons/ai'
import { ImFilePicture } from 'react-icons/im'


import { dd } from '@/scripts/helpers/devHelper';
import { fetchJsonArray } from '@/scripts/helpers/fetchHelper';
import { IMS_PrimaryButton, IMS_FadedButton } from '@/components/atoms/IMS_PrimaryButtons'
import { API_FILE_UPLOAD_BASE, STATIC_IMAGE_BASE, API_IMAGES } from '@/scripts/api/constants'
import {
    readableSize, parseImgArrayStrQtless, isValidImgExt, parseFileType, parseFileExt
} from '@/scripts/helpers/stringHelper'
import { lerp } from '@/scripts/helpers/mathHelper'
import { StandardDropdown } from '@/components/molecules/StandardDropdown'
import { StandardModal } from '@/components/molecules/StandardModal'
import { StandardSliderCarousel } from '@/components/molecules/StandardSliderCarousel'
import { OInputImagesJustUploaded } from '@/components/molecules/OInputImagesJustUploaded'
import SliderCss from '@/styles/modules/Slider.module.css'
export interface OInputGalleryProps {
    label?: string; display?: string; value?: string; filelistString?: string;
    editMode?: boolean; max?: number; uid: any;
    updateNewData?: any; refetch?: () => void;
}
// ReactFunctionComponent
export const OInputNImages = ({
    label, display, value, filelistString = "[]",
    editMode, max, uid,
    updateNewData, refetch=()=>{},
}: OInputGalleryProps) => {
    return (<>
        <div className="w-100 ">
            <OInputNImage uid={uid} max={max} refetch={refetch}
                reference={value} updateNewData={updateNewData}  filelistString={filelistString}
            />
        </div>
    </>)
}
// CORE ReactFunctionComponent
export const OInputNImage = ({
    uid,
    reference,
    filelistString,
    max,
    debug = true,
    updateNewData, refetch=()=>{},
}) => {
    /****** DATA ******/
    const MAX_IMAGE_SIZE = 2097152
    const numberarray:any = Array.from(Array(2).keys()).map(i => ({label:`${i+1}`,id:`${i+1}`}))
    const duplicateMessage = (
        "an image with the same name is already exist for another Unit,"+
        "change the name or delete the existing one first"
    )
    const smallDevice = useMediaQuery('(max-width: 1200px)')
    const $theInput = useRef<HTMLInputElement>()
    const $domObject = useRef(null)
    const [GW, __set_galleryWidth] = useState<number>(smallDevice ? 320 : 600)
    const [isOpen, __toggle_isOpen, __set_isOpen] = useToggle(false);
    const [isUploading, __set_isUploading] = useState<boolean>(false)
    const [isClicking, __set_isClicking] = useState(false)
    const [isGalleryModal, __toggle_isGalleryModal, __set_isGalleryModal] = useToggle(false);
    const [pageOffset, __set_pageOffset] = useState(0);
    const [percentComplete, __set_percentComplete] = useState<number>(0);
    const currentPage = useMemo(() =>  parseInt((-pageOffset/GW).toString()) , [pageOffset])
    const [firstFile, __set_firstFile] = useState<{name:string,type:string,size:number}>()
    const [loadedImages, loadedImages_actions] = useMap<string, any>(new Map())
    const [imgMap, imgMap_actions] = useMap(new Map())
    const [autoincrementID, __set_autoincrementID] = useState<number>(0)
    const filteredFiles = useMemo(() => (filelistString == "[]") ? [] : parseImgArrayStrQtless(filelistString)
    , [filelistString])
    const isAtLastImage = useMemo(() => pageOffset <= -GW*(filteredFiles.length-1)
    , [filteredFiles,pageOffset])
    const isAtFirstImage = useMemo(() => pageOffset >= 0, [pageOffset])
    const foundFileType = useMemo(() => firstFile?.type ? parseFileType(firstFile.type) : ""
    , [firstFile])
    const foundSize = useMemo(() => !!firstFile && readableSize(firstFile?.size.toString())
    , [firstFile])
    const foundExtInFilename = useMemo(() => firstFile?.name ? parseFileExt(firstFile.name.replace(" ","_")) : ""
    ,[firstFile])
    const validatedFileType = useMemo(() => (isValidImgExt(foundFileType, foundExtInFilename) ? foundFileType : null )
    ,[foundFileType,foundExtInFilename] )
    const foundFilename = useMemo(() => firstFile?.name.replace(" ","_"), [firstFile])



    /****** LISTENERS ******/
    const setNextPage = () => {if (pageOffset > -GW*(filteredFiles.length-1)) { __set_pageOffset(pageOffset-GW) } }
    const setPrevPage = () => {if (pageOffset < 0) {__set_pageOffset(pageOffset+GW) } }
    const handleDrop = (e) => {}
    const handleDeleteImage = async (theImgName,theKey) => {
        await sendDeleteRequest(theImgName)
        imgMap_actions.remove(theKey)
    }
    const removeCurrentImage = async () => {
        let theImgName = filteredFiles[currentPage].replace(STATIC_IMAGE_BASE,"")
        sendDeleteRequest(theImgName)
    }
    const sendDeleteRequest = async (theImageName) => {
        let theImgObjArray = await fetchJsonArray(API_IMAGES,"Data")
        let foundIds = theImgObjArray.filter((theImg)=>{return theImg.label == theImageName })
        if (!foundIds.length) return
        let theImageId = foundIds[0].id
        try {
            let theResult = await fetch(API_IMAGES, {
                headers:{"Content-Type":"application/json"},
                method: 'DELETE',body:`{"imgs_ids":[${theImageId}]}`
            })
            await refetch()
            setPrevPage()
        } catch (err) { dd('Error:', err); }
    }
    const handleChange = () => {
        if (isUploading) return alert("Upload Error: \n Please wait for the current image to be uploaded")
        const firstCurrentFile = $theInput.current.files[0]
        let totalBytes = firstCurrentFile.size
        if (totalBytes > MAX_IMAGE_SIZE) return alert("File Size Error: \n Size of image is larger than the maximum!")
        // console.log("totalBytes",totalBytes)
        // firstCurrentFile.name = firstCurrentFile.name.replace(" ","")

        if (firstCurrentFile.type == "") return alert("File Type Error: \n Corrupt image or file")
        let theParsedFileType = parseFileType(firstCurrentFile.type)
        let theParsedFileExt = parseFileExt(firstCurrentFile.name.replace(" ","_"))
        if (!isValidImgExt(theParsedFileType,theParsedFileExt))
        {
            return alert("File Type/Extension Error: \n Wrong File Type or Extension!")
        }

        __set_firstFile(firstCurrentFile)
        __set_isUploading(true)
        sendImage(firstCurrentFile)
    }
    const sendImage = (firstCurrentFile) => {
        let theUrl = API_FILE_UPLOAD_BASE+`${uid}/`
        const payload = new FormData();
        payload.append("img", firstCurrentFile, firstCurrentFile.name.replace(" ","_"));

        const options = {
          method: 'POST',

          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            // 'Content-Type': 'multipart/form-data',
            // 'Authorization': <AUTH TOKEN>
          },
          body: payload,
          // If you add this, upload won't work
          // headers: {
          //   'Content-Type': 'multipart/form-data',
          // }
        };

        const req = new XMLHttpRequest();
        req.open('POST', theUrl);
        // req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        
        req.upload.addEventListener('progress', (e) => {
            __set_percentComplete(parseInt(`${(e.loaded / e.total)*100}`))
        })
        req.addEventListener('load', async (e) => {
            __set_isUploading(false)
            // console.log("................................",req,"|")
            if (req.status >= 400)
            {
                if (req.statusText == "Request Entity Too Large")
                {
                    __set_firstFile(null)
                    return alert("File Exceeds the Size Limit")
                }
            }
            // console.log("................................",JSON.parse(req.response))
            if (    req.response.trim()[0] == "{" &&
                    JSON.parse(req.response) && JSON.parse(req.response).Message == duplicateMessage)
            {
                __set_firstFile(null)
                return alert("Duplication Error: \n This image has already been assigned!")
            }
            // console.log("eeeeeeeeeeeeeeeeeeeeeeeeee",e,JSON.parse(req.response).message)
            let newSavedImage = {
                size:firstCurrentFile.size,
                name:firstCurrentFile.name.replace(" ","_"),
                lastModified:firstCurrentFile.lastModified,
                type:firstCurrentFile.type,
                // name
            }
            // console.log("adding new object file|firstFile",firstFile,autoincrementID,newSavedImage)
            imgMap_actions.set(autoincrementID,newSavedImage)
            __set_autoincrementID(autoincrementID+1)
            __set_firstFile(null)
            await refetch()
        })
         req.send(payload);

    }
    useOnClickOutside($domObject, () => {
        __set_isOpen(false)
    })



    /****** HTML ******/
    return (


        <div className="flex-col border-r-8  ims-bg-faded w-100 pos-rel" >
            <StandardSliderCarousel {...{
                GW,filteredFileList:filteredFiles,
                loadedImages,loadedImages_actions,
                isClicking,__set_isClicking,
                pageOffset, __set_pageOffset}}
            />

            <div className="pos-abs  top-0 right-0" >
                <div className={` border-r-100p clickble   tx-lg ${SliderCss["dots-button"]} pa-5`}
                    onClick={()=>(isOpen ? __toggle_isOpen() : __set_isOpen(true))}
                >
                    <span className={`pa-2 pb-1 ${SliderCss["dots-dots"]}`}><BsThreeDots /></span>
                </div>
                {isOpen && <div className="w-min-200px  pos-abs right-0 top-0 "  ref={$domObject}>
                    <StandardDropdown isOpen={isOpen} >
                        <div className="flex-col flex-align-start flex-justify-start " >
                            {!!filteredFiles.length && <>
                                <div className="flex-center flex-justify-start pa-2 ims-tx-error clickble w-100 opaci-hov--50"
                                    onClick={() => {__toggle_isOpen();removeCurrentImage()}
                                }>
                                    <span className="px-2 "><BsTrash /></span>
                                    <span className="pb-1">Remove</span>
                                </div>
                                <hr className="w-100"/>
                            </>}
                            <div className="flex-center flex-justify-start pa-2 ims-tx-faded clickble w-100 opaci-hov--50"
                                onClick={() => {__toggle_isOpen();__toggle_isGalleryModal()}}
                            >
                                <span className="px-2 "><BsPlus /></span>
                                <span className="pb-1">Add</span>
                            </div>
                        </div>
                    </StandardDropdown>
                </div>}
            </div>

            <div className={`bg-white mb-3 border-r-25 flex-center bottom-0 pos-abs clickble `} >
                {filteredFiles.map((item,index)=>{
                    if (index == 4)
                    {
                        if (currentPage >= 4)
                        {
                            return <div key={index} className="tx-lg  px-3 py-1 flex">
                                {currentPage+1}
                                <div className="opaci-25"> / {filteredFiles.length} </div>
                            </div>
                        }
                    }
                    if (index > 4) return <div key={index}></div>
                    return <div key={index}>

                            <div className={`   ${SliderCss["emphasis-card"]} ${SliderCss["nav-dot-button"]}
                                                ${currentPage != index ? "ims-tx-faded opaci-hov-10" : ""}
                                                clickble px-2 py-3`}
                                 onClick={()=>{__set_pageOffset(-GW*index) }}
                            >
                                <div className={`border-r-100p ${SliderCss["nav-dot"]}`}
                                    style={{width:"10px",height:"10px",background:currentPage == index ? "#101828" : "#2C334B"}}
                                >
                                </div>
                            </div>
                    </div>
                })}
            </div>

            {/*!isClicking && */<div className={`   flex-center left-0 pos-abs clickble ${SliderCss["emphasis"]}`} >
                <div className={`   ${SliderCss["emphasis-card"]} ${isAtFirstImage && " none stopcursor opaci-25 "}
                                    border-r-100p clickble bg-white  tx-mdl   pa-3 pb-2 mr-4 ma-2 `}
                     onClick={()=>{setPrevPage() }}
                >
                    <div className="noclick"><BsChevronLeft /></div>
                </div>
            </div>}
            {/*!isClicking && */<div className={`   flex-center right-0 pos-abs clickble ${SliderCss["emphasis"]}`} >
                <div className={`   ${SliderCss["emphasis-card"]} ${isAtLastImage && " none stopcursor opaci-25 "}
                                    border-r-100p clickble bg-white  tx-mdl   pa-3 pb-2 mr-4 ma-2`}
                     onClick={()=>{setNextPage() }}
                >
                    <BsChevronRight />
                </div>
            </div>}
            {filteredFiles.length == 0 && <div className={`   flex-center pos-abs clickble ${SliderCss["emphasis"]}`} >
                <div className={`   flex-col border-r-8 clickble bg-white px-4 py-6 pb-1 mr-4 ma-2 
                                    ${SliderCss["emphasis-card"]} `}
                     onClick={()=>{__toggle_isGalleryModal() }}
                >
                    <span className="tx-sm">Add Image</span>
                    <span className="tx-xxl"><BsPlus /></span>
                </div>
            </div>}



            {isGalleryModal &&
                <StandardModal  title="Images" subtitle="Upload or remove images associated with this trailer"
                    handleClose={()=>{if (!isUploading) { __toggle_isGalleryModal() }}}
                >

                    {!!imgMap.size && <div className="">
                        <div className="block py-4 "></div>
                        {Array.from(imgMap.keys()).map((x)=>{
                            let theItem = imgMap.get(x)
                            return (<div key={x}>
                                

                                <OInputImagesJustUploaded {...{
                                                theKey:x,
                                                debug,
                                                handleDeleteImage,
                                                validatedFileType: true,
                                                foundFilename:theItem.name.replace(" ","_"),
                                                foundSize: readableSize(theItem.size),
                                                percentComplete:100}}
                                />
                            </div>)})
                        }
                    </div>}

                    {!!$theInput.current && !!firstFile && (<>
                        <OInputImagesJustUploaded {...{
                                        debug,theKey:0,
                                        validatedFileType,foundFilename,foundSize,
                                        percentComplete:percentComplete-1}}
                        />
                    </>)}
                    {/*<div>{foundFileType},{foundExtInFilename}</div>*/}
                    <div className="flex gap-1 pa-2 opaci-50 tx-ls-1" > File types allowed: JPG, PNG, GIF </div>

                    <div className="pos-rel flex-center flex-col ims-border-faded border-r-8 ">
                        <span className="clickble block w-100">
                            <label htmlFor="theImage" className=" block w-100" onDrop={()=>{}}>
                                <span className=" w-100 py-4 flex-col flex-center">
                                    <div className="clickble ims-bg-primary-trans ims-tx-primary flex-center tx-mdl  border-r-100p tx-lg" style={{minWidth:"50px",height:"50px"}}> 
                                        <BsCloudArrowDown />
                                    </div>
                                    <div className="ims-tx-primary py-2">
                                        <span className="tx-bold-6">Click to upload</span>
                                        <span className="px-1">or</span>
                                        <span>drag and drop</span>
                                    </div>
                                    <span className="tx-bold-2 ims-tx-primary">JPG or PNG</span>
                                        <input type="file" onDrop={handleDrop} onChange={handleChange} ref={$theInput}  role="button" accept="image/*"
                                            className="clickble scale-110 pb-100 pt-8 w-100 opaci-0 pos-abs z-999 " style={{height:"0",cursor:"pointer !important"}} id="theImage"
                                        />
                                </span>
                            </label>
                            
                        </span>

                    </div>

                    <div className="flex mt-3">
                        <button className="flex-1 pa-1" onClick={() => { __toggle_isGalleryModal() }} > <IMS_FadedButton content="Cancel"/> </button>
                        <button className="flex-1 " onClick={() => { __toggle_isGalleryModal() }} > <IMS_PrimaryButton content="Save"/> </button>
                    </div>


                </StandardModal>
            }
        </div>


    )
}