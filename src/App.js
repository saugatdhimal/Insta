import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { auth } from "./firebase/firebase";
import { getUserById } from "./firebase/service";
import { DASHBOARD, LOGIN, SIGN_UP } from "./routes";
import { lazy, Suspense } from "react";
import FallbackLoading from "./components/fallbackLoading";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signUp"));
const Dashboard = lazy(() => import("./pages/dashboard"));

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      async function getUserData() {
        const userData = await getUserById(userAuth.uid);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      }

      if (userAuth) {
        // User is signed in
        getUserData()
      } else {
        // User is signed out
        localStorage.removeItem('user')
        setUser(null)
      }
    });
  }, []);
  return (
    <Router>
      <Suspense fallback={<FallbackLoading />}>
        <Switch>
          <Route exact path={LOGIN}>
            {!user ? <Login /> : <Redirect to={DASHBOARD} />}
          </Route>
          <Route exact path={SIGN_UP}>
            {!user ? <SignUp /> : <Redirect to={DASHBOARD} />}
          </Route>
          <Route exact path={DASHBOARD}>
            <Dashboard user={user} />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
