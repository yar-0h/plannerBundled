import React from 'react'
import ReactDOM from 'react-dom/client'
// import { Provider } from 'react-redux'
// import reducer from './reducer'
// import { configureStore } from '@reduxjs/toolkit'
// import { store } from './store'
import { QueryClient, QueryClientProvider } from 'react-query'

import './css/index.module.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const queryClient = new QueryClient()

// const store = configureStore(
//   { reducer },
//   window.__REDUX_DEVTOOLS_EXTENSION__ &&
//   window.__REDUX_DEVTOOLS_EXTENSION__()
// )

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <Provider store = {store}> */}
      <App />
      {/* </Provider> */}
    </QueryClientProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
