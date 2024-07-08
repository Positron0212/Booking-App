
import Header from "./Header"
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className=" min-h-screen flex flex-col ">
       <Header />  
       <span className="px-2 sm:px-8 py-4 flex-grow flex flex-col ">  
        <Outlet />
       </span>
    
    </div>
  )
}

export default Layout