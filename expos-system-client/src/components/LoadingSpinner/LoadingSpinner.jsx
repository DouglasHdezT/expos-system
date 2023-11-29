import { useConfigContext } from "../../context/ConfigContext"

const LoadingSpinner = () => {
  const { loading } = useConfigContext();
  
  return !loading ? <></> : (
    <div className="fixed p-4 w-full inset-0 h-screen flex justify-center items-center 
      bg-primary-content bg-opacity-50 z-50 select-none">
      <span className="loading loading-infinity w-20 text-primary"/>
    </div>
  ); 
}

export default LoadingSpinner;