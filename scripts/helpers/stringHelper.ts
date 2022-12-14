export const isValidImgExt = (theType, theExt) => {
    return ["JPG","JPEG","PNG","GIF"].indexOf(theType.toUpperCase()) != -1 && [".JPG",".JPEG",".PNG",".GIF"].indexOf(theExt.toUpperCase()) != -1
}
// export const incInLowerCase = (subString,theString) => {
//     return (`${subString}`.toLowerCase() === theString.toLowerCase())
// }
export const isEqInLowerCase = (subString,theString) => {
    return (`${subString}`.toLowerCase() === `${theString}`.toLowerCase())
}
export const isStrInteger = (value) => {
  return /^\d+$/.test(value);
}
export const firstUpperCase = (theString) =>
{
    return theString.charAt(0).toUpperCase() + theString.slice(1)
}

// inspired by clsx built by gugaguichard
export type JSS = (...a: Array<undefined | null | string | boolean>) => string
export const jss: JSS = (...args) =>
  args
    .flat()
    .filter(x => 
        x !== null && x !== undefined && typeof x !== 'boolean'
    ).join(' ')


export const jssWSwitch = (ref, sequence, widths) =>
{
    let arrayOfArgs: string[] = []
    const length = sequence.length
    const widthsLength = widths.length
    for (var i = 0; i < length; ++i)
    {
        if (ref == sequence[i]) arrayOfArgs.push(` w-max-${widths[i]}px `)
    }
    return jss(...arrayOfArgs)
}
