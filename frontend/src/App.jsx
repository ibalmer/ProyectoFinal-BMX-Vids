import './App.css';

import { Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { PostsProvider } from './Providers/Post/PostsProvider';
import { UserContext } from './Providers/Users/UserContext';

import { Header } from './Components/Header/Header';
import { Home } from './Components/Home/Home';
import {Post} from './Components/Posts/Post/Post'
import { Category } from './Components/Posts/Categories/Categories';
import { Searcher } from './Components/Posts/Searcher/Searcher';
import { CreatePost } from './Components/Posts/CreatePost/CreatePost'
import { Register } from './Components/Users/Register/Register';
import { Favorites } from './Components/Users/Favorites/Favorites';
import { Footer } from './Components/Footer/Footer';



function App() {
  const { auth } = useContext(UserContext);

  useEffect(() => { auth(); }, []);

  return (
    <>
      <PostsProvider>
        <Header />
        <div className='content-section width-100'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/:param' element={<Category />}></Route>
            <Route path="/search" element={<Searcher />} />
            <Route path='/post/:param' element={<Post />} />
            <Route path='/create' element={<CreatePost />} />
            <Route path='/register' element={<Register />} />
            <Route path='/favorites' element={<Favorites />} />
          </Routes>
        </div>
        <Footer />
      </PostsProvider>
    </>
  )
};

export default App
