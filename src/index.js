import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { Provider } from "react-redux"
import { store2 } from "./Redux/store"
import { Persistor } from "./Redux/store"
// import { PersistorGate } from "redux-persist/es/integration/react"
import { PersistGate } from 'redux-persist/es/integration/react'
import { store } from "./Toolkit/store"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <>
    {/* <Provider store={store}>
      <PersistGate Loading={null} persistor = {Persistor}> */}
       <Provider store={store}>
      <App />
      </Provider>
      {/* </PersistGate>
    </Provider> */}
  </>
)

reportWebVitals()
