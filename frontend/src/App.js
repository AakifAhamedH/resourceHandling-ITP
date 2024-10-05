import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AddResource from './pages/AddResource';
import Recent from './pages/Recent';
import UpdateProduct from './pages/UpdateResource';
import ResourceShedule from './pages/ResourceShedule'
import Shedule from './pages/Shedule';
import UpdateResourceSchedule from './pages/UpdateShedule';
import AddChemicals from './pages/AddChemical';
import ViewChemicals from './pages/viewChemical';
import UpdateChemicals from './pages/UpdateChemical'

function App() {
  return (
    <div className="App">
       <BrowserRouter>
    <Routes>
      <Route  path="/addresource" element = {<AddResource/>}/>
      <Route path='/recent' element= {<Recent/>}/>
      <Route path='/shedule' element= {<Shedule/>}/>
      <Route path='/viewChemicals' element= {<ViewChemicals/>}/>
      <Route path='/resourceShedule' element= {<ResourceShedule/>}/>
      <Route path='/addChemicals' element= {<AddChemicals/>}/>
      <Route path='/update/:resourceId' element={<UpdateProduct/>}/>
      <Route path='/update1/:id' element={<UpdateResourceSchedule/>}/>
      <Route path='/update2/:id' element={<UpdateChemicals/>}/>
      </Routes>
      </BrowserRouter>
 
    </div>
  );
}

export default App;
