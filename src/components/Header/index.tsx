import * as Dialog from '@radix-ui/react-dialog'

import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'

import { NewTransactionModal } from '../NewTransactionModal'

import logo from '../../assets/logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logo} alt="Logotipo" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
