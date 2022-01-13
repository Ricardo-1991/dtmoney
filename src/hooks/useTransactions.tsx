import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext
} from 'react'
import { api } from '../services/api'

interface Transaction {
  id: number
  title: string
  amount: number
  type: string
  category: string
  createdAt: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'> // Para criar uma nova transação, precisa trazer apenas as propriedades que ela precisa, omitindo outras (OMIT)

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionContextData {
  transactions: Transaction[]
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData // Força a tipagem correta, por causa que o formato recebe tanto um array, quanto uma função.
) // Ele é usado para retornar o estado dentro do componente <TransactionsProvider>

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]) // Aqui recebe as informações do estado do contexto(as info da API)

  useEffect(() => {
    api
      .get('transaction')
      .then(response => setTransactions(response.data.transactions)) // Não precisa transformar em JSON e não recebe diretamente do Data.Recebe como response.data
  }, [])

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date() // recebe uma nova data na criação
    })
    const { transaction } = response.data // pega desestruturado o informação do request (transaction)

    setTransactions([
      ...transactions, // Trás o que já tinha no estado
      transaction // adiciona uma nova transação
    ])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {/* Após criar o contexto, ele é usado como Provider e retorna junto com o novo componente para ficar entre todos os elementos e assim compartilhar o estado dele */}
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)
  return context
}
