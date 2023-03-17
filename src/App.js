import 'antd/dist/reset.css';
 
 
import{ HashRouter } from 'react-router-dom'

import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

import Export from './components/Export/Export';
import FileUpload from './components/FileUpload/FileUpload';
import Home from './components/Home/Home';
import BasicLayout from "./components/BasicLayout/BasicLayout";
import Modelling from './components/Modelling/Modelling';
import User from './components/User/User';

function App(){
    
  return(
    <Router>
    <div className = "App">
    <BasicLayout />
 
    
    </div>
    </Router>

  )
}


export default App;
