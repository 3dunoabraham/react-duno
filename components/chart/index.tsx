import { DEFAULT_TIMEFRAME_ARRAY, DEFAULT_TOKENS_ARRAY } from "../../scripts/constants";
import { parseDecimals } from "../../scripts/helpers";
import { ChartHigherLastLine, ChartHigherLine, ChartLiveLastLine, ChartLowerLastLine, ChartLowerLine,
ChartMiddleLine, ChartTopBottomLine } from "./lines";


export default function Component({
    klinesStats, klinesArray, p__klinesArray, tokensArrayObj, cryptoToken, timeframe, queryUSDT
}) {
    return (<>
        <div
            className="flex pos-rel w-90 box-shadow-5 bg-w-10 hov-bord-1-w autoverflow  my-3 bord-r-8"
            style={{ resize:"both", height:"400px", }}
        >
            
            <div className="pa-1 pos-abs right-0 tx-green bottom-0">{klinesStats.min}</div>
            <div className="pa-1 pos-abs right-0 tx-orange top-50p">{klinesStats.minMaxAvg}</div>
            <div className="pa-1 pos-abs right-0 opaci-50 top-0">{klinesStats.max}</div>
            
            <div className="pa-1 pos-abs right-0 tx-green-25 top-75p">{parseDecimals(klinesStats.minMedian)}</div>
            <div className="pa-1 pos-abs right-0 tx-red top-25p">{parseDecimals(klinesStats.maxMedian)}</div>

            <ChartHigherLine klinesArray={p__klinesArray} klinesStats={klinesStats}
                tokenConfig={tokensArrayObj[cryptoToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)]}
            />
            <ChartLowerLine klinesArray={p__klinesArray} klinesStats={klinesStats}
                tokenConfig={tokensArrayObj[cryptoToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)]}
            />
            <ChartHigherLastLine klinesArray={p__klinesArray} klinesStats={klinesStats}
                tokenConfig={tokensArrayObj[cryptoToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)]}
            />
            <ChartLowerLastLine klinesArray={p__klinesArray} klinesStats={klinesStats}
                tokenConfig={tokensArrayObj[cryptoToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)]}
            />
            <ChartLiveLastLine klinesArray={p__klinesArray} klinesStats={klinesStats}
                livePrice={queryUSDT.data[DEFAULT_TOKENS_ARRAY.indexOf(cryptoToken)].price}

                tokenConfig={tokensArrayObj[cryptoToken][DEFAULT_TIMEFRAME_ARRAY.indexOf(timeframe)]}
            />

            <ChartMiddleLine klinesArray={klinesArray} />
            <ChartTopBottomLine klinesArray={klinesArray} />
            {/* <ChartSinLine chopAmount={chopAmount} klinesArray={klinesArray} wavelength={wavelength} /> */}
                    
        </div>
    </>)
}