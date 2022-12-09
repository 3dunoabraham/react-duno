import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

import '../styles/_reset.css'
import '../styles/css.css'
import '../styles/ims-theme.css'
import Layout from '../components/templates/layouts'
import SidebarLayout from '../components/templates/layouts/SidebarLayout'

const queryClient = new QueryClient()
// ReactFunctionPageComponent
function MyApp({ Component, pageProps, ...appProps  }) {
    const isLayoutNeeded = ['/manufacturers','/units'].includes(appProps.router.pathname);

    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-justify-between">
                {isLayoutNeeded && <SidebarLayout /> }
                {/*isLayoutNeeded && 
                    <SidebarLayout>
                        <div className="flex flex-justify-between " style={{height:"100vh", overflowY: "auto"}}>
                            *{isLayoutNeeded?"YUES":"no"}*
                        </div>
                    </SidebarLayout>
                */}
                <div className="flex-col w-100">
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </div>
            </div>
        </QueryClientProvider>
    )
}

export default MyApp
