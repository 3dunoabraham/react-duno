

export const getComputedLevels = (config)=> {
        
  let minMaxAvg = (parseFloat(config.ceil)+parseFloat(config.floor))/2
  let minMedian = (parseFloat(config.floor)+parseFloat(`${minMaxAvg}`))/2
  let maxMedian = (parseFloat(config.ceil)+parseFloat(`${minMaxAvg}`))/2

  let theLevels = {
      min: parseFloat(`${parseDecimals(config.floor)}`),
      minMedian: parseFloat(`${parseDecimals(minMedian)}`),
      minMaxAvg: parseFloat(`${parseDecimals(minMaxAvg)}`),
      maxMedian: parseFloat(`${parseDecimals(maxMedian)}`),
      max: parseFloat(`${parseDecimals(config.ceil)}`),
  }

  return theLevels
}

export const getStrategyResult = (tokenConfig:any, livePrice:number) => {
    let {floor, ceil, state, buy, minMaxAvg, minMedian, maxMedian, sell, min, max} = tokenConfig
    if (!state) return 0
    let soldAll = sell == 2
    let hasntSoldEverything = sell < 2
    let onlySoldOnce = sell == 1
    let hasntSoldAnything = sell == 0
    let soldSomething = sell > 0

    let hasntBoughtEverything = buy < 2
    let hasntBoughtAnything = buy == 0
    let boughtOnce = buy == 1
    let boughtAll = buy == 2
    let boughtSomething = buy > 0
    // console.log(livePrice,minMaxAvg)

    // if (livePrice > max) {
    //   if (hasntSoldEverything) return -2
    // }
    if (livePrice > maxMedian) {
      if (boughtSomething && hasntSoldEverything) return -2
    }
    if (livePrice > minMaxAvg) {
      if (boughtSomething && hasntSoldAnything) return -1
    }
    if (livePrice < minMaxAvg) { 
      if (hasntBoughtAnything) return 1
    }
    if (livePrice < minMedian) {
      if (hasntBoughtEverything) return 2
    }
    
    return 0
    // let returnAmount = 0
    // console.log(livePrice , tokenConfig.max)
    // return livePrice > tokenConfig.max ? -2 : 0
    
    if (livePrice < tokenConfig.minMedian)
    {
      if (hasntBoughtAnything) return 2
      if (boughtOnce) return 1
    }
    
    if (livePrice > tokenConfig.minMedian && livePrice < tokenConfig.minMaxAvg)
    {
    }

    if (livePrice > tokenConfig.minMaxAvg && livePrice < tokenConfig.maxMedian)
    {
      if (boughtSomething) return -1
    }

    if (livePrice > tokenConfig.maxMedian)
    {
      if (onlySoldOnce) return -1
    }
    if (livePrice > tokenConfig.max)
    {
      if (boughtAll && hasntSold) return -2
    }

    // return returnAmount
}  
export async function fetchJsonArray(theUrl:any, propName = "") {
  try {
      let theRequest = await fetch(theUrl);
      let headerCType = theRequest.headers.get("content-type");
      let theResult = headerCType && headerCType.includes("application/json") ? await theRequest.json() : []
      let theParsedResult = propName == "" ? theResult : theResult[propName]
      return theParsedResult
  } catch (err) {
      return []
  }
}
export async function fetchMultipleJsonArray(requestsObj:any) {
    let reqKeys =  Object.keys(requestsObj)
    let requests =  Object.keys(requestsObj).map((reqKey) => {
        // console.log("requestsObj[reqKey][0]", requestsObj[reqKey][0])
        return fetch(requestsObj[reqKey][0])
    })
    return Promise.all(requests).then((responsesArray) => {
        return Promise.all(reqKeys.map((r,index) => responsesArray[index].json()))
    })
}

export const parseDecimals = (x:number) => {
  x = parseFloat(`${x}`)
    if (x == 0) return 0
    if (x < 0.000001)
    {
      return 0
    }
    if (x < 0.00001)
    {
      // console.log("*number* TOO LOW", x)
      return x.toFixed(8)
    }
    if (x < 0.0001)
    {
      return x.toFixed(7)
    }
    if (x < 0.001)
    {
      return x.toFixed(6)
    }
    if (x < 0.01)
    {
      return x.toFixed(5)
    }
    if (x < 0.1)
    {
      return x.toFixed(4)
    }
    if (x < 1)
    {
      return x.toFixed(3)
    }
    if (x < 50)
    {
      return x.toFixed(2)
    }
    if (x < 100)
    {
      return x.toFixed(1)
    }
    return parseInt(`${x}`)
  };



  export const zeroPad = (value, length) => {
    return `${value}`.padStart(length, '0');
}
const THE_DATE_NOW = new Date()
export const tenYearsAgoDateString = (
    `${THE_DATE_NOW.getUTCFullYear()-10}`+
    `-${zeroPad(THE_DATE_NOW.getUTCMonth()+1,2)}-${zeroPad(THE_DATE_NOW.getUTCDate(),2)}`
)
export const tenYearsFutureDateString = (
    `${THE_DATE_NOW.getUTCFullYear()+10}`+
    `-${zeroPad(THE_DATE_NOW.getUTCMonth()+1,2)}-${zeroPad(THE_DATE_NOW.getUTCDate(),2)}`
)

export const parseUTCString = (_theDate) => {
    let theDate = new Date(_theDate.toUTCString())
    return (
        `${theDate.getUTCFullYear()}-${zeroPad(theDate.getUTCMonth()+1,2)}-`+
        `${zeroPad(theDate.getUTCDate(),2)}`+
        `T`+
        `${zeroPad(theDate.getUTCHours(),2)}:${zeroPad(theDate.getUTCMinutes(),2)}`
    )
}
export const parseUTCDateString = (_theDate) => {
    let theDate = new Date(_theDate.toUTCString())
    return (
        `${theDate.getUTCFullYear()}-${zeroPad(theDate.getUTCMonth()+1,2)}-`+
        `${zeroPad(theDate.getUTCDate(),2)}`
    )
}
export const timeDifference = (date1,date2) => {
  var difference = parseInt(date1) - parseInt(date2);
  // console.log("difference", difference)
  var weeksDifference = Math.floor(difference/1000/60/60/24/7);
  difference -= weeksDifference*1000*60*60*24*7

  var daysDifference = Math.floor(difference/1000/60/60/24);
  difference -= daysDifference*1000*60*60*24

  var hoursDifference = Math.floor(difference/1000/60/60);
  difference -= hoursDifference*1000*60*60

  var minutesDifference = Math.floor(difference/1000/60);
  difference -= minutesDifference*1000*60

  var secondsDifference = Math.floor(difference/1000);

  return(
    (!weeksDifference?"": weeksDifference + 'w ' )+
    (!daysDifference?"": daysDifference + 'd ' )+
    (!hoursDifference?"": hoursDifference + 'h ' )+
    (!minutesDifference?"": minutesDifference + 'm ' )+
    (!secondsDifference?"": secondsDifference + 's ' )
  )
}