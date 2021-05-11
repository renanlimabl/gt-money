import { createContext, useEffect, useState, ReactNode } from 'react';
import { api } from "./services/api";

interface ITransaction {
  id: number,
  title: string,
  amount: number,
  type: string,
  category: string,
  createdAt: string,
}

// interface ITransactionInput {
//   title: string,
//   amount: number,
//   type: string,
//   category: string,
// }

type ITransactionInput = Omit<ITransaction, 'id' | 'createdAt'>
interface ITransactionsContextData {
  transactions: ITransaction[];
  createTransaction: (transaction: ITransactionInput) => Promise<void>;
}


interface ITransactionsProviderProps {
  // ReactNode é um tipo que permite qualquer tipo de JSX.
  children: ReactNode;
}

/**
 * ITransactionsContextData -> Tivemos que adicionar essa nova interface, porque além de retornar um array de Transactions,
 * também retornará uma função.
 * E iniamos o createContext com um {} as ITransactionsContextData para forçar o typescript entender que esse objeto no final será desse tipo.
 */
export const TransactionsContext = createContext<ITransactionsContextData>({} as ITransactionsContextData);

export function TransactionsProvider({ children }: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  useEffect(() => {
    api.get('http://localhost:3000/api/transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  async function createTransaction(transactionInput: ITransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    })
    const { transaction } = response.data;

    setTransactions(
      [
        ...transactions,
        transaction
      ]
    )
  }

  // COMO PRECISAMOS PASSAR TAMBÉM UMA FUNÇÃO NO VALUE, IREMOS UTILIZAR UM OBJETO DENTRO DE VALUE.
  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}