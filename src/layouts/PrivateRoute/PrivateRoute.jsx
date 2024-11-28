import { Navigate } from "react-router";
import { useUserContext } from "../../contexts/UserContext";

const PrivateRoute = ({children}) => {
  const {token} = useUserContext();

  return(
    <>
      {
        token ? children : <Navigate to={"/auth/login"} />
      }
    </>
  )
}

export default PrivateRoute;