import { Routes, Route } from 'react-router-dom';
import AdminLinks from './paginas/Link/AdminLinks';
import PaginaPadrao from './paginas/PaginaPadrao';
import FormularioLink from './paginas/Link/FormularioLink';

function App() {
  return (
    <Routes>
        <Route path='/' element={<PaginaPadrao/>}>
          <Route path='links' element={<AdminLinks/>}/>  
          <Route path='links/:id' element={<FormularioLink/>}/>
         </Route>
     </Routes>  
  );
}

export default App;
