import { useState, useEffect, useMemo } from "react";
import { useQuery } from '@tanstack/react-query'
import { fetchJsonArray, fetchMultipleJsonArray, getStrategyResult, parseDecimals, parseUTCDateString, parseUTCString, timeDifference } from "../scripts/helpers";
import { BsFillGearFill } from "react-icons/bs"
import { ChartSinLine, ChartHigherLine, ChartLowerLine, ChartMiddleLine, ChartTopBottomLine, ChartLowerLastLine, ChartHigherLastLine } from "../components/chart/lines";
import { DEFAULT_TIMEFRAME_ARRAY } from "../scripts/constants";
import { TokenConfigStateButtons } from "../components/chart/tokenConfig";
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "next/router";

const DEFAULT_TOKENS_ARRAY = ["btc","eth","ftm","link","matic","sol",]
function TokenPage({query}) {
    /********** CREATE **********/
    const DEFAULT_TIMEFRAME = "15m"
    const [timeframe,s__timeframe] = useState<any>(DEFAULT_TIMEFRAME)
    const [counter, s__counter] = useState(0);
    const [loadings, s__loadings] = useState('all');
    const getKlineArray = async(t,token) => {
        console.log("fetching getKlineArray",t,token)

        s__loadings("klinesArray")
        let urlBase = `https://api.binance.com/api/v3/klines?interval=${t}&symbol=`
        const theArray = await fetchJsonArray(urlBase+token.toUpperCase()+"USDT")
        let lastIndex = theArray.length - 1
        // console.log("s__klinesArray",theArray.length)
        while (lastIndex < 499)
        {
            theArray.unshift(theArray[0])
            lastIndex++
        }

        s__klinesArray(theArray)
        s__loadings("")
    }
    const cryptoToken = useMemo(()=>{
        // console.log("token page",query)
        // console.log(selectedToken)

        return DEFAULT_TOKENS_ARRAY.includes(query.token.toLowerCase()) ? query.token.toLowerCase() : ""
    },[query]) 
    const [selectedToken,s__selectedToken] = useState<any>(cryptoToken)
    useEffect(()=>{
        // if (counter == 0 ) return
        if (cryptoToken != selectedToken) {
            // console.log(`selectedToken:${selectedToken} changed to `,cryptoToken)
            getKlineArray(timeframe,query.token)
        } else {
            // console.log(selectedToken,cryptoToken,counter)
            if (counter == 1)
            {
                // console.log("fetch")
            }
            // if ()
        }
        // console.log(selectedToken)
        // if ()
        // s__selectedToken()
        // getKlineArray()
    },[counter,selectedToken,cryptoToken])
    useEffect(()=>{
        s__counter(counter+1)
        s__tokensArray(JSON.parse(LS_tokensArray))
        s__uid(LS_uid)
        s__clientIP(LS_uid.split(":")[0])
        // console.log("attempt ",counter, cryptoToken)
        if (counter > 0)
        {
            // console.log("fetching ",cryptoToken)
            getKlineArray(timeframe,cryptoToken)
        }
        // console.log(query)
        // console.log(query.token, cryptoToken)
    },[])



    /********** DATA **********/
    const API_PRICE_BASEURL = "https://api.binance.com/api/v3/ticker/price?symbol="
    const baseToken = "usdt"
    const tokensReqObj:any = (
    DEFAULT_TOKENS_ARRAY.reduce((acc, aToken) => (
        { ...acc, [aToken]: [`${API_PRICE_BASEURL}${(aToken+baseToken).toUpperCase()}`] }
    ), {}))
    const [LS_tokensArray, s__LS_tokensArray] = useLocalStorage('localTokensArray', "{}")
    const [LS_uid, s__LS_uid] = useLocalStorage('uid', "")
    const [uid, s__uid] = useState("")
    const [isUIReversed,s__isUIReversed] = useState<any>(true)
    const [chopAmount,s__chopAmount] = useState<any>(0)
    const [wavelength,s__wavelength] = useState<any>(-300)
    const [tokensArray,s__tokensArray] = useState<any>({})
    const [klinesArray,s__klinesArray] = useState<any[]>([])
    const [clientIP, s__clientIP] = useState('');
    // const isAnyLoading = useMemo([...(loadings.values())],[loadings]);
    const DEFAULT_TOKEN_OBJ = { mode:0,state:0,buy:0,sell:0, floor:0,ceil:0}
    // const DEFAULT_TIMEFRAME_ARRAY = ["15m","12h","1d","1w"]  
    const parsedKlines = useMemo(()=>{
        let parsedKlinesArray:any = []
        parsedKlinesArray = klinesArray
        return parsedKlinesArray
    },[klinesArray])
    const p__klinesArray = useMemo(()=>{
        let slicedArray = [...klinesArray]
        
        let lastIndex = slicedArray.length
        // console.log("s__klinesArray",slicedArray.length)
        // while (lastIndex < 500)
        for (let index = 0; index < chopAmount; index++) {
            slicedArray.push(klinesArray[499])            
        }

        return slicedArray.slice(slicedArray.length-500,slicedArray.length)
    },[klinesArray,chopAmount])
    const queryUSDT:any = useQuery({
        queryKey: ['usdt'],
        queryFn: async () => online ? await fetchMultipleJsonArray(tokensReqObj) : DEFAULT_TOKEN,        
    })
    const online = true
    const DEFAULT_TOKEN = {}
    const klinesStats = useMemo(()=>{
        if (!tokensArray[cryptoToken]) return {}
        let tokenConfirg = tokensArray[cryptoToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)]

        let maxPrice = 0
        let minPrice = p__klinesArray.length ? p__klinesArray[0][3] : 99999999999
        for (let kline of p__klinesArray)
        {
            maxPrice = parseFloat(kline[2]) > maxPrice ? parseFloat(kline[2]) : maxPrice
            minPrice = parseFloat(kline[3]) < minPrice ? parseFloat(kline[3]) : minPrice
        }
        let min = parseFloat(`${parseDecimals(minPrice)}`)
        let max = parseFloat(`${parseDecimals(maxPrice)}`)
        let startDate = parseUTCDateString(new Date(p__klinesArray.length ? p__klinesArray[0][0] : 0))
        let midDate = parseUTCDateString(new Date(p__klinesArray.length ? p__klinesArray[250][0] : 0))
        let endDate = parseUTCDateString(new Date(p__klinesArray.length ? p__klinesArray[499][0] : 0))
        let range = parseFloat(`${parseDecimals(tokenConfirg.ceil-tokenConfirg.floor)}`)
        
        let dropPercent = parseFloat(100-parseInt(`${p__klinesArray.length ? min/max*100 : 0}`)+"")
        // !!p__klinesArray.length && console.log("asdasdas", p__klinesArray[0])
        let timeDiff = p__klinesArray.length ? timeDifference(p__klinesArray[499][0], p__klinesArray[0][0]) : ""
        let minMaxAvg = parseDecimals((parseFloat(tokenConfirg.ceil)+parseFloat(tokenConfirg.floor))/2)
        let minMedian = (parseFloat(tokenConfirg.floor)+parseFloat(`${minMaxAvg}`))/2
        let maxMedian = (parseFloat(tokenConfirg.ceil)+parseFloat(`${minMaxAvg}`))/2
        return {
            minMaxAvg,
            minMedian,
            maxMedian,
            range,
            minPrice: min,
            maxPrice: max,
            min: parseFloat(tokenConfirg.floor),
            max: parseFloat(tokenConfirg.ceil),
            endDate,
            midDate,
            startDate,
            dropPercent,
            timeDiff,
        }
    },[p__klinesArray, tokensArray])

    
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
        let promptVal = prompt("Enter Value")
        let value = !promptVal ? 0 : parseFloat(promptVal)
        // if (!value) return
        let timeframeIndex = timeframe
        // let timeframeIndex = DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)
        // console.log("timeframe, timeframeIndex", timeframe, timeframeIndex)
        let old_tokensArray = tokensArray[token][timeframeIndex]

        let old_tokensArrayArray = [...tokensArray[token]]
        old_tokensArrayArray[timeframeIndex] = {...old_tokensArray,...{[substate]:value}}
        let newTimeframedConfig = old_tokensArrayArray[timeframeIndex]
        // console.log("old", old_tokensArray)
        // console.log("new", newTimeframedConfig)
        // console.log("new", tokensArray)
        let bigTokensObj = {...tokensArray, ...{[token]:old_tokensArrayArray}}
        // console.log("new", bigTokensObj)
        s__tokensArray(bigTokensObj)
        s__LS_tokensArray((prevValue) => JSON.stringify(bigTokensObj))
    }
    const setNewTimeframe = async(aTimeframe:string) => {
        if (!confirm("change timeframe and request new klines: "+aTimeframe)) return
        s__timeframe(aTimeframe)
        getKlineArray(aTimeframe,cryptoToken)
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
    if (!cryptoToken) return (
        <div className="">
            <div className="body h-800px pos-rel flex-col flex-justify-start noverflow">
                <div className="h-600px block flex-center tx-white tx-xl">. . .</div>
                <div className="h-600px block flex-center tx-white tx-xl">. . .</div>
            </div>
        </div>
    )

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
                "bg-glass-6   bord-r-10 tx-white mt-8 py-8 z-999 fade-in w-95 noverflow flex flex-between"
            }
            style={{
                border:"1px solid #777",
                boxShadow:"0 10px 50px -20px #00000077"
            }}
        >
            <div className={` flex-col${isUIReversed ? "-r" : ""} w-100 `}>
                {klinesArray.length == 0  && <>
                    <div className="w-100  pos-rel flex-col flex-justify-start noverflow">
                        <div className="h-600px block flex-center tx-white tx-xl">. . .</div>
                    </div>
                </>}
                {loadings != "" && <div className="flex  w-90 bg-w-10 bord-r-8 my-6 h-min-300px"></div> }   
                {loadings == "" &&
                    <div className="flex-wrap flex-align-start w-90  my-4">

                        {/* <div className="flex mq_xs_md_flex-col flex-1"> */}
                            <div className="flex-col flex-1">
                                {/*uid &&*/ DEFAULT_TOKENS_ARRAY.map((aToken,index)=>{
                                    let isQ = true
                                    if (queryUSDT.isLoading) { isQ = false }
                                    if (queryUSDT.error) { isQ = false }
                                    let isK = isQ
                                    if (!tokensArray[aToken] || (tokensArray[aToken] && !tokensArray[aToken][0])) { isQ = false }
                                    let theToken = isQ ? tokensArray[aToken][0] : null
                                    let aTokenCristayl = isQ ? tokensArray[aToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)] : {}
                                    let crystal = (
                                        queryUSDT.data
                                        ? getStrategyResult(aTokenCristayl,parseFloat(queryUSDT.data[index].price))
                                        : 0
                                    )
                                    return (
                                    <div className={`flex pa-2 w-min-350px bord-r-8 mt-2 w-100  ${aToken == cryptoToken ? "bg-w-20 " : "bg-b-10 "} `}
                                        key={index}
                                    >
                                        
                                        <div className="      flex-col w-100 " >
                                            
                                            {<div className="tx-lgx  w-100 flex flex-align-start  " >
                                                {/* <a onClick={()=>{setToken(aToken)}}  className="bord-r-5 px-2 py-1 bg-w-50 opaci-chov--50 tx-white tx-lg">↑</a> */}
                                                <a className="opaci-chov--50 tx-white" href={"/token?token="+aToken}>
                                                    <span className="px-1">{aToken.toUpperCase()}:</span>
                                                    <span className="tx-ls-2">{isK && parseDecimals(queryUSDT.data[index].price)}</span>
                                                </a>
                                            </div>}
                                            
                                            <div className="w-100">
                                                <div className="flex  opaci-75 ">
                                                    {!!tokensArray[aToken] && (
                                                        <div className="flex-center  flex-justify-between w-100">
                                                            {!tokensArray[aToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)].state
                                                                ? <div className="opaci-25">Inactive</div>
                                                                : <div className="opaci-75 flex-center">
                                                                    <div className="">
                                                                        Active
                                                                    </div >
                                                                    <div className="tx-bold-8 px-2 py-1 bg-w-50 bord-r-8 ma-1">
                                                                        {crystal}
                                                                    </div >
                                                                </div>
                                                            }
                                                            
                                                            {!isQ || !tokensArray[aToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)].state
                                                                ? (<div className="opaci-25 tx-xs ">
                                                                    {/* qwe | {JSON.stringify(crystal)} |  */}
                                                                    {/* zxc | {JSON.stringify(aTokenCristayl)} |  */}
                                                                        offline
                                                                    </div>
                                                                )
                                                                : (
                                                                    <div className="opaci-75 ">
                                                                        {crystal == 2 && <><div>buy more</div></>}
                                                                        {crystal == 1 && <><div>buy min</div></>}
                                                                        {crystal == 0 && <><div>wait</div></>}
                                                                        {crystal == -1 && <><div>sell min</div></>}
                                                                        {crystal == -2 && <><div>sell all</div></>}
                                                                    </div>
                                                                )
                                                            }
                                                            
                                                            {tokensArray[aToken][0].state == 1 && <>
                                                                <div className=" tx-sm">
                                                                    open
                                                                </div>
                                                            </>}
                                                            {/* {JSON.stringify(tokensArray[aToken][0])} */}
                                                        </div>
                                                    )}
                                                    {false && !tokensArray[aToken] && (
                                                        <div>
                                                            test
                                                        </div>
                                                    )}
                                                    {false && JSON.stringify(tokensArray[aToken])}
                                                </div>
                                            </div>
                                            
                                            {aToken == cryptoToken &&
                                                <div className="flex-center ">
                                                    
                                                    <div className="flex mt-1">
                                                        <div onClick={()=>{updateTokenOrder(aToken,DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe) ,"mode")}}
                                                            className="opaci-chov--50 bg-w-90  tx-black px-3 py-1 bord-r-15 mx-1 ma-1"
                                                        >
                                                            Mode: {theToken && theToken.mode}
                                                        </div>
                                                        <div className="flex-center px-4">
                                                            <div onClick={()=>{getKlineArray(timeframe,cryptoToken)}} className="px-2 py-1 bg-b-50 opaci-chov--50 bord-r-8 ">
                                                                Refresh
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            
                                            {/* tokensArray */}
                                            {false && aToken == cryptoToken && isK &&
                                                <div className="">
                                                    <div className="flex-center opaci-75 ddg">
                                                        <div className="">{klinesStats.min}</div>
                                                        <div className="">-</div>
                                                        <div className="">{klinesStats.max}</div>
                                                        <div className="px-2 flex nowrap opaci-30">
                                                            {klinesStats.range} ({klinesStats.dropPercent}%)
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>

                        <div className="mt-2 show-xs_md opaci-10 w-100"><hr className="w-100"/></div>
                        <div className="flex mq_xs_flex-col ">
                            <div className="flex-col pa-2 ddr">
                                <div className="w-100 flex-center flex-align-end">
                                    <div className="tx-sm pr-1 opaci-50">Timeframe:</div>
                                    <div className="tx-lgx tx-bold-6">{timeframe}</div>
                                    
                                    
                                </div>
                                <div className="flex-wrap w-300px ">
                                    {DEFAULT_TIMEFRAME_ARRAY.map((aTimeframe,index)=>{
                                        return (
                                        <button className="ma-1 pa-2  opaci-chov--50 bg-w-10 bord-r-8 tx-white"
                                            // style={{boxShadow:aTimeframe == timeframe && "0px 0px 2px 2px green"}}
                                            key={index} onClick={()=>setNewTimeframe(aTimeframe)}
                                        >
                                            {aTimeframe}
                                        </button>
                                        )
                                    })}
                                </div>
                                {tokensArray &&  tokensArray[cryptoToken] && tokensArray[cryptoToken][0] &&
                                    <div className="flex-wrap w-  ">
                                        {/* {tokensArray[cryptoToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)].state} */}
                                        <TokenConfigStateButtons 
                                            timeframe={timeframe}
                                            index={DEFAULT_TOKENS_ARRAY.indexOf(cryptoToken)}
                                            tokensArray={tokensArray}
                                            queryUSDT={queryUSDT}
                                            aToken={cryptoToken}
                                            theToken={tokensArray[cryptoToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)]}
                                            updateTokenOrder={updateTokenOrder}
                                        />
                                    </div>
                                }
                                
                            </div>
                        {/* </div> */}
                            <div className="flex-col pa-2 ddb">
                                <div className="w-90 flex flex-align-end">
                                    <div className="tx-sm pr-1 opaci-50">Wavelength:</div>
                                    <div className="tx-lgx tx-bold-6">{wavelength}</div>
                                </div>
                                <div className="w-100">
                                    <div className="w-100">
                                        <input className="w-100" type="range"
                                            min={-360} max={1200} step="5"
                                            value={wavelength}
                                            onChange={(e)=>{s__wavelength(e.target.value)}}
                                        />
                                    </div>
                                </div>
                                <div className="flex-wrap w-250px ">
                                    {["-300","250","630"].map((aWavelength,index)=>{
                                        return (
                                        <button className="fle-col ma-1 pb-3 px-2 py-2  opaci-chov--50 bg-w-20  tx-lg bord-r-8 tx-white"
                                            style={{
                                                border: `2px solid rgb(${(200-parseInt(aWavelength))},99,99)`,
                                                // boxShadow:wavelength==aWavelength?"0 6px 9px 1px #000000aa":""
                                            }}
                                            key={index} onClick={()=>s__wavelength(aWavelength)}
                                        >
                                            {wavelength==aWavelength && <div className="tx-xs">wave:</div>}
                                            <div className="">{aWavelength}</div>
                                        </button>
                                        )
                                    })}
                                </div>
                                <hr className="w-100 opaci-10 my-3" />
                                <div className="w-100 flex flex-align-end">
                                    <div className="tx-sm pr-1 opaci-50">Scope:</div>
                                    <div className="tx-lg tx-bold-6">
                                        {<div className="px-1 opaci-50">{chopAmount}</div>}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input className="w-100" type="range"
                                        min="-500" max={0} step="1"
                                        value={-chopAmount}
                                        onChange={(e)=>{s__chopAmount(-e.target.value)}}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-2 show-xs_md opaci-10 w-100"><hr className="w-100"/></div>
                        <div className="flex-1 flex-col flex-justify-between   ">
                            {/* <div className="flex"> */}
                                {!!uid && 
                                    <details className="tx-white w-100 flex-center ">
                                        <summary className="flex flex-justify-end">
                                            <div className="tx-lg opaci-chov--50 py-2 mt-2 bord-r-8 px-2 bg-w-hov-20">
                                                <BsFillGearFill />
                                            </div>
                                        </summary>
                                            
                                        <div className="w-90 flex-col flex-justify-end">
                                            {/* <button className="clickble tx-ls-5 my-2 opaci-50 opaci-chov-50  hov-bord-1-w py-2 px-3 bord-r-50 tx-lg"
                                                onClick={()=>{s__isUIReversed(!isUIReversed)}}
                                                style={{boxShadow:"0px 0px 25px #CF589433"}}
                                            >
                                                Turn
                                            </button> */}
                                            <div className="bg-w-50  bord-r-50 px-2 py-1 tx-sm ">
                                                {uid}
                                            </div>
                                        </div>
                                    </details>
                                }

                                <div className="flex-center w-min-200px">
                                    {(cryptoToken in tokensArray) && 
                                        <div className="tx-bold flex-center  mt-2 " >
                                            <button className="clickble tx-ls-5  opaci-50 opaci-chov-50 duno-btn hov-bord-1-w py-2 px-3 bord-r-50 tx-lg"
                                                onClick={()=>{removeToken(cryptoToken)}}
                                                style={{boxShadow:"0px 0px 25px #CF589433"}}
                                            >
                                                LEAVE
                                            </button>
                                        </div>
                                    }
                                    {!(cryptoToken in tokensArray) && 
                                        <div className={`tx-bold flex-center  invert ${!uid && "opaci-50"}`}
                                        >
                                            <button className="clickble tx-ls-5 mt-2 opaci-50 opaci-chov-50 duno-btn hov-bord-1-w py-4 px-8 bord-r-50 tx-lg"
                                                onClick={()=>{!!uid && joinToken(cryptoToken)}} 
                                                style={{boxShadow:"0px 0px 25px #CF589433"}}
                                            >
                                                JOIN
                                            </button>
                                        </div>
                                    }
                                </div>
                                
                            {/* </div> */}
                        </div>
                    </div>
                }
                {klinesArray.length > 0  && <>
                
                    <div className=" flex  flex-justify-between w-90"
                    >
                        <div className="flex-1 px-2 opaci-10">
                            <hr/>
                        </div>
                        <div className="opaci-50">
                            <div className=" left-0 top-0">{klinesStats.timeDiff}</div>
                        </div>
                        <div className=" opaci-10 px-2 ">
                            <hr className="px-2"/>
                        </div>
                        <div className="opaci-50">
                            <div className=" left-0 top-0">{klinesStats.dropPercent}%</div>
                        </div>
                    </div>
                    {loadings != "" && <div className="flex  w-90 bg-w-10  my-3 bord-r-8 h-400px"></div> }   
                
                    {loadings == "" &&  
                        <div
                            className="flex pos-rel w-90 box-shadow-5 bg-w-10 hov-bord-1-w autoverflow  my-3 bord-r-8"
                            style={{ resize:"both", height:"400px", }}
                        >
                            
                            <div className="pa-1 pos-abs right-0 bottom-0">{klinesStats.min}</div>
                            <div className="pa-1 pos-abs right-0 top-75p">{klinesStats.minMedian}</div>
                            <div className="pa-1 pos-abs right-0 top-50p">{klinesStats.minMaxAvg}</div>
                            <div className="pa-1 pos-abs right-0 top-25p">{klinesStats.maxMedian}</div>
                            <div className="pa-1 pos-abs right-0 top-0">{klinesStats.max}</div>
                            <ChartHigherLine klinesArray={p__klinesArray} klinesStats={klinesStats}
                                tokenConfig={tokensArray[cryptoToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)]}
                            />
                            <ChartLowerLine klinesArray={p__klinesArray} klinesStats={klinesStats}
                                tokenConfig={tokensArray[cryptoToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)]}
                            />
                            <ChartHigherLastLine klinesArray={p__klinesArray} klinesStats={klinesStats}
                                tokenConfig={tokensArray[cryptoToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)]}
                            />
                            <ChartLowerLastLine klinesArray={p__klinesArray} klinesStats={klinesStats}
                                tokenConfig={tokensArray[cryptoToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)]}
                            />

                            <ChartMiddleLine klinesArray={klinesArray} />
                            <ChartTopBottomLine klinesArray={klinesArray} />
                            <ChartSinLine chopAmount={chopAmount} klinesArray={klinesArray} wavelength={wavelength} />
                                    
                        </div>
                    }
                    <div className=" flex  flex-justify-between w-90"
                    >
                        <div className="">
                            {klinesStats.startDate}
                        </div>
                        <div className="flex-1 px-2 opaci-10">
                            <hr/>
                        </div>
                        <div className="">
                            {klinesStats.midDate}
                        </div>
                        <div className="flex-1 px-2 opaci-10">
                            <hr/>
                        </div>
                        <div className="">
                            {klinesStats.endDate}
                        </div>
                    </div>
                </>}

                <div className="flex-center ma-4">
                    <a  className="px-2 py-1 bg-w-50 ma-1  opaci-chov--50 bord-r-8 tx-white" target={"_blank"}
                        href={`https://www.tradingview.com/chart/?symbol=BINANCE%3A${cryptoToken.toUpperCase()}${baseToken.toUpperCase()}`}
                    >
                        {cryptoToken.toUpperCase()}{baseToken.toUpperCase()} @{timeframe}
                    </a>
                    <div onClick={()=>{getKlineArray(timeframe,cryptoToken)}} className="px-2 py-1 bg-b-20 ma-1 opaci-50 opaci-chov-50 bord-r-8 ">
                        Refresh
                    </div>
                </div>


            </div>
        </div>
        <div className=" pt-200"></div>
    </div>
    )
}
export default ({query}) => {
    const router = useRouter()
    // const { token } = router.query
    // console.log("token page",router.query)
    let __token = router.query.token || ""
    // console.log("query", router.query)
    // console.log("query", __token, DEFAULT_TOKENS_ARRAY.includes(__token.toLowerCase()), query)
    // if (!router.query.token) return
    return (
    <div className="">
        <TokenPage  query={{token:__token}} />
    </div>
    )
}