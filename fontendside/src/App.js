import React from 'react'
import Updatetool from './component/Updatetool'
import Sidebar from './component/Slidebar'     // import Home component
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Tooloneup from './component/TooloneUp'
import IssueItems from './component/IssueItems'
export default function App () {
  return (
    <div>
       <BrowserRouter>
     
       
       <Routes>
           <Route path='/' element={<Sidebar/>}/>
           <Route path="/Updatetool" element={<Updatetool/>}/>
           <Route path="/TooloneUp/:id" element={<Tooloneup/>}/>
           <Route path="/IssueItems" element={<IssueItems/>}/>
         </Routes>
       </BrowserRouter>
    </div>
  )
}
