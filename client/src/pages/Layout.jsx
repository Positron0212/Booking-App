
import Header from "./Header"
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="  ">
       <Header />  
       <span className="px-4 sm:px-8 py-4 flex flex-col min-h-screen">  
        <Outlet />
       </span>
    
    </div>
  )
}

export default Layout