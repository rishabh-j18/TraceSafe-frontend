
import './App.css';
import AppBarComponent from './components/AppBarComponent';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroSection from './components/HeroSection';
import NoPage from './components/NoPage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import MissingPersonReport from './components/MissingPersonReport';
import SearchPerson from './components/SearchPerson';
import FlagLocation from './components/FlagLocation';
import RoleManagement from './components/RoleManagement';
import Detail from './components/Detail';

function App() {
  return (
<>
    <BrowserRouter>
    
<AppBarComponent/>

      <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/contact" element={<ContactUs />} />          
      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/report" element={<MissingPersonReport />} />
      <Route path="/search" element={<SearchPerson />} />
      <Route path="/flag" element={<FlagLocation />} />
      <Route path="rolemanagement" element={<RoleManagement />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="*" element={<NoPage />} />
      
      </Routes>
    </BrowserRouter>
    
</>
  );
}

export default App;
