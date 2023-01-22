import { useState, useEffect, useMemo } from "react";
import { useQuery } from '@tanstack/react-query'
import { fetchJsonArray, fetchMultipleJsonArray, parseDecimals } from "../scripts/helpers";
import { useLocalStorage } from "usehooks-ts";
import { ChartSinLine, ChartHigherLine, ChartLowerLine, ChartMiddleLine, ChartTopBottomLine } from "../components/chart/lines";

function Dashboard({}: {}) {
    /********** CREATE **********/
    useEffect(()=>{
        s__tokensArray(JSON.parse(LS_tokensArray))
        s__uid(LS_uid)
        s__clientIP(LS_uid.split(":")[0])
        getKlineArray()
    },[])



    /********** DATA **********/
    const [LS_tokensArray, s__LS_tokensArray] = useLocalStorage('localTokensArray', "{}")
    const [LS_uid, s__LS_uid] = useLocalStorage('uid', "")
    const [uid, s__uid] = useState("")
    const [chopAmount,s__chopAmount] = useState<any>(0)
    const DEFAULT_TIMEFRAME = "15m"
    const [timeframe,s__timeframe] = useState<any>(DEFAULT_TIMEFRAME)
    const [wavelength,s__wavelength] = useState<any>(-160)
    const [tokensArray,s__tokensArray] = useState<any>({})
    const [klinesArray,s__klinesArray] = useState<any[]>([])
    const [clientIP, s__clientIP] = useState('');
    const DEFAULT_TOKEN_OBJ = { mode:0,state:0,buy:0,sell:0, floor:0,ceil:0}
    const DEFAULT_TIMEFRAME_ARRAY = ["15m","12h","1d","1w"]  
    const parsedKlines = useMemo(()=>{
        let parsedKlinesArray:any = []
        parsedKlinesArray = klinesArray
        return parsedKlinesArray
    },[klinesArray])
    const p__klinesArray = useMemo(()=>{
        return klinesArray.slice(chopAmount,500)
    },[klinesArray,chopAmount])
    const queryUSDT:any = useQuery({
        queryKey: ['usdt'],
        queryFn: async () => online ? await fetchMultipleJsonArray(tokensReqObj) : DEFAULT_TOKEN,        
    })
    const API_PRICE_BASEURL = "https://api.binance.com/api/v3/ticker/price?symbol="
    const API_KLINE_BASEURL = useMemo(()=>{
    return `https://api.binance.com/api/v3/klines?interval=${timeframe}&symbol=`
    },[timeframe])
    const DEFAULT_TOKENS_ARRAY = ["btc","eth"]
    const baseToken = "usdt"
    const tokensReqObj:any = (
    DEFAULT_TOKENS_ARRAY.reduce((acc, aToken) => (
        { ...acc, [aToken]: [`${API_PRICE_BASEURL}${(aToken+baseToken).toUpperCase()}`] }
    ), {}))
    const online = true
    const DEFAULT_TOKEN = {}
    const klinesStats = useMemo(()=>{
        let maxPrice = 0
        let minPrice = klinesArray.length ? klinesArray[0][3] : 99999999999
        for (let kline of klinesArray)
        {
            maxPrice = parseFloat(kline[2]) > maxPrice ? parseFloat(kline[2]) : maxPrice
            minPrice = parseFloat(kline[3]) < minPrice ? parseFloat(kline[3]) : minPrice
        }
        let min = parseFloat(`${parseDecimals(minPrice)}`)
        let max = parseFloat(`${parseDecimals(maxPrice)}`)
        return {
            minMaxAvg:(max+min)/2,
            range:max-min,
            min,
            max,
        }
    },[klinesArray])

    
    /********** UPDATE **********/
    const getData = async (randomThousand:any) => {
        const res:any = await fetch('https://geolocation-db.com/json/')
        let awaited = await res.json()
        s__clientIP(awaited.IPv4)
        let new_uid = `${awaited.IPv4}:${randomThousand}`
        s__uid(new_uid)
        s__LS_uid(new_uid)
    }
    const register = () => {
        let randomThousand = parseInt(`${(Math.random()*9000) + 1000}`)
        if (confirm(`IP+${randomThousand}\nWould you like to Register?`)) {
            getData(randomThousand)
        }
    }
    const getStrategyResult = (tokenConfig:any, livePrice:number) => {
        let {floor, ceil, state, buy, sell} = tokenConfig
        if (!state) return 0
        let floorPrice = parseFloat(floor)
        let ceilPrice = parseFloat(ceil)
        let isInRange = state == 1
        let isAtLimit = state == 2
        // if (isInRange && livePrice < floorPrice) 
        // {
        //     return buy == 1 ? 2 : 1
        // }
        // if (isInRange && livePrice < ceilPrice) { }
        return 0
    }  
    const joinToken = (token:string) => {
        addToken(token)
    }
    const addToken = (token:string) => {
        if (!token) return
        let new_tokensArray = {
            ...tokensArray, ...
            {
                [`${token}`]: DEFAULT_TIMEFRAME_ARRAY.map((aTimeframe, index)=> DEFAULT_TOKEN_OBJ )
            }
        }
        s__tokensArray(new_tokensArray)
        s__LS_tokensArray((prevValue) => JSON.stringify(new_tokensArray))
    }
    const updateTokenOrder = (token:string, timeframe:any, substate:string) => {
        if (!token) return
        let value = prompt("Enter Value")
        if (!value) return
        let timeframeIndex = DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)
        let old_tokensArray = tokensArray[token][timeframeIndex]
        // s__tokensArray(new_tokensArray)
        // s__LS_tokensArray((prevValue) => JSON.stringify(new_tokensArray))
    }
    const setNewTimeframe = async(aTimeframe:string) => {
        if (!confirm("change timeframe and request new klines")) return
        s__timeframe(aTimeframe)
        getKlineArray(aTimeframe)
    }
    const getKlineArray = async(t=DEFAULT_TIMEFRAME) => {
        let urlBase = `https://api.binance.com/api/v3/klines?interval=${t}&symbol=`
        const theArray = await fetchJsonArray(urlBase+"BTCUSDT")
        s__klinesArray(theArray)
    }
    const removeToken = (token:string) => {
        if (!confirm("Confirm exit?")) return
        if (!token) return
        let new_tokensArray:any = {...tokensArray}
        delete new_tokensArray[token]
        s__tokensArray(new_tokensArray)
        s__LS_tokensArray((prevValue) => JSON.stringify(new_tokensArray))
    }



    /********** HTML **********/
    return (
    <div className="body pos-rel flex-col flex-justify-start noverflow">
        {!uid && <div className="h-100px w-100px z-999 "></div>}
        {!uid && (
            <div className="tx-bold flex-center px-8 " onClick={()=>{register()}}>
                <button className="clickble tx-ls-5  tx-white opaci-chov-50 duno-btn hov-bord-1-w py-4 px-8 bord-r-50 tx-lg"
                    style={{boxShadow:"0px 0px 25px #CF589433"}}
                >
                Register
                </button>
            </div>
        )}
        <div
            className={
                "bg-glass-6   bord-r-10 tx-white mt-8 py-8 z-999 fade-in w-1080px noverflow flex flex-between"
            }
            style={{
                border:"1px solid #777",
                boxShadow:"0 10px 50px -20px #00000077"
            }}
        >
            <div className=" flex-col w-100 ">
                <div
                    className="flex pos-rel block  w-90 box-shadow-5 bg-w-opaci-10 hov-bord-1-w autoverflow  my-3 bord-r-5"
                    style={{
                        resize:"both",
                        height:"400px",
                    }}
                >
                    <ChartHigherLine klinesArray={p__klinesArray} klinesStats={klinesStats} />
                    <ChartLowerLine klinesArray={p__klinesArray} klinesStats={klinesStats} />

                    <ChartMiddleLine klinesArray={klinesArray} />
                    <ChartTopBottomLine klinesArray={klinesArray} />
                    <ChartSinLine klinesArray={klinesArray} wavelength={wavelength} />
                            
                </div>
                
                <div className="flex-center  ddg">
                    <div className="">{klinesStats.min}</div>
                    <div className="">-</div>
                    <div className="">{klinesStats.max}</div>
                    <div className="pa-2 flex nowrap opaci-50">
                        range: {klinesStats.range}
                    </div>
                </div>
                <div className="flex-center w-100 mq_xs_flex-col">
                    <div className="flex-col pa-2 ddr">
                        <div className="w-100 flex flex-align-end">
                            <div className="tx-sm pr-1 opaci-50">Timeframe:</div>
                            <div className="tx-lgx tx-bold-6">{timeframe}</div>
                            {!!chopAmount && <div className="px-1 opaci-50">(-{chopAmount})</div>}
                            
                        </div>
                        <div className="w-100">
                            <input className="w-100" type="range"
                                min="-500" max={0} step="1"
                                value={-chopAmount}
                                onChange={(e)=>{s__chopAmount(-e.target.value)}}
                            />
                        </div>
                        <div className="flex-wrap w-220px ">
                            {DEFAULT_TIMEFRAME_ARRAY.map((aTimeframe,index)=>{
                                return (
                                <button className="ma-1 pa-2  opaci-chov--50 bg-w-opaci-50 bord-r-8 tx-white"
                                    key={index} onClick={()=>setNewTimeframe(aTimeframe)}
                                >
                                    {aTimeframe}
                                </button>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex-col pa-2 ddb">
                        <div className="w-100 flex flex-align-end">
                            <div className="tx-sm pr-1 opaci-50">Wavelength:</div>
                            <div className="tx-lgx tx-bold-6">{wavelength}</div>
                        </div>
                        <div className="w-100">
                            <div className="w-100">
                                <input className="w-100" type="range"
                                    min={-333} max={333} step="5"
                                    value={wavelength}
                                    onChange={(e)=>{s__wavelength(e.target.value)}}
                                />
                            </div>
                        </div>
                        <div className="flex-wrap w-250px ">
                            {["-220","-160","220","1000","-1000"].map((aWavelength,index)=>{
                                return (
                                <button className="ma-1  px-2 py-2  opaci-chov--50 bg-w-opaci-20  tx-lg bord-r-8 tx-white"
                                    style={{border: `2px solid rgb(${aWavelength},99,99)`}}
                                    key={index} onClick={()=>s__wavelength(aWavelength)}
                                >
                                    {aWavelength}
                                </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            className={
                "bg-glass-6   bord-r-10 tx-white mt-8 py-8 z-999 fade-in w-1080px noverflow flex flex-between"
            }
            style={{
            border:"1px solid #777",
            boxShadow:"0 10px 50px -20px #00000077"
            }}
        >
            <div className=" flex-col w-100 ">
                {!uid && (
                    <div className="tx-bold flex-center px-8 " onClick={()=>{register()}}>
                        <button className="clickble tx-ls-5  tx-white opaci-chov-50 duno-btn hov-bord-1-w py-4 px-8 bord-r-50 tx-lg"
                            style={{boxShadow:"0px 0px 25px #CF589433"}}
                        >
                        Register
                        </button>
                    </div>
                )}
                {!!uid && 
                    <div className="bg-w-opaci-50 bord-r-50 px-2 py-1 tx-sm ">
                        {uid}
                    </div>
                }

                {/*uid &&*/ DEFAULT_TOKENS_ARRAY.map((aToken,index)=>{
                    if (!tokensArray[aToken]) return
                    let theStrategyResult = queryUSDT.data && (aToken in tokensArray) ?(
                        getStrategyResult(tokensArray[aToken][0],parseFloat(queryUSDT.data[index].price))
                        ) : 0
                    return (
                    <div className="flex   w-100" key={index}>
                        <div className="px-8 py-4 w-100    mb-4  flex-1" >
                            <h1 className="tx-xl flex-col flex-align-start mr-100 " >
                                {queryUSDT.isLoading && 
                                    <span className="flex">
                                        <div className="pr-4">
                                            {aToken.toUpperCase()}:
                                        </div>
                                        <div className="px-2 opaci-25 hover-1 tx-xl" >
                                            ...
                                        </div>
                                    </span>
                                }
                                {!queryUSDT.isLoading && !queryUSDT.error && 
                                    <span className="opaci-chov--50" onClick={()=>{joinToken(aToken)}}>
                                        {aToken.toUpperCase()}: {parseDecimals(queryUSDT.data[index].price)}
                                    </span>
                                }
                            </h1>
                        </div>
                        {false && tokensArray[aToken][0] &&
                            <div className="flex-center px-4">
                                {/* parsedKlines */}
                                {JSON.stringify(parsedKlines)}
                            </div>
                        }
                        {tokensArray[aToken][0] &&
                            <div className="flex-center">
                                <div onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"mode")}}
                                    className="opaci-chov--50 bg-w-opaci-90  tx-black px-3 py-1 bord-r-15 mx-1 mt-1"
                                >
                                    Mode: {tokensArray[aToken][0].mode}
                                </div>
                                <div className="flex-center px-4">
                                    <div onClick={queryUSDT.refetch} className="px-2 py-1 bg-b-opaci-50 opaci-chov--50 bord-r-5">Refresh</div>
                                </div>
                            </div>
                        }
                        {tokensArray[aToken][0] &&
                            <div className="flex-col">
                                <div className="flex">
                                    <div onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"state")}}
                                        className="opaci-chov--50 bg-w-opaci-90  tx-black px-3 py-1 bord-r-15 mx-1 mt-1"
                                    >
                                        State: {tokensArray[aToken][0].state}
                                    </div>
                                    {/* |{theStrategyResult}| */}
                                    {tokensArray[aToken][0] && queryUSDT.data &&
                                        <div className="flex-center px-4">
                                            {theStrategyResult == 0 && <div>Wait</div>}
                                            {theStrategyResult == 1 && <div>Buy <br/> 1st <br/> Half</div>}
                                            {theStrategyResult == 2 && <div>Buy <br/> 2nd <br/> Half</div>}
                                            {/* <div className="px-2 py-1 bg-white bord-r-5 tx-green opaci-chov--50">Do Trade</div>
                                            <div className="px-2 py-1 bg-white bord-r-5 tx-red">Don't <br /> Trade</div> */}
                                        </div>
                                    }
                                </div>
                                <div className="flex">
                                    <div onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"floor")}}
                                        className="opaci-chov--50 bg-w-opaci-20  px-3 py-1 bord-r-15 mx-1 mt-1"
                                    >
                                        Min: {tokensArray[aToken][0].floor}
                                    </div>
                                    <div onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"ceil")}}
                                        className="opaci-chov--50 bg-w-opaci-20  px-3 py-1 bord-r-15 mx-1 mt-1"
                                    >
                                        Max: {tokensArray[aToken][0].ceil}
                                    </div>
                                </div>
                                <div className="flex">
                                    <div onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"buy")}}
                                        className="opaci-chov--50 bg-w-opaci-50  px-3 py-1 bord-r-15 mx-1 mt-1"
                                    >
                                        Buy: {tokensArray[aToken][0].buy
                                    }</div>
                                    <div onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"sell")}}
                                        className="opaci-chov--50 bg-w-opaci-20  px-3 py-1 bord-r-15 mx-1 mt-1"
                                    >
                                        Sell: {tokensArray[aToken][0].sell
                                    }</div>
                                </div>
                            </div>
                        }
                        {/* <textarea className="bord-r-10 tx-lg px-4 py-2 tx-black my-2" placeholder="message"></textarea> */}
                        {(aToken in tokensArray) && 
                            <div className="tx-bold flex-center px-8 " onClick={()=>{removeToken(aToken)}}>
                                <button className="clickble tx-ls-5  opaci-50 opaci-chov-50 duno-btn hov-bord-1-w py-4 px-8 bord-r-50 tx-lg"
                                    style={{boxShadow:"0px 0px 25px #CF589433"}}
                                >
                                    LEAVE
                                </button>
                            </div>
                        }
                        {!(aToken in tokensArray) && 
                            <div className={`tx-bold flex-center px-8 invert ${!uid && "opaci-50"}`}
                                onClick={()=>{!!uid && joinToken(aToken)}} 
                            >
                                <button className="clickble tx-ls-5  opaci-50 opaci-chov-50 duno-btn hov-bord-1-w py-4 px-8 bord-r-50 tx-lg"
                                    style={{boxShadow:"0px 0px 25px #CF589433"}}
                                >
                                    JOIN
                                </button>
                            </div>
                        }
                    </div>
                    )
                })}
            </div>
        </div>
        <div className=" pt-200"></div>
    </div>
    )
}
export default () => {
    return (
    <div className="">
        <Dashboard  />
    </div>
    )
}