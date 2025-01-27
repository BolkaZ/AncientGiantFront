import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import "bootstrap/scss/bootstrap.scss"
import "bootstrap/dist/css/bootstrap-reboot.css"
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import {Provider} from 'react-redux';
import {store} from './store';
// @ts-ignore
import {registerSW} from "virtual:pwa-register";

if ("serviceWorker" in navigator) {
  registerSW()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store()}>
      <Router basename={'/AncientGiantFront'} >
        <App />
      </Router>
    </Provider>
</StrictMode>,
)
