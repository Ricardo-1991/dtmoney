import React from 'react'
import ReactDOM from 'react-dom'
import { createServer, Model } from 'miragejs'
import { App } from './App'

createServer({
  models: {
    transaction: Model // "Banco de dados" com a primeira tabela
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00')
        },

        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-02-14 11:00:00')
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api'

    this.get('/transaction', () => {
      return this.schema.all('transaction') // Método get, retorna todas as transactions. schema é o banco de dados
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody) // recebe as informações em JSON

      return schema.create('transactions', data) // Cria as informações no banco de dados. Link entre o get e o post
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
