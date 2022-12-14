import Link from 'next/link'


// ReactFunctionComponent
export const UnitSummary =({ unit }) =>
{
    return (


        <div className="flex-wrap ims-tx-faded  tx-md ">
            <div className="pr-2 py-1  flex nowrap">
                <div className="tx-bold-6 pr-1">Sales Status:</div>
                Available
            </div>
            <div className="pr-2  py-1 flex nowrap">
                <div className="tx-bold-6 pr-1">Unit ID:</div>
                {unit.uid}
            </div>
            <div className="pr-2  py-1 flex nowrap">
                <div className="tx-bold-6 pr-1">VIN:</div>
                {unit.vin}
                {/*123ABCV63261356*/}
            </div>
            <div className=" pa-1 mx-1 nowrap">
                <span className="tx-bold-8">Work Order:</span>
                <Link href="/unit/5835-9669"><a className="ims-tx-link opaci-hov--50 pl-0 pa-1 tx-bold-5"> abc-12345</a></Link>
            </div>
        </div>

        
    )
}