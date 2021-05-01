import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signUp';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/signup' exact>
          <SignUp />
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
