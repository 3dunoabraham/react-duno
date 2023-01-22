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
    klinesArray,wavelength
}:{klinesArray:any[],wavelength:number})=>{
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
                background: `rgba(${(500-index)/2},99,99,0.3)`,
                top:`
                ${50+ (Math.sin(index/wavelength + Math.sin(index/wavelength)*10 )*40)  }%
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
    klinesArray,klinesStats
}:{klinesArray:any[],klinesStats:any})=>{
    return (
    <div>
        {klinesArray.map((aKline:any,index:any) => {
        return (
            <div key={index}
                className=" _ddr block pos-abs "
                style={{
                    width: "2px",
                    height: "1px",
                    left: `${index/500*100}%`,
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
                className=" _ddg block pos-abs"
                style={{
                    width: "2px",
                    height: "2px",
                    left: `${index/500*100}%`,
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