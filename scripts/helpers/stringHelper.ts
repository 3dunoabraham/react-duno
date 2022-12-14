import { API_FILE_UPLOAD_BASE, STATIC_IMAGE_BASE } from '@/scripts/api/constants'

export const parseImgArrayStrQtless = (theString) => {
    return theString.split(",").map((fileName)=>{
        // console.log(fileName)
        return STATIC_IMAGE_BASE+fileName.replace("[","").replace("]","").trim()
        let newSavedImage = {
            size:0,
            name:STATIC_IMAGE_BASE+fileName.replace("[","").replace("]","").trim(),
            lastModified:"",
            type:"",
            // name
        }
    })
}
export const parseFileExt = (theString) => {
    return theString.match(/\.[0-9a-z]+$/i)[0]
}
export const parseFileType = (theString) => {
    return theString.replace(/(.*)\//g, '')
}
export const isValidImgExt = (theType, theExt) => {
    return ["JPG","JPEG","PNG","GIF"].indexOf(theType.toUpperCase()) != -1 && [".JPG",".JPEG",".PNG",".GIF"].indexOf(theExt.toUpperCase()) != -1
}
// export const incInLowerCase = (subString,theString) => {
//     return (`${subString}`.toLowerCase() === theString.toLowerCase())
// }
export const isEqInLowerCase = (subString,theString) => {
    return (`${subString}`.toLowerCase() === `${theString}`.toLowerCase())
}
export const readableSize = (fileSize) => {
    if(fileSize.length < 7) return `${Math.round(+fileSize/1024).toFixed(2)} KB`
    return `${(Math.round(+fileSize/1024)/1000).toFixed(2)} MB`
}
export const isStrInteger = (value) => {
  return /^\d+$/.test(value);
}
export const firstUpperCase = (theString) =>
{
    return theString.charAt(0).toUpperCase() + theString.slice(1)
}
export const parseStrSingleQt = (theObj) =>
{
    return JSON.stringify(theObj).replace(/"([^"]+)":/g, '$1:').replaceAll("\"", "'")
}
export const parseJsonSingleQt = (fullNameJson:string) => {
    // console.log("fullNameJson")
    // console.log(fullNameJson)
    // console.log(fullNameJson.replace(/'/g, '"'))
    return JSON.parse(fullNameJson.replace(/'/g, '"'))
}
export const parseJsonSingleQtFixNone = (fullNameJson:string) => {
    // console.log("fullNameJson")
    let theReplacedString = fullNameJson.replace(/'/g, '"').replace('None','"None"')
    // console.log(fullNameJson,theReplacedString)
    return JSON.parse(theReplacedString)
}
// inspired by clsx built by gugaguichard
export type Cx = (...a: Array<undefined | null | string | boolean>) => string
export const cx: Cx = (...args) =>
  args
    .flat()
    .filter(x => 
        x !== null && x !== undefined && typeof x !== 'boolean'
    ).join(' ')


export const cxWSwitch = (ref, sequence, widths) =>
{
    let arrayOfArgs: string[] = []
    const length = sequence.length
    const widthsLength = widths.length
    for (var i = 0; i < length; ++i)
    {
        if (ref == sequence[i]) arrayOfArgs.push(` w-max-${widths[i]}px `)
    }
    return cx(...arrayOfArgs)
}

export const sortUIDAsc = (a, b) => {
    let parseIntUIDItemA = parseInt(a.uid.replace("-",""))
    let parseIntUIDItemB = parseInt(b.uid.replace("-",""))
    return  parseIntUIDItemA - parseIntUIDItemB;
}
export const sortUIDDesc = (a, b) => {
    let parseIntUIDItemA = parseInt(a.uid.replace("-",""))
    let parseIntUIDItemB = parseInt(b.uid.replace("-",""))
    return  parseIntUIDItemB - parseIntUIDItemA;
}