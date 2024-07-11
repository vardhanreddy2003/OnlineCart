import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function Login()
{
    const navigate=useNavigate();
    const [res,setRes]=useState("");
    const[name,setName]=useState("");
    const [password,setPassword]=useState("");

    function handleName(event)
    {
      
        setName(event.target.value);
    }
    function handlePassword(event)
    {
        
        setPassword(event.target.value);
    }
    const  handleClick=async(event)=>{
        event.preventDefault();
        const data={name,password};
        const validationOfUser=await fetch("http://localhost:5000/userValidate",
            {
                method:"POST",
          headers:{"Content-Type":"application/json"},
            
            body:JSON.stringify(data)
            });
            const result=await validationOfUser.json();
        
        setRes(result.message);
        
        
    }
    useEffect(()=>
        { 
          if(res==="valideuser")
            {
              navigate("/Market",{state:{username:name}});
            }
            else if(res==="wrongpassword")
              {
                alert("wrong password");
                window.location.reload();
              }
              else if(res==="invaliduser"){
                alert("you don't have any account");
                 navigate("/Register");
              }
           
        },[res]);
    

    return(

        <div>

            <form onSubmit={handleClick}>
              Name:  <input type="text" value={name} onChange={handleName} /> <br></br>
               Password: <input type="password" value={password} onChange={handlePassword} />
                <button type="submit">submit</button>
            </form>
            <div>
                <p>dont you have an account?</p>
                <Link to="/Register">Register</Link>
            </div>

        </div>
    );

}
export default Login;