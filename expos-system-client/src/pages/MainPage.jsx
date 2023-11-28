import { useEffect, useState } from "react";
import { useConfigContext } from "../context/ConfigContext";
import { fetchExpos, fetchOwnExpos } from "../services/expos.services";
import ExposTable from "../components/ExposTable/ExposTable";
import Header from "../components/Header/Header";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const MainPage = ({ own=false }) => {
  const [expos, setExpos] = useState({});
  const [trigger, setTrigger] = useState(false);
  const { startLoading, stopLoading } = useConfigContext();
  const { user } = useUserContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    const _fetch = async () => {
      startLoading();

      if(own && !user) {
        return;
      }

      const _expos = own ? (await fetchOwnExpos()) : (await fetchExpos());
      const dates = {};

      _expos.forEach(_e => {
        const dateString = _e.date.slice(0, 10);
        const values = [...dates[dateString]??[], _e];
        
        dates[dateString] = values;
      });

      setExpos(dates);

      stopLoading();
    }

    _fetch();
  }, [startLoading, stopLoading, trigger, own, user, navigate]);

  return (
    <main className="w-full min-h-screen flex flex-col">
      <Header />
      <section className="flex-1 w-3/4 p-4 self-center flex flex-col gap-16">
        { (Object.keys(expos).length > 0) ? 
          Object.keys(expos).map(date => (
            <ExposTable key={`${date}_table`} 
              date={date} 
              update={()=> setTrigger(!trigger)}
              expos={expos[date]}/>
          )) : 
          <div className="flex-1 flex justify-center items-center">
            <h1> No Expos! </h1>
          </div>
        }
      </section>
    </main>
  );
}

export default MainPage;