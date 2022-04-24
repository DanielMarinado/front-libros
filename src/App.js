import React, { lazy, Suspense, useCallback, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingOutlined } from "@ant-design/icons";
import { errorBoundary } from "./helpers/errorBoundary";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { auth } from "./firebase";

// lazy loading
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  
  const dispatch = useDispatch();

  const thenEndpointAction = useCallback(
    ({ data: { name, email, role, _id } }, { token }) => 
      dispatch({
        type: "LOGGED_IN_USER",
        payload: { name, email, token, role, _id },
      }),
    [dispatch]
  );

  const userExistAction = useCallback(
    async (user) => {
      const idTokenResult = await user.getIdTokenResult();

      currentUser(idTokenResult.token)
        .then((res) => thenEndpointAction(res, idTokenResult))
        .catch((err) => console.log(err));
    },
    [thenEndpointAction]
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => user && userExistAction(user)
    );
    return () => unsubscribe();
    
  }, [dispatch, thenEndpointAction, userExistAction]);
  
  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          <LoadingOutlined />
        </div>
      }
    >
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

// pattern design react: HOC
export default errorBoundary(App);




