import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register()
{
  const navigate=useNavigate();
  const[message,setMessage]=useState("");
    const[name,setName]=useState("");
    const[password,setPassword]=useState("");
    function handleName(event)
    {
      
      setName(event.target.value);
    }
    function handlePassword(event)
    {
      
      setPassword(event.target.value);
    }
    const handleRegister=async(event)=>
      {
       event.preventDefault();
      
       const data={name,password};
       const registration=await fetch("http://localhost:5000/userRegister",
        {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(data)
        });
        const register=await registration.json();
        setMessage(register.message);
      }
      useEffect(()=>
      {
         if(message==="registered")
          {
            navigate("/");
          }
          else if(message==="validuser")
            {
              alert("you already have an account");
              navigate("/");
            }
           else if(message==="namenotavailable")
            {
              alert("try another username");
              window.location.reload();
            } 
      });
      
  return(
    <div>
        <form onSubmit={handleRegister} >

           name:<input type="name" placeholder="enter you name" value={name} onChange={handleName}/>
           password:<input type="password" placeholder="enter the password" value={password} onChange={handlePassword}/>
           <button type="submit ">Register</button>
        </form>
  
  
    </div>

  );
}
export default Register;