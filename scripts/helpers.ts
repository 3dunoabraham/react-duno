

export const getComputedLevels = (config)=> {
        
  let minMaxAvg = (parseFloat(config.ceil)+parseFloat(config.floor))/2
  let minMedian = (parseFloat(config.floor)+parseFloat(`${minMaxAvg}`))/2
  let maxMedian = (parseFloat(config.ceil)+parseFloat(`${minMaxAvg}`))/2

  let theLevels = {
      min: parseFloat(`${parseDecimals(config.floor)}`),
      max: parseFloat(`${parseDecimals(config.ceil)}`),
      minMedian: parseFloat(`${parseDecimals(minMedian)}`),
      maxMedian: parseFloat(`${parseDecimals(maxMedian)}`),
      minMaxAvg: parseFloat(`${parseDecimals(minMaxAvg)}`),
  }

  return theLevels
}

export const getStrategyResult = (tokenConfig:any, livePrice:number) => {
    let {floor, ceil, state, buy, minMaxAvg, minMedian, maxMedian, sell, min, max} = tokenConfig
    if (!state) return 0

    let isEmpty = buy == 0
    let isWith = buy > 0
    let isHalf = buy == 1
    let isfull = buy == 2
    if (livePrice > maxMedian) {
      if (isWith) return -2
    }
    if (livePrice > minMaxAvg) {
      if (isWith) return -1
    }
    // console.log(livePrice , minMedian)
    if (livePrice < minMedian) {
      if (isEmpty) return 1
    }
    if (livePrice < min) {
      if (isEmpty) return 1
      if (isHalf) return 2
    }

    return 0
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