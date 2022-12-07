import Link from 'next/link'


// ReactFunctionComponent
export const ErrorBlock = ({err=null}) => {
    return (<div className="flex-center py-100">
        <div className="flex-col">
            {!!err && <div className="pb-3">
                <small>An error has occurred: </small>
                <div>{(!err.message && "error no message")}</div>
                <b className="tx-lg">{!!err.message && err.message == `Unexpected token '<', "<!doctype "... is not valid JSON` ? "Failed to fetch unit" : err.message}</b>
            </div>}
            <img src='/img/404-error.svg' alt='next' />
            <h1 className="ims-tx-primary pt-8 ">Oops! This page could not be found.</h1>
            <Link  href="/"><a className="ims-tx-link tx-bold-9 tx-xl border-r-8 mt-3  box-shadow-1  ">
                <div className="py-3 px-6 opaci-hov-25">
                    Go Home
                </div>
            </a></Link>
        </div>
    </div>)
}