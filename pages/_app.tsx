import type { AppProps } from 'next/app'


import '../styles/globals.css'
import '../styles/css.css'
import '../styles/theme.css'
import '../styles/duno.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from '../components/Layout'
const queryClient = new QueryClient()
export default function({ Component, pageProps, ...appProps  }: AppProps) {

    return (
    <QueryClientProvider client={queryClient}>
        <div className="flex flex-justify-between h-min-100vh">
            <div className="flex-col w-100">
                <Layout> <Component {...pageProps} /> </Layout>
            </div>
        </div>
    </QueryClientProvider>
    )
}
