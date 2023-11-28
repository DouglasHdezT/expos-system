import { toast } from "react-toastify";
import { useUserContext } from "../context/UserContext";
import background from "../assets/bg-login.jpg";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useUserContext();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
 
    const identifier = formData.get("identifier");
    const password = formData.get("password");

    const status = await login(identifier, password);

    if(status) {
      toast("Login successful!", { type: "success" });
      navigate("/");
    } else {
      toast("Something wrong!", { type: "error" });
    }
  }

  return (
    <main style={{ backgroundImage: `url("${background}")` }}
      className="hero p-4 w-full min-h-screen flex justify-center items-center relative">
      <div className="absolute inset-0 bg-primary-content bg-opacity-60"/>

      <div className="hero prose-sm 
        p-6 max-w-lg bg-base-200 rounded-md 
        flex flex-col gap-4 items-stretch z-[1]">
        
        <h1 className="m-0"> Login </h1>

        <form onSubmit={onSubmitHandler}
          className="flex flex-col gap-2">
          <label className="label flex flex-col gap-1">
            <span className="label-text self-start"> Username / Email </span>
            <input type="text" name="identifier" className="input input-bordered input-primary w-full"/>
          </label>

          <label className="label flex flex-col gap-1">
            <span className="label-text self-start"> Password </span>
            <input type="password" name="password" className="input input-bordered input-primary w-full"/>
          </label>
          
          <input type="submit" className="btn btn-primary" value="Login"/>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;