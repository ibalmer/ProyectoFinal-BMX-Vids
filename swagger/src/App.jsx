import { useState } from 'react'
import { Tabs } from './Components/Tabs/Tabs'
import { Response } from './Components/Response/Response'
import { Content } from './Components/Content/Content'
import './App.css'

function App() {

  const [post, setPost] = useState();
  const [response, setResponse] = useState('');

  const togglePost = (data) => setPost(data);
  const toggleResponse = (data) => {
    setResponse(data);
  }
    

  return (
    <section className='app-section'>
      <Tabs className='tabs' togglePost={togglePost}/>
      <Response className='response' response={response}/>
      <Content className='content' post={post} toggleResponse={toggleResponse}/>
    </section>
  )
}
export default App
