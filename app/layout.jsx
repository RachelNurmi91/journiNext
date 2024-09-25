import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
  title: 'Journi',
  description: 'Your digital travel companion',
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <main className='app'>
            <Nav/>
            <div className='app_content p-8 sm:p-0 sm:pt-8'>
              {children}
            </div>
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout