import { createContext, useCallback, useContext, useMemo, useState } from "react";

const loadingContext = createContext();

export const LoadingContextProvider = ({...props}) => {
  const [loading, setLoading] = useState(false);

  const startLoading = useCallback(() => {
    setLoading(true);
  }, [setLoading]);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  const value = useMemo(() => ({
    loading, startLoading, stopLoading
  }), [loading, startLoading, stopLoading]);

  return <loadingContext.Provider value={value} {...props}/>
}

export const useLoadingContext = () => useContext(loadingContext)