import Head from 'next/head'
import Link from 'next/link'

import { BreadCrumbs } from '@/components/atoms/BreadCrumbs'

// ReactFunctionPageComponent
export default function Dashboard() {
  return (<>
    <Head> <title>Dashboard | SMP</title> </Head>
    <div className="ims-body">
      <main className="ims-body-inner">
        <BreadCrumbs pages={[["/dashboard","Dashboard"]]} current={`Browse`}/>
        <h1> Dashboard </h1>

        <ul>
          <li className="tx-lg"> <Link href="/units"> Inventory </Link> </li>
          <li> <Link href="/unit/add"> Add Unit </Link> </li>
          <li> <Link href="/unit/5916-9759"> Unit #5916-9759 (Trailer) </Link> </li>
        </ul>
        </main>
    </div>
  </>)
}