import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/fonts/fontawesome-free-6.1.2-web/css/all.css'
import './assets/css/normalize.css'
import './assets/css/styles.css'
import './assets/css/responsive.css'

//Librería time-ago. Con ella las fechas se actualizarán en tiempo real y reflejan el tiempo exacto de su creación
import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es.json'
TimeAgo.addDefaultLocale(es)
TimeAgo.addLocale(es)

ReactDOM.createRoot(document.getElementById('root')).render(
    <App/>
)
