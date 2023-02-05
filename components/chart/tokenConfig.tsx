import { useMemo } from "react"
import { DEFAULT_TIMEFRAME_ARRAY } from "../../scripts/constants"
import { getStrategyResult, parseDecimals } from "../../scripts/helpers"

export const TokenConfigStateButtons = ({
    timeframe,
    index,
    tokensArrayObj,
    queryUSDT,
    aToken,
    theToken,
    updateTokenOrder,
}:{
    timeframe:any,
    index:any,
    tokensArrayObj:any,
    queryUSDT:any,
    aToken:any,
    theToken:any,
    updateTokenOrder:any,
})=>{
    // if(queryUSDT.loading) return
    // if(queryUSDT.error) return
    // if(!queryUSDT.data) return
    // if(!queryUSDT.data[index]) return

    let theStrategyResult = useMemo(()=>{
        // console.log("tokenConfig",theToken)
        
        let minMaxAvg = parseFloat(`${parseDecimals((parseFloat(theToken.ceil)+parseFloat(theToken.floor))/2)}`)
        let minMedian = (parseFloat(theToken.floor)+parseFloat(`${minMaxAvg}`))/2
        let maxMedian = (parseFloat(theToken.ceil)+parseFloat(`${minMaxAvg}`))/2
        let stats = {
            minMaxAvg,minMedian,maxMedian
        }
        // console.log(stats)
        return (
        queryUSDT.data && queryUSDT.data[index] &&
            (aToken in tokensArrayObj)
                ? (getStrategyResult(theToken,parseFloat(queryUSDT.data[index].price)))
                : 0
    )},[queryUSDT,])

    return (
    <div className="flex-col  w-100 ">
        <div className="flex-center w-100 ">
            {/* <div onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"state")}}
                className="opaci-chov--50 bg-w-90  tx-black px-3 py-1 bord-r-15 mx-1 mt-1"
            >
                State: {theToken && theToken.state}
            </div> */}
            {!theToken.state &&
                <button onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"state", "1")}}
                    className="opaci-chov--50 bg-w-90 tx-green  tx-bold-8 tx-ls-1 tx-black px-3 py-1 bord-r-15 mx-1 mt-1"
                >
                    ON
                </button>
            }
            {!!theToken.state &&
                <button onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"state", "0")}}
                    className="opaci-chov--50 bg-w-90 tx-red-50  tx-black px-3 py-1 bord-r-15 mx-1 mt-1"
                >
                    OFF
                </button>
            }
            {/* |{theStrategyResult}| */}
            {theToken && queryUSDT.data &&
                <div className="flex-center px-4">
                    {theStrategyResult == 0 && <div>Wait</div>}
                    {theStrategyResult == 1 && <div>Buy <br/> 1st Half</div>}
                    {theStrategyResult == 2 && <div>Buy <br/> 2nd Half</div>}
                    {/* <div className="px-2 py-1 bg-white bord-r-5 tx-green opaci-chov--50">Do Trade</div>
                    <div className="px-2 py-1 bg-white bord-r-5 tx-red">Don't <br /> Trade</div> */}
                </div>
            }
        </div>
        <div className="flex-col w-100">
            <div className="flex-center w-100">
                <div onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"floor")}}
                    className="opaci-chov--50 bg-w-20  px-3 py-1 bord-r-15 mx-1 mt-1 tx-center"
                >
                    Min
                    <br/>
                    {theToken && theToken.floor}
                </div>
                <div onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"floor", theToken.floor*.99)}}
                    className="opaci-chov--50 bg-w-20 tx-lgx px-3 py-1 bord-r-15 mx-1 mt-1 tx-center"
                >
                    -
                </div>
                <div onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"floor", theToken.floor*1.01)}}
                    className="opaci-chov--50 bg-w-20 tx-lgx px-3 py-1 bord-r-15 mx-1 mt-1 tx-center"
                >
                    +
                </div>
            </div>
            <div className="flex-center w-100">
                <div onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"ceil")}}
                    className="opaci-chov--50 bg-w-20  px-3 py-1 bord-r-15 mx-1 mt-1 tx-center"
                >
                    Max
                    <br/>
                    {theToken && theToken.ceil}
                </div>
                <div onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"ceil", theToken.ceil*.99)}}
                    className="opaci-chov--50 bg-w-20 tx-lgx px-3 py-1 bord-r-15 mx-1 mt-1 tx-center"
                >
                    -
                </div>
                <div onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"ceil", theToken.ceil*1.01)}}
                    className="opaci-chov--50 bg-w-20 tx-lgx px-3 py-1 bord-r-15 mx-1 mt-1 tx-center"
                >
                    +
                </div>
            </div>
            <div onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"buy")}}
                className="opaci-chov--50 bg-w-50  px-3 py-1 bord-r-15 mx-1 mt-1 tx-center"
            >
                Balance
                <br/>
                {theToken &&
                    <div>
                        {theToken.buy == 2 && <div>Full In</div>}
                        {theToken.buy == 1 && <div>Half In</div>}
                        {theToken.buy == 0 && <div>Empty</div>}
                    </div>
                }
            </div>
        </div>
    </div>
    )
}