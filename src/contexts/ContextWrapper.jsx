import { ToastContainer } from "react-toastify"
import { LoadingContextProvider } from "./LoadingContext";


const ContextWrapper = ({ children }) => {
  return (
    <>
      <LoadingContextProvider>
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
      </LoadingContextProvider>
    </>
  );
}

export default ContextWrapper