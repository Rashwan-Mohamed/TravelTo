import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home'
import App from './App'
import Destination from './features/destinations/Destination'
import reportWebVitals from './reportWebVitals'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<Home />}></Route>
            <Route path=':id' element={<Destination />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <App />
    </Provider>
  </>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
