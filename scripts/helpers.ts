
export async function fetchMultipleJsonArray(requestsObj:any) {
    let reqKeys =  Object.keys(requestsObj)
    let requests =  Object.keys(requestsObj).map((reqKey) => {
        console.log("requestsObj[reqKey][0]", requestsObj[reqKey][0])
        return fetch(requestsObj[reqKey][0])
    })
    return Promise.all(requests).then((responsesArray) => {
        return Promise.all(reqKeys.map((r,index) => responsesArray[index].json()))
    })
}

export const parseDecimals = (x:number) => {
    if (x == 0) return 0
    if (x < 0.000001)
    {
      return 0
    }
    if (x < 0.00001)
    {
      console.log("*number* TOO LOW", x)
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
