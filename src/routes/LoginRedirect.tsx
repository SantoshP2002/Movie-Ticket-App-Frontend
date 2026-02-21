// import { Navigate, useLocation } from "react-router-dom";
// import LoadingScreen from "../components/LoadingScreen";
// import { useUserStore } from "../store/user";
// import { useAuthCheck } from "../hook/useAuthCheck";
// import Login from "../pages/auth/Login";

// const LoginRedirect = () => {
//   const { isLoggedIn } = useUserStore();
//   const { isLoading } = useAuthCheck();
//   const location = useLocation();

//   if (isLoading)
//     return <LoadingScreen content="Login Redirect Loading Please Wait !" />;

//   if (isLoggedIn) {
//     const state = location.state as { from?: { pathname?: string } } | null;
//     const from = state?.from?.pathname || "/";
//     return <Navigate to={from} replace />;
//   }

//   return <Login />;
// };

// export default LoginRedirect;
