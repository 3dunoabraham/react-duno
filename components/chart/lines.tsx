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
export const ChartLowerLine = ({
    klinesArray,klinesStats
}:{klinesArray:any[],klinesStats:any})=>{
    return (
    <div>
        {klinesArray.map((aKline:any,index:any) => {
        return (
            <div key={index}
                className=" block pos-abs "
                style={{
                    width: "2px",
                    height: "1px",
                    left: `${(index/500*100) }%`,
                    background:`#ff0000`,
                    bottom:`
                    ${parseInt(`
                    ${(
                        (parseFloat(aKline[3])-klinesStats.min)
                        /
                        (klinesStats.range)
                        )*100}
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
    klinesArray,klinesStats
}:{klinesArray:any[],klinesStats:any})=>{
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
                    background:`#00ff0077`,
                    bottom:`
                    ${parseInt(`
                        ${(
                            (parseFloat(aKline[2])-klinesStats.min)
                            /
                            (klinesStats.range)
                            )*100}
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