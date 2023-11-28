import { useUserContext } from "../../context/UserContext";

const SubscribeModal = ({ id="", onSubscribe = () => {}, expo={} }) => {
  const { user } = useUserContext();

  const alreadySub = expo.subs?.findIndex(_u => user.username === _u.username) >= 0;

  return (
    <dialog id={id} className="modal">
      <div className="modal-box flex flex-col gap-3">
        <h3 className="font-bold text-xl">{ expo.project }</h3>
        <div className="chat chat-start">
          <div className="chat-bubble"> This presentation will be given by team { expo.team?.name } (#{ expo.team?.number } - section { expo.team?.section }) </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble"> It will be on { new Date(expo.date).toLocaleDateString("en", { dateStyle: "long" }) } </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble"> At { new Date(expo.date).toLocaleTimeString(undefined, { hour12: false }).replace(/:..$/, "") } </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble">
            {
              alreadySub ? "Oh! it seams you are already subscribed, Do you want to unsubscribe to it?" :
                "Do you want to subscribe to it?"
            }
          </div>
        </div>
        {
          !user &&
            (
              <div className="chat chat-start">
                <div className="chat-bubble"> But first, you have to login </div>
              </div>
            )
        }
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            {/* if there is a button in form, it will close the modal */}
            {
              user &&
                <button 
                  className={`btn ${alreadySub ? "btn-error": "btn-primary"}`} 
                  onClick={()=> onSubscribe(expo._id, alreadySub)}> 
                    { alreadySub ? "Unsubscribe" : "Subscribe" } 
                </button>

            }
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default SubscribeModal;