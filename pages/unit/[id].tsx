// import { dd, dlog, isDevEnvironment } from '@/scripts/helpers/devHelper';
import Head from 'next/head'
import { useEffectOnce, useMap } from 'usehooks-ts'
import { useRouter } from 'next/router'
import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'


import { DEFAULT_STATE_ARRAY } from '@/scripts/api/states';
import { API_UNIT_OPTS_BASE, API_ADDRESSES } from '@/scripts/api/constants';
import { parseFullNameJson } from '@/scripts/helpers/reorgHelper';
import { fetchJsonArray } from '@/scripts/helpers/fetchHelper';
import { IUnit, IUnitModelStyle } from '@/scripts/types/unit'
import { DEFAULT_UNIT, DEFAULT_MODEL_STYLE_OBJARRAY /*, DEFAULT_TITLE_STATE_OBJARRAY */ } from '@/scripts/types/unit/constants'
import { UnitFormComponent } from '@/components/templates/forms/Unit'
import { BreadCrumbs } from '@/components/atoms/BreadCrumbs'
import { ErrorBlock } from '@/components/organisms/Unit/ErrorBlock'
// ReactFunctionPageComponent
export default function UnitPage({
    online,
    optMapObj,
    fetchedUnit,
    orgsList,
    customerList,
    contentType,
}) {
    useEffectOnce(() => {
        if (fetchedUnit) __set_currentId(fetchedUnit.uid)
        __set_defaultQueriedUnit( {...DEFAULT_UNIT, ...queriedUnit.data[0],...{
            investors: {
                current_investor: queriedUnit.data[0] && queriedUnit.data[0].current_investor,
                previous_investor: queriedUnit.data[0] && queriedUnit.data[0].previous_investor,
            },
            locations: {
                location: queriedUnit.data[0] && queriedUnit.data[0].location,
                physical_as_of: queriedUnit.data[0] && queriedUnit.data[0].physical_as_of,
                location_related: queriedUnit.data[0] && queriedUnit.data[0].location_related,
            },
        }})
    })

    const didFetchUnit = !!Object.keys(fetchedUnit).length
    const isValidUnit = useMemo(() => fetchedUnit.uid != "0000-0000", [fetchedUnit]);

    const router = useRouter()
    const { id } = router.query
    const [currentId,__set_currentId] = useState(router.query.id)
    const [isLoadingRefetching,__set_isLoadingRefetching] = useState(false)

    const queriedUnit = useQuery({
        queryKey: ['unitData'],
        initialData: fetchedUnit,
        queryFn: async () => {
            __set_isLoadingRefetching(true)
            let jsonRes:any;
            if (online)
            {
                const refetchRes = await fetch(`https://ims.jinaron.com/api/v1/unit/${id}/`)
                jsonRes = await refetchRes.json()
                if (jsonRes && jsonRes.Data)
                {
                    // console.log("parseFullNameJson(jsonRes.Data[0].current_investor)")
                    // console.log(parseFullNameJson(jsonRes.Data[0].current_investor))
                    __set_defaultQueriedUnit( {...DEFAULT_UNIT, ...jsonRes.Data[0],...{
                        investors: {
                            current_investor: parseFullNameJson(jsonRes.Data[0].current_investor),
                            previous_investor: parseFullNameJson(jsonRes.Data[0].previous_investor),
                        },
                        locations: {
                            location: jsonRes.Data[0].location,
                            physical_as_of: jsonRes.Data[0].physical_as_of,
                            location_related: jsonRes.Data[0].location_related,
                        },
                    }})
                }
            }
            __set_isLoadingRefetching(false)
            return jsonRes ? jsonRes.Data : null
        }
    })

    const [defaultQueriedUnit, __set_defaultQueriedUnit] = useState();
    
    if (queriedUnit.isLoading) return 'Loading...'
    if (queriedUnit.error) return ErrorBlock({err:queriedUnit.error})

    return (<>
        <Head> <title>{isValidUnit ?`${id} | IMS` : "Add Unit"}</title> </Head>


        <div className="ims-body">
            <main className="ims-body-inner">
                <BreadCrumbs pages={[["/units","Inventory"],...(isValidUnit ? [["/units","Browse"]] : [])]}
                    current={isValidUnit ? `Detail` : "Add Unit"}
                />
                <div className="show-xs_sm my-2 invisible block">.</div>
                {defaultQueriedUnit && <>
                    {didFetchUnit &&
                        <UnitFormComponent refetch={queriedUnit.refetch} peoplesObj={{investorList:optMapObj.investorList,customerList:optMapObj.customerList}}
                            unit={defaultQueriedUnit} orgsList={orgsList} optMapObj={optMapObj} 
                        />
                    }
                </>}
                {!didFetchUnit && <>
                    <div className="w-100 flex-col flex-center">
                        <ErrorBlock />
                    </div>
                </>}
            </main>
        </div>


    </>)
}



const DEFAULT_RESPONSE = {
    fetchedUnit: null,
    model_styles: DEFAULT_MODEL_STYLE_OBJARRAY, ttypes: [], statuses: [], title_statuses: [], title_states:DEFAULT_STATE_ARRAY, conditions: [], investorList: [],
    orgsList: [], manufacturers: [], dealers: [], distributors: [], owners: [], customerList: [], stateCountyCity: [], addressesList: [],
}

function parseOrgTypeList(type, _orgsList, DEFAULT_ORG_TYPE_LIST) {
    if (type == "owner")
    {
        return _orgsList.filter((item,index)=> {return parseInt(item.type) <= 6 })
    }
    let orgTypeId  = DEFAULT_ORG_TYPE_LIST.filter(orgOptType=>orgOptType.label == type)
    if (!orgTypeId.length) return []
    let returnList = _orgsList.filter((item,index)=> {
        return item.type == orgTypeId[0].id
    })
    return returnList
}
async function fetchPeopleList(baseUrl, typename) {
    let theRequest = await fetch(baseUrl+`${typename}/`);
    let headerCType = theRequest.headers.get("content-type");
    return headerCType && headerCType.includes("application/json") ? await theRequest.json() : []
}
async function fetchOptList(baseUrl, typename) {
    let theRequest = await fetch(baseUrl+`${typename}/`);
    let headerCType = theRequest.headers.get("content-type");
    return headerCType && headerCType.includes("application/json") ? await theRequest.json() : []
}

async function fetchPageData(params,query) {
    // const baseOptsUrl = "https://ims.jinaron.com/api/v1/units/opt/"
    const baseOrgsUrl = "https://ims.jinaron.com/api/v1/orgs/"
    const baseOrgTypesUrl = "https://ims.jinaron.com/api/v1/orgs/opt/types/"
    const baseCustomerUrl = "https://ims.jinaron.com/api/v1/people/customers/"
    const basePeopleUrl = "https://ims.jinaron.com/api/v1/people/"
    try {
        let req_unit = await fetch(`https://ims.jinaron.com/api/v1/unit/${params.id}/`);
        let req_unit_head = req_unit.headers.get("content-type");
        let aFetchedUnit = req_unit_head && req_unit_head.includes("application/json") ? ((await req_unit.json()).Data) : {}
        // aFetchedUnit
        if (aFetchedUnit[0] && Object.keys(aFetchedUnit[0]).length)
        {
            aFetchedUnit[0].investors = {
                current_investor: "asd",
                previous_investor: "qwe",
            }
            aFetchedUnit[0].locations = {
                location: "zxc",
                physical_as_of: "dfg",
                location_related: "dfg",
            }
        }

        let stateCountyCity = []

        let modelstylesTypeList = (await fetchOptList(API_UNIT_OPTS_BASE, "model_styles"))["Model Styles"]
        // console.log("modelstylesTypeList modelstylesTypeList modelstylesTypeList",modelstylesTypeList)
        let typesTypeList = await fetchOptList(API_UNIT_OPTS_BASE, "types")
        let statusesTypeList = await fetchOptList(API_UNIT_OPTS_BASE, "statuses")
        let titleStatusesTypeList = await fetchOptList(API_UNIT_OPTS_BASE, "title_statuses")
        // let titleStates = null
        let titleStates = await fetchOptList(API_UNIT_OPTS_BASE, "title_states")
        let conditionsTypeList = await fetchOptList(API_UNIT_OPTS_BASE, "conditions")
        

        let investorList = (await fetchPeopleList(basePeopleUrl,"investors")).Data || []
        let customerList = (await fetchPeopleList(basePeopleUrl,"customers")).Data

        let addressesList = await fetchJsonArray(API_ADDRESSES,"Addresses")
        // console.log("addressesList",addressesList)
        let orgsList = await fetchJsonArray(baseOrgsUrl)
        let orgTypesList = await fetchJsonArray(baseOrgTypesUrl)
        let parsed_orgTypesList = orgTypesList.map(item=>item.label); parsed_orgTypesList.unshift("None")
        let manufacturerTypeList = parseOrgTypeList("manufacturer", orgsList.Orgs,orgTypesList)
        let distributorTypeList = parseOrgTypeList("distributor", orgsList.Orgs,orgTypesList); // console.log(parsed_orgTypesList,orgsList.Orgs,distributorTypeList)
        let dealerTypeList = parseOrgTypeList("dealer", orgsList.Orgs,orgTypesList)
        let ownersTypeList = parseOrgTypeList("owner", orgsList.Orgs,orgTypesList)
        const DEFAULT_NONE = 
            {id:"999",name:"None-",zip_code:"33133-3333",type:999}
        // console.log("conditions",conditionsTypeList)
        return {
            fetchedUnit: aFetchedUnit,

            title_states: titleStates ? titleStates : DEFAULT_STATE_ARRAY,
            model_styles: modelstylesTypeList ? modelstylesTypeList : DEFAULT_MODEL_STYLE_OBJARRAY,
            ttypes: typesTypeList ? typesTypeList : [],
            statuses: statusesTypeList ? statusesTypeList : [],
            title_statuses: titleStatusesTypeList ? titleStatusesTypeList : [],
            conditions: conditionsTypeList ? conditionsTypeList : [],
            addressesList: addressesList ? addressesList : addressesList,
            investorList: investorList.map((x)=>x),
            customerList: customerList ? customerList.map((x,i)=>({...x,...{peopleid:1+i}})) : [],
            stateCountyCity: stateCountyCity ? stateCountyCity : [],

            orgsList: orgsList.Orgs ? orgsList.Orgs : [],
            distributors: distributorTypeList ? distributorTypeList : [],
            manufacturers: manufacturerTypeList? manufacturerTypeList : [],
            dealers: dealerTypeList ? dealerTypeList : [],
            owners: ownersTypeList ? ownersTypeList : [],
        }
    } catch (err) {
        return DEFAULT_RESPONSE
    }
}

export async function getServerSideProps({ params, query }) {
    let online = true
    if (query.test != undefined) online = false

    let req01, orgsList;
    let fetchedUnit = {};
    let optMapObj = {};

    let fetchResults = DEFAULT_RESPONSE
    // console.log("fetchinggggggggggggggggggggggggggg")
    if (online) { fetchResults = await fetchPageData(params,query) }
    fetchedUnit = fetchResults.fetchedUnit || DEFAULT_UNIT;
    
    // console.log("fetchedUnit",fetchedUnit)

    Object.keys(DEFAULT_RESPONSE).map((key) => {
        if (key == "orgsList") return
        optMapObj[key] = fetchResults[key]
    })

    orgsList = fetchResults.orgsList

    const props = {
        online,
        contentType: online,
        fetchedUnit: fetchedUnit,
        orgsList: orgsList,
        optMapObj: optMapObj,
    }
    return {props}
}