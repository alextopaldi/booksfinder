import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { BookPage } from './pages/BookPage';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<MainPage/>}></Route>
      <Route path="/:id" element={<BookPage/>} />
    </Routes></>
  );
}

export default App;
