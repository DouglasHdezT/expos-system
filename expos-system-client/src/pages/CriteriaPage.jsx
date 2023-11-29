import { useEffect, useState } from "react";
import { fetchEvaluation } from "../services/expos.services";
import { toast } from "react-toastify";
import { useConfigContext } from "../context/ConfigContext";
import Header from "../components/Header/Header";

const CriteriaPage = () => {
  const [requirements, setRequirements] = useState([]);
  const [criteria, setCriteria] = useState([]);

  const { startLoading, stopLoading } = useConfigContext();

  useEffect(() => {
    const _fetch = async () => {
      startLoading();
      const evaluation = await fetchEvaluation();

      if(!evaluation) {
        toast("Evaluation not found", { type: "error" });
      } else {
        setCriteria(evaluation.criteria);
        setRequirements(evaluation.requirements);
      }

      stopLoading();
    }

    _fetch();
  }, [startLoading, stopLoading]);

  if(!criteria || !requirements) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <h1> No Evaluation! </h1>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 w-full lg:w-3/4 p-4 self-center flex flex-col gap-4">
        <h2 className="divider divider-accent text-accent font-bold text-3xl"> 
          Requirements 
        </h2>

        {
          requirements.map((_r, i) => (
            <div key={i} role="alert" className="alert">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span> {_r} </span>
            </div>
          ))
        }

        <h2 className="divider divider-accent text-accent font-bold text-3xl"> 
          Evaluation Criteria 
        </h2>

        <div className="overflow-x-auto">
          <table className="table table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th></th>
                <th className="text-center"> Criteria </th>
                <th className="text-center"> Clarifications </th>
                <th className="text-center"> Points </th>
              </tr>
            </thead>
            <tbody>
              {
                criteria.map((_c, i) => (
                  <tr key={i} className="hover">
                    <th>{ i+1 }</th>
                    <td className="min-w-[200px]">
                      <p className="text-xl text-justify font-light overflow-hidden text-ellipsis">
                        { _c.metric }
                      </p>
                    </td>
                    <td className="max-w-md min-w-[350px]">
                      <ul>
                        {
                          _c.clarifications.map((item, j) => (
                            <li key={`${i}_${j}`} 
                              className="text-justify font-light text-lg marker:content-['λ'] ps-2"> 
                                {item} 
                            </li>   
                          ))
                        }
                      </ul>
                    </td>
                    <td>
                      <div className="stat place-items-center">
                        <div className="stat-value"> {_c.points} </div>
                        <div className="stat-desc"> Points </div>
                      </div>
                    </td>
                  </tr>
                )) 
              }
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default CriteriaPage;