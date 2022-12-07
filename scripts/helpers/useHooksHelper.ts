import { useState, useEffect, useMemo } from 'react';
import { useMap, MapOrEntries } from 'usehooks-ts';



export const useObjMap = (theObj) =>
{
    const mapArray:MapOrEntries<string, any> = useMemo(() => {
        // if (!theObj || !Object.keys(theObj).length) return []
        return Object.keys(theObj).map((item) => [item, theObj[item]])
    }, [theObj]);
    const theMap = useMap(mapArray);

    return theMap;
}
export const useArrayMap = (objArray,propKey) =>
{
    const mapArray = useMemo(() => {
        return !objArray ? [] :
            objArray.map(theObject => {return [`${theObject[propKey]}`, theObject]; }) } , [objArray]);
    const useHooksMap = useMap<string, any>(mapArray)

    return useHooksMap;
}
export const useArrayMapPlus = (objArray,propKey,theValue,valueKey) =>
{
    const mapArray = useMemo(() => {
        return !objArray ? [] :
            objArray.map(theObject => {return [`${theObject[propKey]}`, theObject]; }) } , [objArray]);
    const useHooksMap = useMap<string, any>(mapArray)

    const theObject = useMemo(() => { /*console.log(objArray,propKey,theValue,valueKey);*/
        return ((!objArray && !objArray.length) || !theValue) ? null : 
            objArray.filter(object => {return object[valueKey] == theValue; })[0]
    } , [objArray,theValue]);

    return [...useHooksMap,theObject];
}