import NoInternetConnection from '@/components/errorHandlers/NoInternetConnection'
import GlobalContext from '@/context/GlobalContext'
import '@/styles/globals.css'
import { Roboto } from 'next/font/google'
import { Toaster } from 'sonner'

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
  return (
    <NoInternetConnection>
      <GlobalContext>
        <main className={roboto.className}>
          <Toaster closeButton richColors visibleToasts={5} toastOptions={{ style: {background: 'white', color: '#e26928'} }}/>
          <Component {...pageProps} />
        </main>
      </GlobalContext>
    </NoInternetConnection>
  )

}
