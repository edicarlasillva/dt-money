import { ThemeProvider } from 'styled-components'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'

import { TransactionsProvider } from './contexts/TransactionsContext'
import { Transaction } from './pages/Transactions'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <TransactionsProvider>
        <Transaction />
      </TransactionsProvider>
    </ThemeProvider>
  )
}
