import './App.css'
import { Route, Routes } from 'react-router-dom'
import { routes } from './config/router-config'
import { BreadCrumbs } from './components/bread-crumbs/BreadCrumbs'
import { Header } from './components/header/Header'


function App() {


  return (
    <>
      <Header />
      <BreadCrumbs />
      <Routes>
        {routes.map((route)=> <Route key={route.path} path={route.path} element={route.element} />)}
      </Routes>
    </>
  )
}

export default App
