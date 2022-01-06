import { createContext, useEffect, useState, ReactNode } from 'react'
import { api } from './services/api'

interface Transaction {
  id: number
  title: string
  amount: number
  type: string
  category: string
  createdAt: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionContextData {
  transactions: Transaction[]
  createTransaction: (transaction: TransactionInput) => void
}

export const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
) // Ele é usado para retornar o estado dentro do componente <TransactionsProvider>

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]) // Aqui recebe as informações do estado do contexto(as info da API)

  useEffect(() => {
    api
      .get('transaction')
      .then(response => setTransactions(response.data.transactions)) // Não precisa transformar em JSON e não recebe diretamente do Data.Recebe como response.data
  }, [])

  function createTransaction(transaction: TransactionInput) {
    api.post('/transactions', transaction)
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {/* Após criar o contexto, ele é usado como Provider e retorna junto com o novo componente para ficar entre todos os elementos e assim compartilhar o estado dele */}
      {children}
    </TransactionsContext.Provider>
  )
}
