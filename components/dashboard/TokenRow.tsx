import { DEFAULT_TIMEFRAME_ARRAY, DEFAULT_TOKENS_ARRAY } from "../../scripts/constants"
import { parseDecimals } from "../../scripts/helpers"
import { TokenConfigStateButtons } from "../chart/tokenConfig"

export default function Component({
    tokensArrayObj, aToken, cryptoToken, index, queryUSDT, isK, aTokenCristayl, isQ,
    buy_all, buy_min, sell_min, sell_all, crystal, timeframe, uid, updateTokenOrder,
    removeToken, joinToken    
}) {
    return (
        <div className="      flex-col w-100 " >
            <div className="w-100">
                <div className="flex  opaci-75 ">
                    {!!tokensArrayObj[aToken] && (
                        <div className="flex-center  flex-justify-between w-100">
                            <div className="tx-lgx flex flex-align-start  " >
                                <a className={`opaci-chov--50 tx-white ${aToken == cryptoToken?"":"nodeco"} `}
                                    href={`/chart/${timeframe}?token=${aToken}`}>
                                    <span className="px-1">{aToken.toUpperCase()}:</span>
                                    <span className="tx-ls-2">{isK && parseDecimals(queryUSDT.data[index].price)}</span>
                                </a>
                            </div>
                            {!aTokenCristayl.state && <div className="opaci-25">Inactive</div>}
                            
                            {!isQ || !aTokenCristayl.state
                                ? (<div className="opaci-25 tx-xs ">
                                        offline
                                    </div>
                                )
                                : (
                                    <div className="opaci-75 ">
                                        
                                        {crystal == 2 && <>
                                            <div className="bg-w-50 opaci-chov--50 tx-black bord-r-8 pa-1"
                                                onClick={()=>{
                                                    buy_all()                                                                                        
                                                }}
                                            >
                                                buy all
                                            </div>
                                        </>}
                                        {crystal == 1 && <>
                                            <div className="bg-w-50 opaci-chov--50 tx-black bord-r-8 pa-1"
                                                onClick={()=>{
                                                    buy_min()                                                                                        
                                                }}
                                            >
                                                buy min
                                            </div>
                                        </>}
                                        {crystal == -1 && <>
                                            <div className="bg-w-50 opaci-chov--50 tx-black bord-r-8 pa-1"
                                                onClick={()=>{
                                                    sell_min()                                                                                        
                                                }}
                                            >
                                                sell min
                                            </div>
                                        </>}
                                        {crystal == -2 && <>
                                            <div className="bg-w-50 opaci-chov--50 tx-black bord-r-8 pa-1"
                                                onClick={()=>{
                                                    sell_all()                                                                                        
                                                }}
                                            >
                                                sell all
                                            </div>
                                        </>}
                                        {crystal == 0 && <>
                                            <div>
                                                {aTokenCristayl.buy == 0 && <div>wait to buy</div>}
                                                {aTokenCristayl.buy == 1 && <div>wait to sell</div>}
                                            </div>
                                        </>}
                                    </div>
                                )
                            }
                        </div>
                    )}
                </div>
            </div>
            
            {aToken == cryptoToken &&
                <div className="flex-center w-100">
                    
                    {!(cryptoToken in tokensArrayObj) && !!uid &&
                        <div className="flex-1 w-100  ">

                        </div>
                    }
                    <div className="w-100 mt-1">
                        
                        {tokensArrayObj &&  tokensArrayObj[cryptoToken] && tokensArrayObj[cryptoToken][0] &&
                            <details className="">
                                <summary className="pa-2  clickable opaci-chov--50 bg-w-10 bord-r-8">. . .</summary>
                                <div>
                                    
                                    <TokenConfigStateButtons 
                                        timeframe={timeframe}
                                        index={DEFAULT_TOKENS_ARRAY.indexOf(cryptoToken)}
                                        tokensArrayObj={tokensArrayObj}
                                        queryUSDT={queryUSDT}
                                        aToken={cryptoToken}
                                        theToken={tokensArrayObj[cryptoToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)]}
                                        updateTokenOrder={updateTokenOrder}
                                    />
                                    {(cryptoToken in tokensArrayObj) && 
                                        <div className="tx-bold flex-center  mt-1  " >
                                            <button className="clickble tx-ls-5  opaci-50 opaci-chov-50 duno-btn hov-bord-1-w py-2 px-3 bord-r-50 tx-lg"
                                                onClick={()=>{removeToken(cryptoToken)}}
                                                style={{boxShadow:"0px 0px 25px #CF589433"}}
                                            >
                                                LEAVE
                                            </button>
                                        </div>
                                    }
                                    {!(cryptoToken in tokensArrayObj) && !!uid &&
                                        <div className={`tx-bold flex-center mt-1  invert ${!uid && "opaci-50"}`}
                                        >
                                            <button className="clickble tx-ls-5 opaci-50 opaci-chov-50 duno-btn hov-bord-1-w py-2 px-4 bord-r-50 tx-lg"
                                                onClick={()=>{!!uid && joinToken(cryptoToken)}} 
                                                style={{boxShadow:"0px 0px 25px #CF589433"}}
                                            >
                                                JOIN
                                            </button>
                                        </div>
                                    }
                                </div>
                            </details>
                        }

                    </div>
                </div>
            }
        </div>
    )
}