export async function fetchJsonArray(theUrl, propName = "") {
    let theRequest = await fetch(theUrl);
    let headerCType = theRequest.headers.get("content-type");
    let theResult = headerCType && headerCType.includes("application/json") ? await theRequest.json() : []
    let theParsedResult = propName == "" ? theResult : theResult[propName]
    return theParsedResult
}