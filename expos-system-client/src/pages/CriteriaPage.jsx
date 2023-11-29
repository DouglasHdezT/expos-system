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

      if (!evaluation) {
        toast("Evaluation not found", { type: "error" });
      } else {
        setCriteria(evaluation.criteria);
        setRequirements(evaluation.requirements);
      }

      stopLoading();
    }

    _fetch();
  }, [startLoading, stopLoading]);

  if (!criteria || !requirements) {
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

        <div className="flex">

          <Requirement requirements={requirements} />

        </div>

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
                    <th>{i + 1}</th>
                    <td className="min-w-[200px]">
                      <p className="text-xl text-justify font-light overflow-hidden text-ellipsis">
                        {_c.metric}
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

const Requirement = ({ requirements }) => {
  return (
    <ul className="grid lg:grid-cols-2 w-full gap-4 h-full items-center">
      {
        requirements.map((_r, i) => (
          <li key={i} data-content="" className={`sm:w-96 text-start m-auto w-full`}>
            <div className="w-full px-6 py-4 bg-base-200 shadow rounded hover:scale-125 transition-all border-gradient border border-transparent hover:border-primary">
              <div className="">
                {_r}
              </div>
            </div>
          </li>
        ))
      }
    </ul>
  )
}

export default CriteriaPage;