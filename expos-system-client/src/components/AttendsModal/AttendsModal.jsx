import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";

const AttendsModal = ({ id="", onUpdateAttendants = () => {}, expo={} }) => {
  const [attends, setAttends] = useState([]);
  const { user } = useUserContext();

  useEffect(()=> {
    let _attends = [];

    expo.subs?.forEach(({ _id, username, name }) => {
      const alreadyAttend = expo.attendants.findIndex(_a => _a._id === _id) >= 0;

      _attends = [..._attends, 
          { _id, username, name, oldState: alreadyAttend, currentState: alreadyAttend }];
    });

    setAttends(_attends);
  }, [expo]);

  const onChangeHandler = (i) => {
    const _attends = [...attends];
    _attends[i].currentState = !_attends[i].currentState;
    setAttends(_attends);
  }

  const onUpdateHandler = () => {
    const toUpdate = attends.map(({ _id, oldState, currentState })=> {
      return oldState !== currentState ? _id : null; 
    })
    .filter((_id) => _id);

    onUpdateAttendants(expo._id, toUpdate);
  }
    
  return (
    <dialog id={id} className="modal">
      <div className="modal-box flex flex-col gap-3 overflow-x-auto">
        <h3 className="font-bold text-xl">{ expo.project }</h3>

        <table className="table table-pin-cols">
          <thead>
            <tr>
              <th className="text-center"> Status </th>
              <th className="text-center"> Username </th>
              <th className="text-center"> Name </th>
            </tr>
          </thead>
          <tbody>
            {
              attends.map(({_id, username, name, currentState}, i) => (
                <tr key= {_id} onClick={()=> onChangeHandler(i)}>
                  <td>
                    <label>
                      <input onChange={() => {  }}
                        id={`state-${_id}`} 
                        type="checkbox" className="checkbox" checked={currentState}/>
                    </label>
                  </td>
                  <td>
                    { username }
                  </td>
                  <td>
                    { name }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            {/* if there is a button in form, it will close the modal */}
            {
              user &&
                <button 
                  className={`btn btn-primary`} 
                  onClick={()=> onUpdateHandler()}> 
                    Update 
                </button>

            }
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default AttendsModal;