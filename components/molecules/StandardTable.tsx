import { ReactNode } from 'react'
import { BsArrowReturnLeft } from 'react-icons/bs'


// ReactFunctionComponent
export const StandardTable = ({
    theArray, s__selectedId, selectedId, displayConfigObj
}) => {
    return(<>


    <div className="bloc ims-bg-faded pos-rel flex  ims-border-faded flex-justify-start flex-align-center "
        style={{borderRadius:"8px 8px 0 0"}}
    >
    {/*<div className="w-100">*/}
        <div 
            className={`flex-1  py-3 px-4 `}
        >
            <div className="flex-1 ">
                {displayConfigObj.key.title}
            </div>
        </div>
        {/*<div className="px-4 flex-center clickble opaci-hov-50">
        </div>*/}
        <div className="w-50 flex-center flex-justify-start">
            {Object.keys(displayConfigObj.rest).map((aKey, index)=>{
                return (
                    <div className="opaci-50   flex-1" key={index}>
                        {displayConfigObj.rest[aKey].title}
                    </div>
                )
            })}
        </div>
    </div>
    {theArray.map((item,index) => {
        return<div key={index} className="bloc pos-rel flex  flex-justify-start flex-align-center  ">
            {/*<Link href={`/unit/${item.uid}`}>*/}
            <a href={`/unit/${item.uid}`} className="w-100 pos-rel ">
                <div onClick={() => s__selectedId(index)}
                        className={`clickble opaci-hov--50 flex py-3  ims-border-faded pos-rel`}
                >
                    <div className="flex-1 px-4">
                        {item.uid == "5916-9759" ? "*" : ""}
                        #{item.uid}
                    </div>
                    <div className="w-50 flex">
                        {Object.keys(displayConfigObj.rest).map((aKey, index)=>{
                            const theWidget = displayConfigObj.rest[aKey].widget
                            if (!theWidget)
                            {
                                return (
                                    <div key={index} className="w-100 flex-center flex-1  flex-justify-start">
                                        {item[displayConfigObj.rest[aKey].fieldName]}
                                    </div>
                                )
                            }

                            if (theWidget == "badge")
                            {
                                return (
                                    <div key={index} className="w-100 flex-center flex-1  flex-justify-start">
                                        {item[displayConfigObj.rest[aKey].fieldName] != "3"
                                            ?   <div className="flex-1 ">
                                                    <span className="ims-badge-primary-light pa-1 tx-sm ">Available</span>
                                                </div>
                                            : <div className=" flex-1"></div>
                                        }
                                    </div>
                                )
                            }
                        })}
                    </div>


                    <div className={"pos-rel appear-hiding-2 "+(selectedId == index ? "appear-appear" : "")}>
                        <div className="flex-col flex-align-center flex-justify-center pos-abs right-0 tx-green"
                            style={{transform:"translate(-50%,-15%)"}}
                        >
                            <div className="flex-center opaci-50  tx-xs tx-ls-1 hover-2">Loading</div>
                            <div className="py-2 flex-center opaci-30 tx-lg shake-2"><BsArrowReturnLeft /></div>
                        </div>
                    </div>
                </div>
            </a>
            {/*</Link>*/}
        </div>
    })}


    </>)
}