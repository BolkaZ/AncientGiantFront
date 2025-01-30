import './App.css'
import {Route, Routes } from 'react-router-dom'
import {routes } from './config/router-config'
import { BreadCrumbs } from './components/bread-crumbs/BreadCrumbs'
import { Header } from './components/header/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap';
import {useEffect} from 'react';
import {invoke} from '@tauri-apps/api/core';
import { Api } from './api/Api'
import axios from 'axios'


function App() {
  useEffect(() =>{
    // fetch({url:"http://127.0.0.1:8000/api/periods/", credentials: 'include',  })
  // const response = axios.get("http://127.0.0.1:8000/api/periods/", { withCredentials: true });
  // console.log(response);
  
  }, [])
  return (
    <>
      <Header/>
      <Container>
        <BreadCrumbs/>
      </Container>
        <Routes>
          {routes.map((route) => <Route key={route.path} path={route.path} element={route.element}/>)}
        </Routes>
    </>
  )
}

export default App
