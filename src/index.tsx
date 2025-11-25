import {createRoot} from 'react-dom/client'
import App from './components/app/App.tsx'
import "./styles/index.scss"
import {BrowserRouter} from "react-router";

createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
      <App />
    </BrowserRouter>

)
