import {HashRouter, Routes, Route} from 'react-router';

import IndexPage from "./pages/IndexPage/IndexPage"
import Mainlayout from "./layouts/MainLayout/MainLayout";
import NotFoundPage from './pages/NotFound/NotFoundPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import CharactersByNamePage from './pages/Characters/ByNamePage/CharactersByNamePage';
import CharactersByComicsPage from './pages/Characters/ByComicsPage/CharactersByComics';
import CharactersBySeriesPage from './pages/Characters/BySeriesPage/CharactersBySeries';
import AllComicsPage from './pages/Comics/All/AllComicsPage';
import HistoryByUserPage from './pages/History/ByUser/HistoryByUser/HistoryByUserPage';
import HistoryByComicsPage from './pages/History/ByUser/HistoryByComics/HistoryByComicsPage';
import HistoryOwnPage from './pages/History/ByUser/HistoryOwn/HistoryOwnPage';

function App() {

  return (
      <HashRouter>
        <Mainlayout>
          <Routes>
            <Route path='/' element={<IndexPage/>}/>
            <Route path='/app' element={<IndexPage/>}/>
            <Route path='/auth/login' element={<LoginPage/>}/>
            <Route path='/auth/register' element={<RegisterPage/>}/>
            <Route path='/app/characters/by-name' element={<CharactersByNamePage/>} />
            <Route path='/app/characters/by-comics' element={<CharactersByComicsPage/>} />
            <Route path='/app/characters/by-series' element={<CharactersBySeriesPage/>} />
            <Route path='/app/comics/all' element={<AllComicsPage/>} />
            <Route path='/app/history/by-user' element={<HistoryByUserPage/>} />
            <Route path='/app/history/by-comics' element={<HistoryByComicsPage/>} />
            <Route path='/app/history/own' element={<HistoryOwnPage/>} />
            <Route path='*' element={<NotFoundPage/>}/>
          </Routes>
        </Mainlayout>
      </HashRouter>
  )
}

export default App
