import { useEffect, useMemo } from "react"

export const ChartMiddleLine = ({klinesArray}:{klinesArray:any[]})=>{
    return (
    <div>
        {klinesArray.map && klinesArray.map((aKline:any,index:any) => {
            return (
            <div key={index}
                className="  block pos-abs"
                style={{
                    width: "2px",
                    height: "2px",
                    left: `${index/500*100}%`,
                    background: `rgba(${index/2},99,99,0.3)`,
                    top:`
                    ${50}%
                    `,
                }}
                >
            </div>
            )
        })}
    </div>
    )
}
export const ChartSinLine = ({
    klinesArray,wavelength,chopAmount
}:{klinesArray:any[],wavelength:number,chopAmount:number})=>{
    return (
    <div>
    {klinesArray.map((aKline:any,index:any) => {
        return (
        <div key={index}
            className="  block pos-abs"
            style={{
                width: "2px",
                height: "2px",
                left: `${index/500*100}%`,
                background: `rgba(${(-200+index)},127,${(100-index)},0.8)`,
                top:(
                `
                    ${50+ (Math.sin((index/wavelength*10) + (Math.sin(((index)/wavelength)*1)) )*33)  }%
                `
                ),
            }}
            >
        </div>
        )
    })}
    </div>
    )
}
// ${50+ (Math.sin(index/wavelength + Math.sin((index)/wavelength)*20 )*(50*(index/500)))  }%
export const ChartSinLine2 = ({
    klinesArray,wavelength,chopAmount
}:{klinesArray:any[],wavelength:number,chopAmount:number})=>{
    return (
    <div>
    {klinesArray.map((aKline:any,index:any) => {
        return (
        <div key={index}
            className="  block pos-abs"
            style={{
                width: "2px",
                height: "2px",
                left: `${index/500*100}%`,
                background: `rgba(${(-200+index)},127,${(100-index)},0.8)`,
                top:(
                wavelength < 400 ? 
                `
                    ${90-(index/10)+ (Math.sin(index/wavelength + Math.sin((index)/wavelength)*20 )*(50*(index/500)))  }%
                `
                :
                `
                    ${10+(index/10)+ (Math.sin(index/wavelength + Math.sin((index)/wavelength)*20 )*(40*(index/500)))  }%
                `
                ),
            }}
            >
        </div>
        )
    })}
    </div>
    )
}
export const ChartLowerLastLine = ({
    klinesArray,klinesStats,
    tokenConfig
}:{tokenConfig:any,klinesArray:any[],klinesStats:any})=>{
    return (
    <div>
        {klinesArray.map((_aKline:any,index:any) => {
        let aKline = klinesArray[499]
        if (aKline[3] > klinesStats.max) return <div key={index}></div>
        return (
            <div key={index}
                className=" block pos-abs "
                style={{
                    width: "10px",
                    height: aKline[3] < klinesStats.min ? "4px" : "2px",
                    left: `${(Math.floor(index/45)*9) }%`,
                    // background: `rgba(${index/2},99,99,0.3)`,
                    background: `#33000077`,
                    bottom:`
                    ${parseInt(`
                        ${aKline[3] < klinesStats.min ? 0 : ((
                            (parseFloat(aKline[3])-(klinesStats.min))
                            /
                            (klinesStats.max-(klinesStats.min))
                        )*100)}
                        `)}%
                        `,
                }}
            >
            </div>
            )
        })}
    </div>
    )
}

export const ChartLowerLine = ({
    klinesArray,klinesStats,
    tokenConfig
}:{tokenConfig:any,klinesArray:any[],klinesStats:any})=>{
    return (
    <div>
        {klinesArray.map((aKline:any,index:any) => {
        if (aKline[3] > klinesStats.max) return <div key={index}></div>
        return (
            <div key={index}
                className=" block pos-abs "
                style={{
                    width: "2px",
                    height: aKline[3] < klinesStats.min ? "4px" : "2px",
                    left: `${(index/500*100) }%`,
                    background: aKline[3] < klinesStats.min ? `#ffaa00` : `#ff000099`,
                    bottom:`
                    ${parseInt(`
                        ${aKline[3] < klinesStats.min ? 0 : ((
                            (parseFloat(aKline[3])-(klinesStats.min))
                            /
                            (klinesStats.max-(klinesStats.min))
                        )*100)}
                        `)}%
                        `,
                }}
            >
            </div>
            )
        })}
    </div>
    )
}
export const ChartHigherLastLine = ({
    klinesArray,klinesStats,
    tokenConfig
}:{tokenConfig:any,klinesArray:any[],klinesStats:any})=>{
    return (
    <div>
        {klinesArray.map((_aKline:any,index:any) => {
        // if (parseFloat(aKline[2]) > tokenConfig.ceil) return <div key={index}></div>
        let aKline = klinesArray[499]
        if (aKline[2] < klinesStats.min) return <div key={index}></div>
        return (
            <div key={index}
                className="  block pos-abs"
                style={{
                    width: "10px",
                    height: aKline[2] > klinesStats.max ? "3px" : "2px",
                    left: `${3+(Math.floor(index/26)*5) }%`,
                    background:`#00880077`,
                    bottom:`
                    ${parseInt(`
                        ${aKline[2] > klinesStats.max ? 99 : ((
                            (parseFloat(aKline[2])-(klinesStats.min))
                            /
                            (klinesStats.max-(klinesStats.min))
                        )*100)}
                        `)}%
                    `,
                }}
            >
            </div>
            )
        })}
    </div>
    )
}
export const ChartLiveLastLine = ({
    klinesArray,klinesStats,
    tokenConfig, livePrice,
}:{tokenConfig:any,klinesArray:any[],klinesStats:any,livePrice:any})=>{
    return (
    <div>
        {klinesArray.map((_aKline:any,index:any) => {
        // if (parseFloat(aKline[2]) > tokenConfig.ceil) return <div key={index}></div>
        let aKline = klinesArray[499]
        if (livePrice < klinesStats.min || livePrice > klinesStats.max) return <div key={index}></div>
        return (
            <div key={index}
                className="  block pos-abs"
                style={{
                    width: "20px",
                    height: livePrice > klinesStats.max ? "3px" : "2px",
                    left: `${6+(Math.floor(index/100)*22) }%`,
                    background:`#ffffff`,
                    bottom:`
                    ${parseInt(`
                        ${livePrice > klinesStats.max ? 99 : ((
                            (parseFloat(livePrice)-(klinesStats.min))
                            /
                            (klinesStats.max-(klinesStats.min))
                        )*100)}
                        `)}%
                    `,
                }}
            >
            </div>
            )
        })}
    </div>
    )
}
export const ChartHigherLine = ({
    klinesArray,klinesStats,
    tokenConfig
}:{tokenConfig:any,klinesArray:any[],klinesStats:any})=>{
    return (
    <div>
        {klinesArray.map((aKline:any,index:any) => {
        // if (parseFloat(aKline[2]) > tokenConfig.ceil) return <div key={index}></div>
        if (aKline[2] < klinesStats.min) return <div key={index}></div>
        return (
            <div key={index}
                className="  block pos-abs"
                style={{
                    width: "2px",
                    height: aKline[2] > klinesStats.max ? "3px" : "2px",
                    left: `${index/500*100}%`,
                    background:aKline[2] > klinesStats.max ? `#77ff00` : `#77ff0066`,
                    bottom:`
                    ${parseInt(`
                        ${aKline[2] > klinesStats.max ? 99 : ((
                            (parseFloat(aKline[2])-(klinesStats.min))
                            /
                            (klinesStats.max-(klinesStats.min))
                        )*100)}
                        `)}%
                    `,
                }}
            >
            </div>
            )
        })}
    </div>
    )
}

export const ChartTopBottomLine = ({klinesArray}:{klinesArray:any[]})=>{
    return (
    <div>
    {klinesArray.map((aKline:any,index:any) => {
        return (
        <div key={index}
            className="  block pos-abs"
            style={{
                    width: "2px",
                    height: "2px",
                    left: `${index/500*100}%`,
                    background: `rgba(${index/2},99,99,0.3)`,
                    top:`
                    ${Math.sin(index) > 0 ? 25 : 75}%
                    `,
                }}
            >
        </div>
        )
    })}
    </div>
    )
}