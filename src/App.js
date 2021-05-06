import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { auth } from "./firebase/firebase";
import { DASHBOARD, LOGIN, NOT_FOUND, PROFILE, SIGN_UP } from "./routes";
import { lazy, Suspense } from "react";
import FallbackLoading from "./components/fallbackLoading";
import useUser from "./hooks/useUser";
import UserContext from "./context/UserContext";
import Profile from "./pages/profile";
import NotFound from "./pages/notFound";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signUp"));
const Dashboard = lazy(() => import("./pages/dashboard"));

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const {user: activeUser, setActiveUser} = useUser(user?.userId)
  
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // User is signed in
        const userData = {userId: userAuth.uid}
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      } else {
        // User is signed out
        localStorage.removeItem('user')
        setUser(null)
      }
    });
  }, []);
  return (
    <UserContext.Provider value={{user: activeUser, setActiveUser}}>
    <Router>
      <Suspense fallback={<FallbackLoading />}>
        <Switch>
          <Route exact path={LOGIN}>
            {!user ? <Login /> : <Redirect to={DASHBOARD} />}
          </Route>
          <Route exact path={SIGN_UP}>
            {!user ? <SignUp /> : <Redirect to={DASHBOARD} />}
          </Route>
          <Route exact path={PROFILE}>
             {user ? <Profile user={user}/> : <Redirect to={LOGIN} />}
          </Route>
          <Route exact path={NOT_FOUND}>
             <NotFound /> 
          </Route>
          <Route exact path={DASHBOARD}>
            {user ? <Dashboard user={user} /> : <Redirect to={LOGIN} />}
          </Route>
        </Switch>
      </Suspense>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
