import { Route, Routes } from "react-router-dom";
import "./App.css";
import Indexpage from "./pages/Indexpage.jsx"
import Layout from "./pages/Layout.jsx"
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import axios from "axios";
import { UserContextProvider } from "./UserContext.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Placespage from "./pages/Placespage.jsx";
import Placesformpage from "./pages/Placesformpage.jsx";
import Placepage from "./pages/Placepage.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";



axios.defaults.baseURL=import.meta.env.VITE_API_BASE_URL;
function App() {
  
  return (
    <UserContextProvider>
   <Routes>
   <Route path = "/" element={<Layout />} >
    <Route index element={<Indexpage />} />
    <Route path="/login" element={<Login />}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/account" element={<ProfilePage/>}/>
    <Route path="/account/places" element={<Placespage/>}/>
    <Route path="/account/places/new" element={<Placesformpage/>}/>
    <Route path="/account/places/:id" element={<Placesformpage/>}/>
    <Route path="/place/:id" element={<Placepage/>}/>
    <Route path="/account/bookings" element={<BookingsPage/>}/>
    <Route path="/search-results/:query" element={<SearchPage/>}/>
    
    
    </Route>
   </Routes>
   </UserContextProvider>
  );
}

export default App;
