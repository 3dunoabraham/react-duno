import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'


import HomeCss from '@/styles/modules/Home.module.css'
// ReactFunctionPageComponent
export default function Home() {
    const [loadingNewPage, __set_loadingNewPage] = useState(false)

    return (
        <div className="ims-body flex-center">
            <main className="ims-body-inner ims-body-home ">
                <h1> {!loadingNewPage ? "Welcome to" : "Loading"} IMS-FE {!!loadingNewPage ? ". . ." : ""}</h1>
                <code className={`my-3 block ims-border-faded ${HomeCss.code}`}>Inventory Management System</code>

                {!loadingNewPage && <>
                    <div className="flex-grid ">
                        <Link href="/dashboard"><a className="ims-cardlink">
                                <h2 className="ims-cardlink-title">Dashboard &rarr;</h2> <p className="ims-cardlink-desc">Control Panel</p>
                            </a>
                        </Link>
                        <Link href="/units"><a  className="ims-cardlink" onClick={() => {__set_loadingNewPage(true)}} >
                                <h2 className="ims-cardlink-title">Inventory &rarr;</h2>
                                <p className="ims-cardlink-desc">Unit List</p>
                            </a>
                        </Link>
                        <a href="https://servicepadportal.atlassian.net/wiki/spaces/SP/pages/459538444/Inventory+API+V1"
                            target="_blank" rel="noopener noreferrer"
                            className="ims-cardlink"
                        >
                            <h2 className="ims-cardlink-title">API ↑</h2>
                            <p className="ims-cardlink-desc">Inventory API V1 </p>
                        </a>
                    </div>
                </>}
            </main>

    </div>
    )
}
