import { Container } from '@mui/material';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

import Books from './components/books/Books';
import Header from './components/header/Header';
import Loading from './components/loading/Loading';

import './App.css';

const App = () => {
  return (
    <CssVarsProvider>
      <Header />
      <Container maxWidth="lg">
        <Loading />
        <Books />
      </Container>
    </CssVarsProvider>
  );
};

export default App;
