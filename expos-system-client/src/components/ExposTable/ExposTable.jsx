import { useState } from "react";
import { toast } from "react-toastify";

import { MdCalendarToday, MdWatchLater } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { FaPlay } from 'react-icons/fa';

import { useConfigContext } from "../../context/ConfigContext";
import { useUserContext } from "../../context/UserContext";
import { toggleSubs, toggleAttend } from "../../services/expos.services";

import SubscribeModal from "../SubscribeModal/SubscribeModal";
import AttendsModal from "../AttendsModal/AttendsModal";

const ExposTable = ({ date= new Date(), expos=[], update = ()=> {} }) => {
  const [expoSelected, setExpoSelected] = useState({});
  const { startLoading, stopLoading } = useConfigContext();
  const { user } = useUserContext();

  const onClickExpoHandler = (expo) => {
    setExpoSelected(expo);
    document.querySelector(`#modal-${date}`).showModal();
  }

  const onSubscribeHandler = async (id, alreadySub=false) => {
    startLoading();

    if(id) {
      const status = await toggleSubs(id);
      
      if(status) {
        toast(alreadySub ? "Unsubscribed!" : "Subscribed!", { type: "success" });
        setExpoSelected({});
        update();
      } else {
        toast("Ups! An error ocurred", { type: "error" });
      }
    }

    stopLoading();
  }

  const onUpdateAttendantsHandler = async (expo ,ids = []) => {
    startLoading();

    if(ids.length > 0) {

      await toggleAttend(expo, ids);

      setExpoSelected({});
      update();
    }

    stopLoading();
  } 

  return (
    <>
      <div className="w-full flex flex-col gap-2 overflow-x-auto">
        <h1 className="divider divider-accent text-accent font-bold text-3xl"> { new Date(`${date}T00:00-06:00`).toLocaleDateString("en", { dateStyle:"long" }) } </h1>
        <table className="table table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th></th>
              <th className="text-center"> Date </th>
              <th className="text-center"> Expo </th>
              <th className="text-center"> Team </th>
              <th className="text-center"> Subs </th>
              <th className="text-center"> Join? </th>
            </tr>
          </thead>
          <tbody>
            {
              expos.map((_e, i) => (
                <tr key={_e._id} onClick={()=> onClickExpoHandler(_e)} className="hover cursor-pointer">
                  <th> {i + 1} </th>
                  <td>
                    <p className="flex items-center justify-start gap-2">
                      <MdCalendarToday className="text-primary" /> {new Date(_e.date).toLocaleDateString()}
                    </p>
                    <p className="flex items-center justify-start gap-2">
                      <MdWatchLater className="text-primary" /> {new Date(_e.date).toLocaleTimeString(undefined, { hour12: false }).replace(/:..$/, "")}
                    </p>

                    <p className="flex items-center justify-start gap-2">
                      <BiWorld className="text-primary" /> {new Date(_e.date).toLocaleDateString(undefined, { timeZoneName: "shortOffset" }).slice(-5)}
                    </p>
                  </td>
                  <td className="max-w-md">
                    <p className="text-3xl font-light overflow-hidden text-ellipsis">
                      { _e.project }
                    </p>
                  </td>
                  <td>
                    <div className="stat place-items-center">
                      <p className="stat-title"> Team { _e.team?.number } - Section { _e.team?.section } </p>
                      <p className="stat-value text-primary"> { _e.team?.name } </p>
                    </div>
                  </td>
                  <td>
                    <div className="stat place-items-center">
                      <p className="stat-title"> Subscribed </p>
                      <p className="stat-value text-primary "> { _e.subs?.length } </p>
                      <p className="stat-desc"> { Number(_e.capacity) - _e.subs?.length } Remaining </p>
                    </div>
                  </td>
                  <td>
                    <FaPlay className="text-primary" />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {
        (user && (user.roles.includes("scanner") || user.roles.includes("sysadmin"))) ?
          <AttendsModal id={`modal-${date}`} expo={expoSelected} onUpdateAttendants={onUpdateAttendantsHandler}/> :
          <SubscribeModal id={`modal-${date}`} expo={expoSelected} onSubscribe={onSubscribeHandler}/>
      }
    </>
  );
}

export default ExposTable;