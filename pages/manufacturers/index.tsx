import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { BsArrowReturnLeft } from 'react-icons/bs'


// import { isDevEnvironment } from '@/scripts/helpers/devHelper';
import { API_UNITS } from '@/scripts/api/constants';
import { fetchJsonArray } from '@/scripts/helpers/fetchHelper';
import { sortUIDDesc } from '@/scripts/helpers/parseHelper';
import { BreadCrumbs } from '@/components/atoms/BreadCrumbs'
import { StandardTable } from '@/components/molecules/StandardTable'
// ReactFunctionPageComponent
export default function InventoryPage({
    unitList,
}) {
    const manufacturersDisplayObj = {
        key:{title:"UID",name:"uid"},
        rest:{
            status:{title:"Status",fieldName:"status",widget:"badge"},
            location:{title:"Location",fieldName:"location"},
            dealer:{title:"Dealer",fieldName:"dealer"},
        },
    }
    const [selectedId,s__selectedId] = useState(-1)


    return (<>


    <Head> <title>Manufacturers | SMP</title> </Head>
    <div className="ims-body">
        <main className="ims-body-inner">
            <BreadCrumbs pages={[["/units","Manufacturers"]]} current={`Browse`}/>
            <h1 className="pt-6 "> Title TBD </h1>
            <hr className="my-2"/>

            {/*<FilterContainer />*/}

            {(!unitList || (!!unitList && !unitList.length)) && <div>

                <span className="opaci-50 tx-lg">
                    No Units Found
                </span>
                <div key={0} className="bloc pos-rel flex  flex-justify-start flex-align-center">
                    <Link href={`/unit/5916-9759?test`}>
                        <div onClick={() => s__selectedId(0)}
                                className="clickble opaci-hov--50 flex flex-center py-3 px-4 ims-border-faded border-r-8"
                        >
                            <span className="tx-red">
                                Unit #5916-9759 (Trailer) {`<test>`}
                            </span>


                            <div className={"pos-rel appear-hiding-2 "+(selectedId == 0 ? "appear-appear" : "")}>
                                <div className="flex-col flex-align-center flex-justify-center pos-abs right-0"
                                    style={{transform:"translate(180%,-35%)"}}
                                >
                                    <div className="flex-center opaci-30 tx-xs tx-ls-1 hover-2">Loading</div>
                                    <div className="py-3 flex-center opaci-30 tx-lg shake-2"><BsArrowReturnLeft /></div>
                                </div>
                            </div>

                        </div>
                    </Link>
                </div>
            </div>}
            <div className="mt-4  noverflow">
                {!!unitList &&
                    <StandardTable
                        displayConfigObj={manufacturersDisplayObj}
                        {...{s__selectedId,selectedId}} theArray={unitList.sort(sortUIDDesc)}
                    />
                }
                
                <div className="bloc ims-bg-faded pos-rel flex  ims-border-faded flex-justify-start flex-align-center "
                    style={{borderRadius:"0 0 8px 8px"}}
                >
                {/*<div className="w-100">*/}
                    <div className="px-4 py-3 flex-center clickble opaci-hov-50">
                        Previous
                    </div>
                    <div 
                        className={`flex-1 flex-center opaci-50 py-3 px-4 `}
                    >
                        Page 1 of 10
                    </div>
                    <div className="px-4 py-3 flex-center clickble opaci-hov-50">
                        Next
                    </div>
                </div>
            </div>
        </main>
    </div>


    </>)
}
const DEFAULT_RESPONSE = {
    unitList: [],
}
async function fetchPageData(params,query) {
    try {
        let unitList = await fetchJsonArray(API_UNITS)

        return {
            unitList: unitList.Units || [],
        }
    } catch (err) {
        return DEFAULT_RESPONSE
    }
}
export async function getServerSideProps({ params, query }) {
    let online = true
    let fetchResults = DEFAULT_RESPONSE
    if (online) { fetchResults = await fetchPageData(params,query) }

    return { props: fetchResults }
}