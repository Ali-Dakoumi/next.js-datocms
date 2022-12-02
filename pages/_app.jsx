import { createContext, useState } from 'react'
import Layout from '../components/layout'
import '../styles/tailwind.css'
import { QueryClient, QueryClientProvider } from 'react-query'
// import ContextProvider from "../components/contextProvider";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ContextProvider> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </ContextProvider> */}
    </QueryClientProvider>
  )
}

export default MyApp
