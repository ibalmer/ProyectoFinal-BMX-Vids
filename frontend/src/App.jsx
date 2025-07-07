import './App.css';

import { Route, Routes } from 'react-router-dom';

import { PostsProvider } from '../Providers/Post/PostsProvider';

import { Posts } from '../Components/Posts/Posts/Posts';
import { Post } from '../Components/Posts/Post/Post';
import { Category } from '../Components/Posts/Categories/Categories';
import { Searcher } from '../Components/Posts/Searcher/Searcher';
import { Header } from '../Components/Header/Header';
import { CreatePost } from '../Components/Posts/CreatePost/CreatePost'
import { Register } from '../Components/Users/Register/Register';


function App() {

  return (
    <>
      <PostsProvider>
        <Header />
        <Routes>
          <Route path='/:param' element={<Category />}></Route>
          <Route path="/search" element={<Searcher />} />
          <Route path="/posts" element={<Posts />} />
          <Route path='/post/:param' element={<Post />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </PostsProvider>
    </>
  )
};

export default App
