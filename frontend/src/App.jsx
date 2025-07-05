import { Route, Routes, Link } from 'react-router-dom';
import { PostsProvider } from '../Providers/PostProvider/PostsProvider';
import { Posts } from '../Components/Posts/Posts';
import { Post } from '../Components/Post/Post';
import { Category } from '../Components/Categories/Categories';
import { Searcher } from '../Components/Searcher/Searcher';
import { InputSearcher } from '../Components/Searcher/InputSearcher/InputSearcher';
import { CreatePost
  
 } from '../Components/CreatePost/CreatePost';
import './App.css';

function App() {


  return (
    <>
      <PostsProvider>
        <div className='header'>
          <Link to={'/posts'}>
            <h3>BMX Vids</h3>
          </Link>
          <nav>
            <ul>
              <li>
                <Link to={`/full videos`}>
                  <h5>Full Videos</h5>
                </Link>
              </li>
              <li>
                <Link to={`/web videos`}>
                  <h5>Web Videos</h5>
                </Link>
              </li>
              <li>
                <Link to={`/event videos`}>
                  <h5>Event Videos</h5>
                </Link>
              </li>
              <li>
                <Link to={`/create`}>
                  <h5>Crear Post</h5>
                </Link>
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <InputSearcher />
              </li>
            </ul>
          </nav>
        </div>
        <Link></Link>
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
