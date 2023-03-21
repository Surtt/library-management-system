import { Container } from '@mui/material';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

import Header from './components/header/Header';

import './App.css';

function App() {
  return (
    <CssVarsProvider>
      <Header />
      <Container maxWidth="lg">
        {/*<Grid maxWidth="xl" container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}></Grid>*/}
      </Container>
    </CssVarsProvider>
  );
}

export default App;
