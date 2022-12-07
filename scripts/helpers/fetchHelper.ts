export async function fetchJsonArray(theUrl) {
    let theRequest = await fetch(theUrl);
    let headerCType = theRequest.headers.get("content-type");
    return headerCType && headerCType.includes("application/json") ? await theRequest.json() : []
}