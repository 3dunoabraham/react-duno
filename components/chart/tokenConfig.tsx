import { useMemo } from "react"
import { DEFAULT_TIMEFRAME_ARRAY } from "../../scripts/constants"
import { getStrategyResult } from "../../scripts/helpers"

export const TokenConfigStateButtons = ({
    timeframe,
    index,
    tokensArray,
    queryUSDT,
    aToken,
    theToken,
    updateTokenOrder,
}:{
    timeframe:any,
    index:any,
    tokensArray:any,
    queryUSDT:any,
    aToken:any,
    theToken:any,
    updateTokenOrder:any,
})=>{
    // if(queryUSDT.loading) return
    // if(queryUSDT.error) return
    // if(!queryUSDT.data) return
    // if(!queryUSDT.data[index]) return

    let theStrategyResult = useMemo(()=>{ return (
        queryUSDT.data && queryUSDT.data[index] &&
            (aToken in tokensArray)
                ? (getStrategyResult(theToken,parseFloat(queryUSDT.data[index].price)))
                : 0
    )},[queryUSDT,])

    return (
    <div className="flex-col  w-100 ">
        <div className="flex-center w-100 ">
            <div onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"state")}}
                className="opaci-chov--50 bg-w-opaci-90  tx-black px-3 py-1 bord-r-15 mx-1 mt-1"
            >
                State: {theToken.state}
            </div>
            {/* |{theStrategyResult}| */}
            {theToken && queryUSDT.data &&
                <div className="flex-center px-4">
                    {theStrategyResult == 0 && <div>Wait</div>}
                    {theStrategyResult == 1 && <div>Buy <br/> 1st <br/> Half</div>}
                    {theStrategyResult == 2 && <div>Buy <br/> 2nd <br/> Half</div>}
                    {/* <div className="px-2 py-1 bg-white bord-r-5 tx-green opaci-chov--50">Do Trade</div>
                    <div className="px-2 py-1 bg-white bord-r-5 tx-red">Don't <br /> Trade</div> */}
                </div>
            }
        </div>
        <div className="flex-center w-100">
            <div onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"floor")}}
                className="opaci-chov--50 bg-w-opaci-20  px-3 py-1 bord-r-15 mx-1 mt-1 tx-center"
            >
                Min
                <br/>
                {theToken.floor}
            </div>
            <div onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"ceil")}}
                className="opaci-chov--50 bg-w-opaci-20  px-3 py-1 bord-r-15 mx-1 mt-1 tx-center"
            >
                Max
                <br/>
                {theToken.ceil}
            </div>
            <div onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"buy")}}
                className="opaci-chov--50 bg-w-opaci-50  px-3 py-1 bord-r-15 mx-1 mt-1 tx-center"
            >
                Buy
                <br/>
                {theToken.buy
            }</div>
            <div onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"sell")}}
                className="opaci-chov--50 bg-w-opaci-20  px-3 py-1 bord-r-15 mx-1 mt-1 tx-center"
            >
                Sell
                <br/>
                {theToken.sell
            }</div>
        </div>
    </div>
    )
}