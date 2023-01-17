import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useQuery } from '@tanstack/react-query'
import { fetchMultipleJsonArray, parseDecimals } from "../scripts/helpers";
import { useLocalStorage } from "usehooks-ts";


async function test() {
    console.log("test");
    let result = getBotUpdates();
}

const getBotUpdates = () =>
    fetch(
        "https://api.telegram.org/bot5389030729:AAF9fnNmzr2wf-B0PMgax0yDowu0DUILZYQ/getUpdates"
    ).then((response) => {
        console.log("response", response);
        return response.json();
    });


function Dashboard({
}: {}) {
    
    const [LS_tokensArray, s__LS_tokensArray] = useLocalStorage('localTokensArray', "{}")
    const [tokensArray,s__tokensArray] = useState<any>({})
    useEffect(()=>{
        s__tokensArray(JSON.parse(LS_tokensArray))
    },[])
    const joinToken = (token:string) => {
        // if (!confirm("Confirm?")) return
        addToken(token)
    }
    const addToken = (token:string) => {
        // if (!theMessage) return
        if (!token) return

        let new_tokensArray = {...tokensArray, ...{[token]:{order:0,half:0,full:0}}}
        s__tokensArray(new_tokensArray)
        s__LS_tokensArray((prevValue) => JSON.stringify(new_tokensArray))
        // s__theMessage("")
    }

    const removeToken = (token:string) => {
        if (!confirm("Confirm?")) return
        // if (!theMessage) return
        if (!token) return

        let new_tokensArray:any = {...tokensArray}
        delete new_tokensArray[token]
        s__tokensArray(new_tokensArray)
        s__LS_tokensArray((prevValue) => JSON.stringify(new_tokensArray))
        // s__theMessage("")
    }

    const queryUSDT:any = useQuery({
        queryKey: ['usdt'],
        queryFn: async () => online ? await fetchMultipleJsonArray(tokensReqObj) : DEFAULT_TOKEN,        
    })
    useEffect(()=>{
        console.log(queryUSDT.data)
    },[queryUSDT])
    const API_BASEURL = "https://api.binance.com/api/v3/ticker/price?symbol="
    const DEFAULT_TOKENS_ARRAY = ["btc","eth"]
    const baseToken = "usdt"
    const tokensReqObj:any = (
        DEFAULT_TOKENS_ARRAY.reduce((acc, aToken) => (
            { ...acc, [aToken]: [`${API_BASEURL}${(aToken+baseToken).toUpperCase()}`] }
        ), {})
    )
    console.log(tokensReqObj)
    const online = true
    const DEFAULT_TOKEN = {}

    return (
    <div className="body pos-rel flex-col flex-justify-start">
        <div className="bg-glass-6  pos-abs bord-r-10 tx-white py-100 z-999 fade-in w-1080px noverflow flex flex-between"
            style={{
                transform:"translateY(200px)", border:"1px solid #777",
                boxShadow:"0 10px 50px -20px #00000077"
            }}
        >
            <div className=" flex-col w-100 ">
                
                {DEFAULT_TOKENS_ARRAY.map((aToken,index)=>{
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
                        {tokensArray[aToken] &&
                            <div className="flex-center">
                                <div className="opaci-chov--50 bg-w-opaci-90  tx-black px-3 py-1 bord-r-15 mx-1">State: {tokensArray[aToken].order}</div>
                                <div className="opaci-chov--50 bg-w-opaci-50  px-3 py-1 bord-r-15 mx-1">First: {tokensArray[aToken].half}</div>
                                <div className="opaci-chov--50 bg-w-opaci-20  px-3 py-1 bord-r-15 mx-1">Second: {tokensArray[aToken].full}</div>
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
                            <div className="tx-bold flex-center px-8 invert" onClick={()=>{joinToken(aToken)}} >
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

        {/* Images will go here */}
        <div className="flex-col flex-justify-center huerotate-1  tx-white" >
            <div className="w-700px spin-120 " >
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"  style={{transform:"translate(0,-33%)"}}>
                      <path  fill="#CF5894"
                          d={
"M44.8,-72.3C56.8,-70.6,64.5,-56.1,70.7,-41.9C76.9,-27.8,81.7,-13.9,81.3,"+
"-0.2C80.9,13.4,75.3,26.9,64.3,32.7C53.3,38.5,36.8,36.8,25.1,41.5C13.5,46.2,6.8,57.4,-2.7,"+
"62C-12.1,66.6,-24.2,64.7,-35.6,59.9C-47,55,-57.7,47.3,-58.5,36.8C-59.3,26.4,-50.2,13.2,-50.3,-0.1C-50.4,-13.3,-59.7,-26.6,-58,"+
"-35.4C-56.2,-44.2,-43.4,-48.6,-31.9,-50.6C-20.4,-52.5,-10.2,-52.1,3.1,-57.5C16.4,-62.8,32.7,-74,44.8,-72.3Z"
                          }
                          transform="translate(100 100)"
                          />
                </svg>
            </div>






            <div className="my-200"></div>
            <div className="w-100 ">
                <div className=" w-700px pos-abs z-100 opaci-25 " style={{ transform:"translate(-30%,-30%)",filter: "blur(50px) brightness(180%)" }}>
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                          <path fill="#CF5894" d="M40.8,-56.9C54.5,-54.6,68.6,-46.2,78.1,-33.3C87.7,-20.5,92.8,-3.2,89.7,12.3C86.6,27.9,75.3,41.7,61.6,48.2C47.9,54.7,31.8,54,18.4,53.9C5.1,53.8,-5.5,54.3,-13.8,50.3C-22,46.3,-27.9,37.8,-37.4,30.4C-46.8,23,-59.9,16.8,-66.7,6.2C-73.5,-4.4,-74.1,-19.3,-64.8,-25.4C-55.5,-31.6,-36.2,-29,-23.8,-31.9C-11.3,-34.7,-5.7,-43.1,3.9,-49.2C13.5,-55.3,27,-59.1,40.8,-56.9Z" transform="translate(100 100)" />
                    </svg>
                </div>
            </div>
        </div>

        <div className="mt-200 pt-200"></div>




    </div>
    )
}

function HrH() {
    return (
        <hr/>
    )
}
export default () => {
    return (
    <div className="">
        <Dashboard  />
    </div>
    )
}
