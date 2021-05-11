import { useState } from 'react';
import Modal from 'react-modal';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { GlobalStyle } from './styles/global';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './TransactionsContext';

Modal.setAppElement('#root');

export function App() {
  const [isNewTransctionModalOpen, setIsNewTransctionModalOpen] = useState(false);

  function handleOpenNewTransctionModal() {
    setIsNewTransctionModalOpen(true)
  }

  function handleCloseNewtransactionModal() {
    setIsNewTransctionModalOpen(false)
  }
  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransctionModal} />
      <Dashboard />
      <NewTransactionModal isOpen={isNewTransctionModalOpen} onRequestClose={handleCloseNewtransactionModal} />
      <GlobalStyle />
    </TransactionsProvider>
  );
}