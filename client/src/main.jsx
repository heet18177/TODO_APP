import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner'
import { Provider } from 'react-redux'
import { Store } from './Store/Store'

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <App />
    <Toaster/>
  </Provider>,
)
