import { Summary } from '../Summary'
import { TransactionTable } from '../Transactions-Table'
import { Container } from './style'

export function Dashboard() {
  return (
    <Container>
      <Summary />
      <TransactionTable />
    </Container>
  )
}
