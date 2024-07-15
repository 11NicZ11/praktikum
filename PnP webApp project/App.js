import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Table from './components/Table';
import Presets from './components/Presets';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgotPw from './components/ForgotPw';
import CreateTable from './components/CreateTable';
import JoinTable from './components/Join';
import Overview from './components/TableOverview';
import DeleteTable from './components/DeleteTable';
import CreateNewPreset from './components/CreateNewPreset';
import RulesOfConduct from './components/RulesOfConduct';
import TableRules from './components/TableRules';
import ContactUs from './components/ContactUs';
import Report from './components/Report';
import './components/Styles/Style.css';


function App() {
  return (
    <div className="App">
      <header>
        <nav className='navigator'>
          <ul>
            <li>
              <a href='/contactUs' className='headzeug'>Contact Us</a>
            </li>
            <li>
              <a href='/rulesOfConduct' className='headzeug'>Rules Of Conduct</a>
            </li>
          </ul>
        </nav>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/forgotPw" element={<ForgotPw />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/joinTable" element={<JoinTable />} />
          <Route path="/createTable" element={<CreateTable />} />
          <Route path="/deleteTable" element={<DeleteTable />} />
          <Route path="/table" element={<Table />} />
          <Route path="/presets" element={<Presets />} />
          <Route path="/createNewPreset" element={<CreateNewPreset />} />
          <Route path="/rulesOfConduct" element={<RulesOfConduct />} />
          <Route path="/tableRules" element={<TableRules />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;