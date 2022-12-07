import { ChangeEvent, useEffect, useState, useMemo, useRef } from 'react'
import { useToggle, useOnClickOutside, useMap, useMediaQuery, useInterval, useEventListener } from 'usehooks-ts'
import { BsThreeDots, BsTrash, BsPlus, BsDot, BsChevronLeft, BsChevronRight } from 'react-icons/bs'


import { API_FILE_UPLOAD } from '@/scripts/api/constants'
import { lerp } from '@/scripts/helpers/mathHelper'
import { StandardDropdown } from '@/components/molecules/StandardDropdown'
import { StandardModal } from '@/components/molecules/StandardModal'
import SliderCss from '@/styles/modules/Slider.module.css'
export interface OutputInputGalleryProps {
    label?: string;
    display?: string;
    value?: string;
    filelist?: any;
    editMode?: boolean;
    updateNewData?: any;
    max?: number;
}
// ReactFunctionComponent
export const OutputInputGallery = ({
    updateNewData,
    label,
    display,
    value,
    filelist,
    editMode,
    max,
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
        // Array.from(Array(max).keys()).map(i => ({label:`${i+1}`,id:`${i+1}`}))
        // filelist.map((item,index) => {

        // })
    },[filelist,max])

    //-/* REF */-//
    const smallDevice = useMediaQuery('(max-width: 1200px)')
    const [GW, __set_galleryWidth] = useState<number>(smallDevice ? 320 : 600)
    const _isTouch = window.ontouchstart !== undefined;

    const [count, setCount] = useState<number>(0)
    const [delay, setDelay] = useState<number>(10)
    const [isPlaying, setPlaying] = useState<boolean>(true)
    const minDifference = 50
    const lerpSpeed = 50

    const $theInput = useRef<HTMLInputElement>()
    const $galleryContainer = useRef()
    const $controlPagination = useRef()
    const $controlRight = useRef()
    const $controLeft = useRef()
    const $touchPad = useRef<any>()
    const $galleryInner = useRef()
    const [isClicking, __set_isClicking] = useState(false)

    // const [fakeFileList, __set_fakeFileList] = useState([]);

    //-/* STATE */-//
    const [firstTouch, __set_firstTouch] = useState(0);
    const [pageOffset, __set_pageOffset] = useState(0);
    const [swipeOffset, __set_swipeOffset] = useState(0);
    const [liveOffset, __set_liveOffset] = useState(0);
    // const [targetOffset, __set_targetOffset] = useState(0);
    const [isOpen, __toggle_isOpen, __set_isOpen] = useToggle(false);
    const [firstFile, __set_firstFile] = useState<{name:string,type:string}>()
    const [galleryModal, __toggle_galleryModal, __set_galleryModal] = useToggle(false);
    const $domObject = useRef(null)

    //-/* MEMO */-//
    const foundExt = useMemo(() => firstFile?.type ? (firstFile.type.replace(/(.*)\//g, '')) : "", [firstFile])
    const foundExtInFilename = useMemo(() => firstFile?.name ? (firstFile.name.match(/\.[0-9a-z]+$/i)[0]) : "", [firstFile])
    const foundFilename = useMemo(() => firstFile?.name, [firstFile])

    //-/* LISTENERS */-//
    useOnClickOutside($domObject, () => { __set_isOpen(false) })
    const handleChange = () => {
        // console.log($theInput.current.files)
        const firstFile = $theInput.current.files[0]
        __set_firstFile(firstFile)
        const payload = new FormData();
        payload.append('user-file', firstFile, 'file.ext');

        if (firstFile.type == "") return alert("corrupt file, no type found")

        if (prompt(`upload ${firstFile.name}? type "y" to confirm...`) == "y")
        {
            const req = new XMLHttpRequest();
            req.open('POST', API_FILE_UPLOAD);

            req.upload.addEventListener('progress', function(e) {
                const percentComplete = (e.loaded / e.total)*100;
                console.log("percentComplete")
                console.log(percentComplete)
                // progress.setAttribute('value', percentComplete);
                // progress.nextElementSibling.nextElementSibling.innerText = Math.round(percentComplete)+"%";
            })

            req.addEventListener('load', function() {
                console.log(req.status);
                console.log(req.response);
            })

            console.log("POSITNGGGGGGG")
            req.send(payload);

        }
    }
    // useEventListener('scroll', $galleryContainer)
    // useEventListener('drag', $galleryInner)
    // const onTouchStart = (e) => {
    //     console.log("onTouchStart", e)
    // }
    // const onTouchMove = (e) => {
    //     console.log("onTouchMove", e)
    // }
    const filteredFileList = useMemo(() => {
        return fakeFileList
    }, [fakeFileList])

    const targetOffset = useMemo(() => {
        // console.log($galleryContainer)
        return pageOffset + swipeOffset
    //     console.log("asd")
    //     __set_liveOffset(lerp(liveOffset,pageOffset + swipeOffset,1))
    }, [pageOffset,swipeOffset])
    const currentPage = useMemo(() => {
        return parseInt((-targetOffset/GW).toString())
    }, [targetOffset])
    // useEffect(() => {
    //     if (liveOffset == targetOffset) return
    //     // if (Math.abs(liveOffset - targetOffset) == 1) return
    //     let theDifference = Math.abs(liveOffset - targetOffset)
    //     if (theDifference < 10) return __set_liveOffset(targetOffset)
    //     if (theDifference > 1200) return __set_liveOffset(targetOffset)
    //     // console.log("onDrag lerping", liveOffset, targetOffset)
    //     if (liveOffset < targetOffset ) return __set_liveOffset(liveOffset+ lerpSpeed)
    //     if (liveOffset > targetOffset ) return __set_liveOffset(liveOffset- lerpSpeed)
    //         // console.log("lerping", liveOffset, targetOffset, lerp(liveOffset, targetOffset, 0.1))
    //     // __set_liveOffset(parseInt(liveOffset + targetOffset / 2))
    //     // __set_liveOffset(parseInt(liveOffset + targetOffset / 2))
    //     // __set_liveOffset(lerp(liveOffset, targetOffset, 0.1))
    //     // __set_liveOffset()
    //     // return lerp(liveOffset, targetOffset, 1)

    // //     console.log("asd")
    // //     __set_liveOffset(lerp(liveOffset,pageOffset + swipeOffset,1))
    // }, [targetOffset, liveOffset])
    const onDrag = (e) => {
        if (isClicking)
        {
            __set_swipeOffset(parseInt(((e.offsetX-firstTouch) * 1.68).toString()))
        }
    }
    const onStartClick = (e) => {
        __set_isClicking(true)
        __set_firstTouch(e.offsetX)
        // console.log("onClick", e)
    }
    const isAtFirstImage = useMemo(() => {
        return pageOffset >= 0
    }, [pageOffset])
    const isAtLastImage = useMemo(() => {
        return pageOffset <= -GW*(filteredFileList.length-1)
    }, [filteredFileList,pageOffset])
    const setNextPage = () => {
        
        if (pageOffset > -GW*(filteredFileList.length-1))
        {
            // console.log("next page",pageOffset)
            __set_pageOffset(pageOffset-GW)
        }
    }
    const setPrevPage = () => {
        if (pageOffset < 0)
        {
            // console.log("next page",pageOffset)
            __set_pageOffset(pageOffset+GW)
        }

    }
    const onEndClick = (e) => {
        __set_isClicking(false)
        __set_swipeOffset(0)
        if (filteredFileList.length < 2) return
        if (swipeOffset < -200 )
        {
            setNextPage()
        }
        if (swipeOffset > 200 )
        {
            setPrevPage()
        }
        // console.log("onEndClick", e)
    }
    useInterval(
        () => {
          // Your custom logic here
            setCount(count + 1)
            if (liveOffset == targetOffset) return
            // if (Math.abs(liveOffset - targetOffset) == 1) return
            let theDifference = Math.abs(liveOffset - targetOffset)
            if (theDifference < minDifference) return __set_liveOffset(targetOffset)
            if (theDifference > 1200) return __set_liveOffset(targetOffset)
            // console.log("onDrag lerping", liveOffset, targetOffset)
            if (liveOffset < targetOffset ) return __set_liveOffset(liveOffset+ lerpSpeed)
            if (liveOffset > targetOffset ) return __set_liveOffset(liveOffset- lerpSpeed)

        },
        // Delay in milliseconds or null to stop it
        isPlaying ? delay : null,
      )

    // useEventListener('touchstart', onTouchStart, $galleryContainer)
    // useEventListener('touchmove', onTouchMove, $galleryContainer)

    useEventListener(_isTouch ? "touchmove" : "mousemove", onDrag, $touchPad)
    useEventListener(_isTouch ? "touchstart" : "mousedown", onStartClick, $touchPad)
    useEventListener(_isTouch ? "touchend" : "mouseup", onEndClick, $touchPad)
    useEventListener("mouseleave", (e)=>{
        if (isClicking && $touchPad.current)
        {
            // $touchPad.current.click()
            // $touchPad.current.click()
            // console.log("$touchPad.current",$touchPad.current)
        }

        onEndClick(e)
    }, $touchPad)
    // useEventListener("click", onClick, $galleryContainer)

    useOnClickOutside($touchPad, () => { __set_swipeOffset(0) })


    const numberarray:any = Array.from(Array(2).keys()).map(i => ({label:`${i+1}`,id:`${i+1}`}))
    const [loadedImages, loadedImages_actions] = useMap<string, any>(new Map())

    // COMPONENT PARTS
    //1: FILE DETAILS
    //2: FILE INPUT

    return (
        <div className="flex-col border-r-8  ims-faded w-100 pos-rel" >

            {/* //1: THUMBNAIL */}
            <div className={'  border-r-8  '} style={{width:GW+"px",minHeight:GW/1.5+"px", overflow:"hidden"}} ref={$galleryContainer}>
                {/*-a-a*/}
                <div className={`${SliderCss["touch-pad"]} grab w-100 border-r-10 h-100 noselect pos-abs`}  ref={$touchPad}>
                    {/*-*/}
                </div>
                <div className="none top-0 right-0 pos-abs" style={{}} >
                    off:{swipeOffset}
                </div>
                <div className={'flex  noclick'} style={{minHeight:GW/1.5+"px",}} ref={$galleryInner}>
                    {/*l:{filteredFileList.length}*/}
                    {filteredFileList.map((item,index) => {
                        return <div  key={index} style={{minWidth:GW+"px",transform:`translateX(${liveOffset}px)`}} className="flex-center " >
                            {!loadedImages.has(index) && <div className="bg-white ims-border-faded pos-abs w-100 h-100 flex-center opaci-50 tx-ls-5" style={{width:GW+"px",}}>
                                <span className="hover-2">
                                    loading...
                                </span>
                            </div>}
                            {true && <div style={{width:GW+"px",minWidth:GW+"px",}}>
                                <img alt="imgsliderthumbnail" onLoad={() => loadedImages_actions.set(index,true)} 
                                    src={item} className={'noclick'} 
                                />
                            </div>}
                        </div>
                    })}
                </div>
            </div>
            {/*<img alt="imgsliderthumbnail" src={filelist[0] } className={'w-100 w-max-600px'} />*/}
            <div className="pos-abs  top-0 right-0" >
                {!isClicking && <div className={` border-r-100p clickble   tx-lg ${SliderCss["dots-button"]} pa-5`}
                    onClick={()=>(isOpen ? __toggle_isOpen() : __set_isOpen(true))}
                >
                    <span className={`pa-2 pb-1 ${SliderCss["dots-dots"]}`}><BsThreeDots /></span>
                </div>}
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
                                 onClick={()=>{
                                     __set_pageOffset(-GW*index)
                                 }}
                            
                            >
                                {/*<BsDot />*/}
                                <div className={`border-r-100p ${SliderCss["nav-dot"]}`} style={{width:"10px",height:"10px",background:currentPage == index ? "#101828" : "#2C334B"}}>
                                </div>
                            </div>
                    </div>
                })}
            </div>

            {!isClicking && <div className={`   flex-center left-0 pos-abs clickble ${SliderCss["emphasis"]}`} ref={$controLeft} >
                <div className={`${SliderCss["emphasis-card"]} border-r-100p clickble bg-white  tx-mdl   pa-3 pb-2 mr-4 ma-2 ${isAtFirstImage && " none stopcursor opaci-25 "}`}
                     onClick={()=>{
                         setPrevPage()
                        
                     }}
                
                >
                    <div className="noclick"><BsChevronLeft /></div>
                </div>
            </div>}
            {!isClicking && <div className={`   flex-center right-0 pos-abs clickble ${SliderCss["emphasis"]}`} ref={$controlRight} >
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

                    {/* //1: FILE DETAILS */}
                    <span className="flex-col py-2">File: <small>{foundFilename}</small></span>
                    <div className="flex gap-1 pa-1">
                        <span>File Type: <b>{foundExtInFilename}</b></span>
                        <i className="opaci-25">|</i>
                        <span>File Ext.: <b>{foundExtInFilename}</b></span>
                    </div>

                    {/* //2: FILE INPUT */}
                    <input type="file" onChange={handleChange} ref={$theInput} hidden
                        className="py-2 px-4 w-100 ims-tx-dark ims-border-faded border-r-5 tx-mdl"
                    />
                    <div className="px-4 py-2 opaci-hov--50  tx-md ims-primary tx-white border-r-8 clickble" onClick={() => $theInput.current.click()}>
                        Upload File
                    </div>

                </StandardModal>
            }

        </div>
    )
}