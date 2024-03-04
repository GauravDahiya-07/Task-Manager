
import { ChakraProvider } from '@chakra-ui/react'
import './App.css'
import Home from './components/Home'
import TaskContextProvider from './context/TaskContextProvider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
])

function App() {

  return (
    <TaskContextProvider>
      <ChakraProvider>
        <RouterProvider router = {router}>
            <Home />
        </RouterProvider>
      </ChakraProvider>     
    </TaskContextProvider>
  )
}

export default App
