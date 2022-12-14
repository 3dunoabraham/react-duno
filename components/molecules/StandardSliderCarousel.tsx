import { ChangeEvent, useEffect, useState, useMemo, useRef } from 'react'
import { useToggle, useOnClickOutside, useMap, useMediaQuery, useInterval, useEventListener } from 'usehooks-ts'


import SliderCss from '@/styles/modules/Slider.module.css'
export const StandardSliderCarousel = ({
    GW, filteredFileList, loadedImages, loadedImages_actions,
    isClicking, __set_isClicking,
    pageOffset, __set_pageOffset
})=>
{
    const [swipeOffset, __set_swipeOffset] = useState(0);
    const _isTouch = window.ontouchstart !== undefined;
    const $touchPad = useRef<any>()
    const [firstTouch, __set_firstTouch] = useState(0);
    const [liveOffset, __set_liveOffset] = useState(0);
    const [count, setCount] = useState<number>(0)
    const [isPlaying, setPlaying] = useState<boolean>(true)
    const [delay, setDelay] = useState<number>(10)
    const minDifference = 50
    const lerpSpeed = 50

    const targetOffset = useMemo(() => {
        return pageOffset + swipeOffset
    }, [pageOffset,swipeOffset])

    useInterval(
        () => {
            setCount(count + 1)
            if (liveOffset == targetOffset) return
            let theDifference = Math.abs(liveOffset - targetOffset)
            if (theDifference < minDifference) return __set_liveOffset(targetOffset)
            if (theDifference > 1200) return __set_liveOffset(targetOffset)
            if (liveOffset < targetOffset ) return __set_liveOffset(liveOffset+ lerpSpeed)
            if (liveOffset > targetOffset ) return __set_liveOffset(liveOffset- lerpSpeed)

        },
        isPlaying ? delay : null,
      )
    const onDrag = (e) => {
        if (isClicking)
        {
            __set_swipeOffset(parseInt(((e.offsetX-firstTouch) * 1.68).toString()))
        }
    }

    const onStartClick = (e) => {__set_isClicking(true); __set_firstTouch(e.offsetX) }
    const setNextPage = () => {if (pageOffset > -GW*(filteredFileList.length-1)) {__set_pageOffset(pageOffset-GW) } }
    const setPrevPage = () => {if (pageOffset < 0) {__set_pageOffset(pageOffset+GW) } }
    const onEndClick = (e) => {
        __set_isClicking(false)
        __set_swipeOffset(0)
        if (filteredFileList.length < 2) return
        if (swipeOffset < -200 ) {setNextPage() }
        if (swipeOffset > 200 ) {setPrevPage() }
    }
    useEventListener(_isTouch ? "touchmove" : "mousemove", onDrag, $touchPad)
    useEventListener(_isTouch ? "touchstart" : "mousedown", onStartClick, $touchPad)
    useEventListener(_isTouch ? "touchend" : "mouseup", onEndClick, $touchPad)
    useEventListener("mouseleave", (e)=>{
        onEndClick(e)
    }, $touchPad)
    useOnClickOutside($touchPad, () => { __set_swipeOffset(0) })


    return (
    <div className={'  border-r-8  '} style={{width:GW+"px",height:GW/1.5+"px", overflow:"hidden"}} >
        <div className={`${SliderCss["touch-pad"]} grab w-100 border-r-10 h-100 noselect pos-abs`}  ref={$touchPad}> </div>
        <div className="none top-0 right-0 pos-abs" style={{}} > off:{swipeOffset} </div>
        <div className={'flex  noclick'} style={{height:GW/1.5+"px",}} >
            {filteredFileList.map((item,index) => {
            return <div  key={index} style={{minWidth:GW+"px",transform:`translateX(${liveOffset}px)`}} className="flex-center " >
                {!loadedImages.has(index) && (
                    <div className="bg-white ims-border-faded pos-abs w-100 h-100 flex-center opaci-50 tx-ls-5" style={{width:GW+"px",}}>
                        <span className="hover-2"> loading... </span>
                    </div>
                )}
                <div style={{width:GW+"px",minWidth:GW+"px",aspectRatio:"cover"}}>
                    <img className="w-100 noclick" alt="imgsliderthumbnail"
                        style={{objectFit:"cover",height:GW/1.5+"px",}}
                        onLoad={() => loadedImages_actions.set(index,true)} 
                        src={item}  
                    />
                </div>
            </div> })}
        </div>
    </div>
    )
}