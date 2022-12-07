export const firstUpperCase = (theString) =>
{
    return theString.charAt(0).toUpperCase() + theString.slice(1)
}
export const jsonStrSingleQt = (theObj) =>
{
    return JSON.stringify(theObj).replace(/"([^"]+)":/g, '$1:').replaceAll("\"", "'")
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