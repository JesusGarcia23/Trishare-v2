import './App.css';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import PublicRoute from './components/PublicRoute'

function App() {
  return (
    <div className="App">
      <Switch>
        <PublicRoute exact path="/" component={LandingPage}/>

      </Switch>
    </div>
  );
}

export default App;
