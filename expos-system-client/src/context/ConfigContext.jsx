import { useContext, createContext, useMemo, useState, useCallback } from "react";

const ConfigContext = createContext();

export const ConfigContextProvider = (props) => {
  const [loading, setLoading] = useState(false);

  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const value = useMemo(() => ({
    loading,
    startLoading,
    stopLoading
  }), [loading, startLoading, stopLoading])

  return <ConfigContext.Provider value={value} {...props} />
}

// eslint-disable-next-line react-refresh/only-export-components
export const useConfigContext = () => {
  const context = useContext(ConfigContext);

  if(!context)
    throw new Error("useConfigContext outside ConfigContextProvider");

  return context;
}