
export const validateBigint = (newVal,prevVal,max) =>
{
    return newVal.substring(0, max).replace(/[^\d]/g, "")
}
export const validateStringLength = (newVal,prevVal,max) =>
{
    return newVal.substring(0, max)
}

export const validateInteger = (newVal,prevVal,min,max) =>
{
    if (newVal === "") return ""
    if (isNaN(newVal) || !parseInt(newVal)) return prevVal
    let parsed = parseInt(newVal)
    if (parsed > max) return max
    if (parsed < min) return min
    return parsed
}

export const validateFloat = (newVal,prevVal,max,decimals=2) =>
{
    if (newVal == "") return ""
    if (newVal == ".") return "."
    const lastChar = newVal.charAt(newVal.length-1)
    if (lastChar == ".")
    {
        if (isNaN(newVal.slice(0, -1))) return prevVal
        return `${parseInt(newVal.slice(0, -1))}.`
    }
    if (isNaN(newVal)) return prevVal

    const theLastChar = newVal.charAt(newVal.length-1)
    if (theLastChar == "0")
    {
        if (getOcurrences(newVal,"0") == newVal.length) return "0"

        let splittedParts = newVal.split(".")
        if (splittedParts.length > 1 && `${splittedParts[1]}`.length > decimals)
        {
            return `${splittedParts[0]}.${splittedParts[1].substring(0,decimals)}`
        }

        if (parseFloat(newVal) > max) { return max } else { return newVal }
    }

    let parsed = parseFloat(newVal) % 1 != 0 ?
                    parseFloat(parseFloat(newVal).toFixed(decimals+1).slice(0, -1)) :
                    parseFloat(newVal)
    parsed = Math.abs(parsed)
    if (parsed > max) return max
    return parsed
}

export const getOcurrences = (temp,match) =>
{
    var regex = new RegExp( match, 'g' );
    return (temp.match(regex) || []).length
}