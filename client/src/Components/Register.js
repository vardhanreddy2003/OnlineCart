import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Css/Register.css'
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
    <div className="register-container">
      <div className="register-innerContainer">
      <h1 style={{ width:'100%',color:'orange',alignItems:'center',display:'flex',justifyContent:'center'}}>Register Form</h1>
      <div className="register-line"></div>
      <form onSubmit={handleRegister} >
        <div className="register-nameContainer">
          <h3>Name:</h3>
          <input type="name" placeholder="Enter your name" className="register-input" value={name} onChange={handleName}/>
        </div>
        <div className="register-passwordContainer">
          <h3>Password:</h3>
          <input type="password" placeholder="Enter password" value={password} className="register-input" onChange={handlePassword}/>

        </div>
        <div className="register-btnClass">
          <button type="submit " className="register-submitBtn">Register</button>
        </div>
          </form>

      </div>
        
  
    </div>

  );
}
export default Register;