import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router} from 'react-router-dom'

import {ContextProvider} from './Context' //importing ContextProvider function
import App from "./App"

/*Setting up React Router. Wrapping Router around App to provide routing capabilities to application. 
With ContextProvider, passing the children onward so they are rendered correctly (children from props.children)*/
ReactDOM.render(
   <ContextProvider>
       <Router>
          <App />
        </Router>
      </ContextProvider>,
    document.getElementById("root")
   )
    

