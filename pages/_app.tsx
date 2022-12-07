import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

import '../styles/_reset.css'
import '../styles/css.css'
import '../styles/ims-theme.css'
import Layout from '../components/templates/layouts'

const queryClient = new QueryClient()
// ReactFunctionPageComponent
function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  )
}

export default MyApp
