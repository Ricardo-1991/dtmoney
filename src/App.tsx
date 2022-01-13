import { useState } from 'react'
import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'
import { GlobalStyle } from './styles/global'
import Modal from 'react-modal'
import { NewTransactionModal } from './components/NewTransactionModal'
import { TransactionsProvider } from './hooks/useTransactions'

Modal.setAppElement('#root') // Acessibilidade

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransctionModalOpen] =
    useState(false)

  function handleOpenNewTransactionModal() {
    setIsNewTransctionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransctionModalOpen(false)
  }

  return (
    // Dentro do componente TransactionProvider, já vem os valores das transações
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />{' '}
      {/* Passando a propriedade onOpenNewTransactionModal para o Header. Pai para filho. Onde o filho modifica funcionalidades do pai */}
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </TransactionsProvider>
  )
}
