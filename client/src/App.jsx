import { useState } from 'react'
import { BrowserRouter as Router , Link , Routes, Route } from 'react-router-dom'
import { Modern_Pixel_Logo } from './assets';
import { Home , CreatePost } from './pages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-2 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={Modern_Pixel_Logo} alt='logo'
            className='w-44 object-contain'
          />
        </Link>

        <Link to="/createPost" className="font-inter font-medium bg-[#CC0909] text-white px-4 py-2 rounded-md">
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/createPost' element={<CreatePost />}/>
        </Routes>
      </main>
    </Router>
  )
}

export default App
