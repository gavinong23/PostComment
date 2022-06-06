import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home.page';
import PostDetailPage from './pages/PostDetail.page';
import Header from './components/Header.component';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/postDetailPage/:id' element={<PostDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
