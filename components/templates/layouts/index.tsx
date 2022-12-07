import { ReactNode } from 'react'
import Head from 'next/head'


import FooterLayout from './FooterLayout'
// import { isDevEnvironment } from '@/scripts/helpers/devHelper'
export interface ComponentProps {
  children: ReactNode
  title?: string
}
// ReactFunctionComponent
export const Layout = ({
  children,
  title = 'Home',
}: ComponentProps) => (
  <>
    <Head>
      <title>{title ? `${title} | IMS` : 'IMS'}</title>
      <meta name="description" content="ServicePad Inventory Management System" />
      <link rel="icon" href={"/favicon.ico"} />
      {/*<link rel="icon" href={isDevEnvironment ? "/dev.ico" : "/favicon.ico"} />*/}
    </Head>

    {children}    


    <FooterLayout />


    <style jsx>{`
      main {
      }
    `}</style>
  </>
)

export default Layout
