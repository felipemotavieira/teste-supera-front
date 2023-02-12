import { Flex } from '@chakra-ui/react';
import './App.css';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';

function App() {
  return (
    <Flex flexDirection='column'>
      <Header />
      <Dashboard />
    </Flex>
  );
}

export default App;
