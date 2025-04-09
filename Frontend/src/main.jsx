import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route,RouterProvider } from 'react-router-dom'
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx'


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>

      <Route path='' element={<App/>} />

      
       <Route path='/user/login' element={<Login/>} />
       <Route path='/user/signup' element={<Signup/>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
