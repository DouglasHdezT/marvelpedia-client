import { ToastContainer } from "react-toastify"
import { LoadingContextProvider } from "./LoadingContext";
import { UserContextProvider } from "./UserContext";


const ContextWrapper = ({ children }) => {
  return (
    <>
      <LoadingContextProvider>
        <UserContextProvider>
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
        </UserContextProvider>
      </LoadingContextProvider>
    </>
  );
}

export default ContextWrapper