import React, { useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'

import { api } from '../lib/axios'

interface TransactionData {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionsContextType {
  transactions: TransactionData[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
  children: React.ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionData[]>([])

  // async function fetchTransactions(query?: string) {
  //   // const url = new URL('/transactions')

  //   // if (query) {
  //   //   url.searchParams.append('q', query)
  //   // }

  //   // const response = await fetch(url)
  //   // const data = await response.json()

  //   const response = await api.get('transactions', {
  //     params: {
  //       _sort: 'createdAt',
  //       _order: 'desc',
  //       q: query,
  //     },
  //   })

  //   setTransactions(response.data)
  // }

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }, [])

  // async function createTransaction(data: CreateTransactionInput) {
  //   const { description, price, category, type } = data

  //   const response = await api.post('/transactions', {
  //     description,
  //     price,
  //     category,
  //     type,
  //     createdAt: new Date(), // no backend, o createdAt é gerado automaticamente.
  //   })

  //   setTransactions((state) => [response.data, ...state])
  // }

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data

      const response = await api.post('transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
