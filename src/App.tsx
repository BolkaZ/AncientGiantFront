import './App.css'
import {Route, Routes } from 'react-router-dom'
import {routes } from './config/router-config'
import { BreadCrumbs } from './components/bread-crumbs/BreadCrumbs'
import { Header } from './components/header/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap';
import {useEffect} from 'react';
import {invoke} from '@tauri-apps/api/core';


function App() {
  useEffect(()=>{
    invoke('tauri', {cmd:'create'})
      .then(() =>{console.log("Tauri launched")})
      .catch(() =>{console.log("Tauri not launched")})
    return () =>{
      invoke('tauri', {cmd:'close'})
        .then(() =>{console.log("Tauri launched")})
        .catch(() =>{console.log("Tauri not launched")})
    }
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
