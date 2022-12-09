import { ChangeEvent, useEffect, useState, useMemo, useRef } from 'react'
import { useToggle, useOnClickOutside, useMap, useMediaQuery, useInterval, useEventListener } from 'usehooks-ts'
import { BsThreeDots, BsTrash, BsPlus, BsDot, BsChevronLeft, BsChevronRight } from 'react-icons/bs'


import { API_FILE_UPLOAD } from '@/scripts/api/constants'
import { lerp } from '@/scripts/helpers/mathHelper'
import { StandardDropdown } from '@/components/molecules/StandardDropdown'
import { StandardModal } from '@/components/molecules/StandardModal'
import { ImgSlider } from '@/components/molecules/ImgSlider'
import SliderCss from '@/styles/modules/Slider.module.css'
export interface OutputInputGalleryProps {
    label?: string; display?: string; value?: string; filelist?: any;
    editMode?: boolean; max?: number;
    updateNewData?: any;
}
// ReactFunctionComponent
export const OutputInputGallery = ({
    label, display, value, filelist,
    editMode, max,
    updateNewData,
}: OutputInputGalleryProps) => {
    return (<>
        <div className="w-100 ">
            <InputImage max={max} reference={value} updateNewData={updateNewData}  filelist={filelist} />
        </div>
    </>)
}
// CORE ReactFunctionComponent
export const InputImage = ({
    updateNewData,
    reference,
    filelist,
    max,
    ...others
}) => {
    /****** CREATE ******/
    const fakeFileList = useMemo(() => {
        return filelist.slice(0,max)
    },[filelist,max])



    /****** STATE ******/
    const smallDevice = useMediaQuery('(max-width: 1200px)')
    const [GW, __set_galleryWidth] = useState<number>(smallDevice ? 320 : 600)
    const $theInput = useRef<HTMLInputElement>()
    const $controlPagination = useRef()
    const $controlRight = useRef()
    const $controLeft = useRef()
    const [isClicking, __set_isClicking] = useState(false)
    const [pageOffset, __set_pageOffset] = useState(0);
    const [swipeOffset, __set_swipeOffset] = useState(0);
    const [isOpen, __toggle_isOpen, __set_isOpen] = useToggle(false);
    const [firstFile, __set_firstFile] = useState<{name:string,type:string}>()
    const [galleryModal, __toggle_galleryModal, __set_galleryModal] = useToggle(false);
    const $domObject = useRef(null)
    const foundExt = useMemo(() => firstFile?.type ? (firstFile.type.replace(/(.*)\//g, '')) : "", [firstFile])
    const foundExtInFilename = useMemo(() => firstFile?.name ? (firstFile.name.match(/\.[0-9a-z]+$/i)[0]) : "", [firstFile])
    const validatedExt = useMemo(() => ["JPG","PNG","GIF"].indexOf(foundExtInFilename) != -1 ? foundExtInFilename : null, [foundExtInFilename])
    const foundFilename = useMemo(() => firstFile?.name, [firstFile])
    const filteredFileList = useMemo(() => {return fakeFileList }, [fakeFileList])
    const targetOffset = useMemo(() => {return pageOffset + swipeOffset }, [pageOffset,swipeOffset])
    const currentPage = useMemo(() => {return parseInt((-targetOffset/GW).toString()) }, [targetOffset])
    const isAtFirstImage = useMemo(() => {return pageOffset >= 0 }, [pageOffset])
    const isAtLastImage = useMemo(() => {return pageOffset <= -GW*(filteredFileList.length-1) }, [filteredFileList,pageOffset])
    const setNextPage = () => {if (pageOffset > -GW*(filteredFileList.length-1)) {__set_pageOffset(pageOffset-GW) } }
    const setPrevPage = () => {if (pageOffset < 0) {__set_pageOffset(pageOffset+GW) } }
    const numberarray:any = Array.from(Array(2).keys()).map(i => ({label:`${i+1}`,id:`${i+1}`}))
    const [loadedImages, loadedImages_actions] = useMap<string, any>(new Map())



    /****** LISTENERS ******/
    useOnClickOutside($domObject, () => { __set_isOpen(false) })
    const handleChange = () => {
        const firstFile = $theInput.current.files[0]
        __set_firstFile(firstFile)
        const payload = new FormData();
        payload.append('user-file', firstFile, 'file.ext');

        if (firstFile.type == "") return alert("corrupt file, no type found")

        if (prompt(`upload ${firstFile.name}? type "y" to confirm...`) == "y")
        {
            const req = new XMLHttpRequest();
            req.open('POST', API_FILE_UPLOAD);

            req.upload.addEventListener('progress', function(e) {const percentComplete = (e.loaded / e.total)*100; })
            req.addEventListener('load', function() {console.table(req); })
            req.send(payload);
        }
    }

    return (
        <div className="flex-col border-r-8  ims-bg-faded w-100 pos-rel" >

            <ImgSlider {...{
                GW,filteredFileList,
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
                            {!!filteredFileList.length && <>
                                <div className="flex-center flex-justify-start pa-2 ims-tx-error clickble w-100 opaci-hov--50" onClick={() => __toggle_isOpen()}>
                                    <span className="px-2 "><BsTrash /></span>
                                    <span className="pb-1">Remove</span>
                                </div>
                                <hr className="w-100"/>
                            </>}
                            <div className="flex-center flex-justify-start pa-2 ims-tx-faded clickble w-100 opaci-hov--50"
                                onClick={() => {__toggle_isOpen();__toggle_galleryModal()}}
                            >
                                <span className="px-2 "><BsPlus /></span>
                                <span className="pb-1">Add</span>
                            </div>
                        </div>
                    </StandardDropdown>
                </div>}
            </div>

            <div className={`bg-white mb-3 border-r-25 flex-center bottom-0 pos-abs clickble `} ref={$controlPagination} >
                {filteredFileList.map((item,index)=>{
                    if (index == 4)
                    {
                        if (currentPage >= 4)
                        {
                            return <div key={index} className="tx-lg  px-3 py-1 flex">
                                {currentPage+1}
                                <div className="opaci-25">
                                    /
                                    {filteredFileList.length}
                                </div>
                            </div>
                        }
                    }
                    if (index > 4) return <div key={index}></div>
                    return <div key={index}>

                            <div className={`${SliderCss["emphasis-card"]} ${SliderCss["nav-dot-button"]} ${currentPage != index ? "ims-tx-faded opaci-hov-10" : ""}   clickble     px-2 py-3`}
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

            {/*!isClicking && */<div className={`   flex-center left-0 pos-abs clickble ${SliderCss["emphasis"]}`} ref={$controLeft} >
                <div className={`${SliderCss["emphasis-card"]} border-r-100p clickble bg-white  tx-mdl   pa-3 pb-2 mr-4 ma-2 ${isAtFirstImage && " none stopcursor opaci-25 "}`}
                     onClick={()=>{
                         setPrevPage()
                        
                     }}
                
                >
                    <div className="noclick"><BsChevronLeft /></div>
                </div>
            </div>}
            {/*!isClicking && */<div className={`   flex-center right-0 pos-abs clickble ${SliderCss["emphasis"]}`} ref={$controlRight} >
                <div className={`${SliderCss["emphasis-card"]} border-r-100p clickble bg-white  tx-mdl   pa-3 pb-2 mr-4 ma-2 ${isAtLastImage && " none stopcursor opaci-25 "}`}
                     onClick={()=>{
                         setNextPage()
                     }}
                
                >
                    <BsChevronRight />
                </div>
            </div>}
            {filteredFileList.length == 0 && <div className={`   flex-center pos-abs clickble ${SliderCss["emphasis"]}`} ref={$controlRight} >
                <div className={`${SliderCss["emphasis-card"]} flex-col border-r-8 clickble bg-white     px-4 py-6 pb-1 mr-4 ma-2 `}
                     onClick={()=>{
                        __toggle_galleryModal()
                     }}
                
                >
                    <span className="tx-sm">Add Image</span>
                    <span className="tx-xxl"><BsPlus /></span>
                </div>
            </div>}
            {galleryModal &&
                <StandardModal title="Images" subtitle="Upload or remove images associated with this trailer" handleClose={__toggle_galleryModal}>

                    <div className="flex gap-1 pa-1 mt-8" > File types allowed: JPG, PNG, GIF </div>
                    <input type="file" onChange={handleChange} ref={$theInput} hidden
                        className="py-2 px-4 w-100 ims-tx-dark ims-border-faded border-r-5 tx-mdl"
                    />
                    <div className="px-4 py-2 opaci-hov--50  tx-md ims-bg-primary tx-white border-r-8 clickble" onClick={() => $theInput.current.click()}>
                        Select Image
                    </div>
                </StandardModal>
            }
        </div>
    )
}