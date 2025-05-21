
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blogs from './pages/Blogs'
import Blog from './pages/Blog'
import Publish from './pages/Publish'
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Profile from './pages/Profile'
const queryClient=new QueryClient();
function App() {
  

  return (
    <>
    <QueryClientProvider client={queryClient}>    
     <BrowserRouter>
     <Routes>
        <Route path='/' element={<Signup />} /> 
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/blogs' element={<Blogs/>}/>
      <Route path='/blog/:id' element={<Blog/>}/>
      <Route path='/publish' element={<Publish/>}/>
      <Route path='/profile' element={<Profile/>}/>

      </Routes>
     </BrowserRouter>
      </QueryClientProvider>
    </>
   
  )
}

export default App
