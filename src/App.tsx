import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';

import './App.css';

const App = () => {
  return (
    <CssVarsProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          {/*<Route path="about" element={<About />} />*/}
          {/*<Route path="*" element={<NoMatch />} />*/}
        </Route>
      </Routes>
    </CssVarsProvider>
  );
};

export default App;
