import { ReactNode, useState } from 'react'
import Head from 'next/head'
import { BsStack, BsBox, BsCircle, BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { useEffectOnce } from 'usehooks-ts'


import FooterLayout from './FooterLayout'
// import { isDevEnvironment } from '@/scripts/helpers/devHelper'
// ReactFunctionComponent
export const SidebarExpandableItem = ({
    itemGroupObj,
}) => {
    const [isOpen, __set_isOpen] = useState(false);



    return (


    <>
        <div className="flex-center py-4 clickble opaci-ahov--50" onClick={()=>{__set_isOpen(!isOpen)}}>
            <div className="pl-6 pr-3 tx-center tx-lg">
                {itemGroupObj.icon}
            </div>
            <div className="flex-1 ">
                {itemGroupObj.title}
            </div>
            <div className="w-min-80px tx-center opaci-bhov--50  tx-mdl">
                {!isOpen ? BsChevronDown({}) : BsChevronUp({})}
            </div>
        </div>
        {isOpen && itemGroupObj.linkList.map((x,index)=>(
            <div key={index} className="flex-center bg-w-opaci-hov-33 clickble py-3  border-r-8">
                <SidebarLinkItem x={x} />
            </div>
        ))}
    </>


    )
}
export const SidebarLinkItem = ({
    x,
}) => {
    const [containerWidth, __set_containerWidth] = useState("400px");



    return (


    <>
        <div className="w-min-50px tx-lgx">
        </div>
        <div className="flex-1 ">
            {x}
        </div>
        <div className=" px-2 py-1 bg-w-opaci-33 mr-3 border-r-25 tx-sm ">
            19
        </div>
    </>


    )
}



export interface ComponentProps {
}
// ReactFunctionComponent
export const SidebarLayout = ({
}: ComponentProps) => {

    /****** CREATE ******/
    useEffectOnce(() => {
        // __set_theValue(reference)
    })

    const [containerWidth, __set_containerWidth] = useState("400px");
    const sidebarObj = {
        manufacturers: {
            title: "Dealers",
            icon: <BsStack />,
            linkList: ["Jason's Inc.","Central Dealer","Miami Trailers", "Toy Shop Inc.", "Spokane LLC."],
        },
        hubs: {
            title: "Hubs",
            icon: <BsBox />,
            linkList: ["Hub 1", "Super Hub", "Denver Hub", "Denver Hub 2", "Spokane LLC."],
        },
        status: {
            title: "Sales Status",
            icon: <BsCircle />,
            linkList: ["Hub 1", "Super Hub", "Denver Hub", "Spokane LLC."],
        },
    }



    return (


    <div style={{width:containerWidth}} className="ims-bg-primary tx-white pos-rel">

        <div className="">
            <div className="py-4 tx-lgx tx-center tx-bold-6">
                INVENTORY
            </div>
            {Object.keys(sidebarObj).map((k,index)=>(
                <div className="" key={index}>
                    <SidebarExpandableItem itemGroupObj={sidebarObj[k]} />
                </div>
            ))}
        </div>
        <div className="h-100   pos-abs right-0 top-0  px-2  opaci-ahov-50 opaci-50  grabble" style={{transform:"translateX(50%)"}}>
            <div className="h-100 bg-white   box-shadow-5 pl-1 box-shadow-5 opaci-bhov-50 ">

            </div>
        </div>
    </div>


    )
}

export default SidebarLayout
