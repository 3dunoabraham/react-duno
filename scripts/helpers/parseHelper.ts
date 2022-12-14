import { API_FILE_UPLOAD_BASE, STATIC_IMAGE_BASE } from '@/scripts/api/constants'

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

export const parseFullNameJson = (fullNameJson:string) => {
	if (fullNameJson == "None") return fullNameJson
	// console.log("parsingggggggggggggggggggg", fullNameJson)
	const theObj = JSON.parse(fullNameJson.replace(/'/g, '"'))
	return fullNameJson == "None" ? fullNameJson : `${theObj.first_name} ${theObj.last_name}`
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

export const parseReadableSize = (fileSize) => {
    if(fileSize.length < 7) return `${Math.round(+fileSize/1024).toFixed(2)} KB`
    return `${(Math.round(+fileSize/1024)/1000).toFixed(2)} MB`
}