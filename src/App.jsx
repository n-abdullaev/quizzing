import Home from './pages/Home';
import Qiuz from './pages/Quiz';
import Results from './pages/Results';
import { Routes , Route } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/quiz' element={<Qiuz/>}/>
      <Route path='/results' element={<Results/>} />
    </Routes>
  )
}

export default App;
