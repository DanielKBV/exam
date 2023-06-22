import { Provider } from 'react-redux'
import './App.css'
import Checkout from './JS/Checkout'
import { store } from './store'

function AppContent() {
    return (
        <div className="App">
            <Checkout />
        </div>
    )
}

function App() {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    )
}

export default App
