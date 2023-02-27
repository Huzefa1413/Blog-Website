import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import ArticlesList from './pages/ArticlesList';
import Article from './pages/Article';
import Notfound from './pages/Notfound';

//Components
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className='max-w-screen-md mx-auto pt-20'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/articles-list' element={<ArticlesList />} />
          <Route path='/article/:name' element={<Article />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
