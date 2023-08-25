import React from 'react'
import Updatetool from './component/Updatetool'
import Sidebar from './component/Slidebar'     // import Home component
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Tooloneup from './component/TooloneUp'
import MoveUp from './component/MoveUp'
import IssueItems from './component/IssueItems'
import Updatemove from './component/Updatemoveitems'
export default function App () {
  return (
    <div>
       <BrowserRouter>
     
       
       <Routes>
           <Route path='/' element={<Sidebar/>}/>
           <Route path="/Updatetool" element={<Updatetool/>}/>
           <Route path="/Updatemoveitems" element={<Updatemove/>}/>
           <Route path="/TooloneUp/:id" element={<Tooloneup/>}/>
           <Route path="/IssueItems" element={<IssueItems/>}/>
           <Route path='/MoveUp/:id' element={<MoveUp/>}/>
         </Routes>
       </BrowserRouter>
    </div>
  )
}
