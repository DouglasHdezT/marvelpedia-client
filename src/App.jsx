import {HashRouter, Routes, Route} from 'react-router';

import IndexPage from "./pages/IndexPage/IndexPage"
import Mainlayout from "./layouts/MainLayout/MainLayout";
import NotFoundPage from './pages/NotFound/NotFoundPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {

  return (
      <HashRouter>
        <Mainlayout>
          <Routes>
            <Route path='/' element={<IndexPage/>}/>
            <Route path='/app' element={<IndexPage/>}/>
            <Route path='/auth/login' element={<LoginPage/>}/>
            <Route path='/auth/register' element={<RegisterPage/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
          </Routes>
        </Mainlayout>
      </HashRouter>
  )
}

export default App
