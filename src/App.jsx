import { useEffect } from 'react';
import { getPost } from './api/PostApi';
import './App.css'

function App() {

  const getPostData = async () => {
    const res = await getPost()
    console.log(res.data);
    
  }
  
  useEffect(() => {
    getPostData()
  }, [])

  return (
    
   <div>
    Hello world
   </div>
  )
}

export default App
