import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';

import Layout from '@/components/layout';
import HomePage from '@/pages/home.page';
import LoginPage from '@/pages/login.page';

import './App.css';

const App = () => {
  return (
    <CssVarsProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          {/*<Route path="about" element={<About />} />*/}
          {/*<Route path="*" element={<NoMatch />} />*/}
        </Route>
      </Routes>
    </CssVarsProvider>
  );
};

export default App;
