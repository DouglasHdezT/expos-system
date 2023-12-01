import { useEffect, useState } from "react";

import { useUserContext } from "../context/UserContext";
import { useConfigContext } from "../context/ConfigContext";
import { fetchStats } from "../services/expos.services";

import Header from "../components/Header/Header";

const StatsPage = () => {
  const [stats, setStats] = useState({});

  const { user } = useUserContext();
  const { startLoading, stopLoading } = useConfigContext();

  useEffect(() => {
    const _fetch = async () => {
      startLoading();

      const data = await fetchStats();
      setStats(data);

      stopLoading();
    }

    if(user) {
      _fetch();
    }
  }, [startLoading, stopLoading, user]);

  return (
    <main className="w-full min-h-screen flex flex-col">
      <Header />
      <section className="flex-1 w-full lg:w-3/4 p-4 self-center flex flex-col gap-16 overflow-x-auto">
        { (user?.roles?.includes("admin") || user?.roles?.includes("sysadmin")) ? 
          <>
          <table className="table table-pin-cols table-pin-rows">
            <thead>
              <tr>
                <th className="text-center">  </th>
                <th className="text-center"> Username </th>
                <th className="text-center"> Name </th>
                <th className="text-center"> Attends </th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(stats).map((k, i) => (
                  <tr key={k} className={`${stats[k]?.attends.length < 7 ? "text-secondary" : ""}`}>
                    <td> {i+1} </td>
                    <td> { stats[k]?.user?.username } </td>
                    <td> { stats[k]?.user?.name } </td>
                    <td > { stats[k]?.attends.length } </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          </>: 
          <div className="flex-1 flex justify-center items-center">
            <h1> No Stats! </h1>
          </div>
        }
      </section>
    </main> 
  );
};

export default StatsPage;