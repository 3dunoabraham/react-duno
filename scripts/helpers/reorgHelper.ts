export const parseFullNameJson = (fullNameJson:string) => {
	if (fullNameJson == "None") return fullNameJson
	// console.log("parsingggggggggggggggggggg", fullNameJson)
	const theObj = JSON.parse(fullNameJson.replace(/'/g, '"'))
	return fullNameJson == "None" ? fullNameJson : `${theObj.first_name} ${theObj.last_name}`
}