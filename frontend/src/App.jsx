import { Route, Routes } from 'react-router-dom';
import { PostsProvider } from '../Providers/PostProvider/PostsProvider';
import { Posts } from '../Components/Posts/Posts';
import { Post } from '../Components/Post/Post';
import { Category } from '../Components/Categories/Categories';
import { Searcher } from '../Components/Searcher/Searcher';
import { Header } from '../Components/Header/Header';
import { CreatePost
  
 } from '../Components/CreatePost/CreatePost';
import './App.css';

function App() {


  return (
    <>
      <PostsProvider>
        <Header/>
        <Routes>
          <Route path='/:param' element={<Category />}></Route>
          <Route path="/search" element={<Searcher />} />
          <Route path="/posts" element={<Posts />} />
          <Route path='/post/:param' element={<Post />} />
          <Route path='/create' element={<CreatePost />} />
        </Routes>
      </PostsProvider>
    </>
  )
};

export default App
