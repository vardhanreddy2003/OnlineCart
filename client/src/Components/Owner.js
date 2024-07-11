import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Owner()
{ 
  const navigate=useNavigate();
    const [res,setRes]=useState("");
    const[name,setName]=useState("");
    const [password,setPassword]=useState("");

    function handleName(event)
    {
        console.log(event.target.value);
        setName(event.target.value);
    }
    function handlePassword(event)
    {
        console.log(event.target.value);
        setPassword(event.target.value);
    }
    const  handleClick=async(event)=>{
        event.preventDefault();
        console.log(name);
        var ownerName=name;
        console.log(password);
        const data={ownerName,password};
        const validationOfOwner=await fetch("http://localhost:5000/ownerValidate",
            {
                method:"POST",
          headers:{"Content-Type":"application/json"},
            
            body:JSON.stringify(data)
            });
            const result=await validationOfOwner.json();
        console.log("json completed");
        setRes(result.message);
        
        
    }
    useEffect(()=>
        { 
          if(res==="validOwner")
            {
              alert("valid owner");
              navigate("/PriceChange");
            }
            else if(res==="invalidOwner")
              {
                alert("invalid owner");
                window.location.reload();
              }
              
            
           
        },[res]);
    
  return(
    <div id="login">
    <form name="form-login" onSubmit={handleClick}>
    <span class="fontawesome-user"></span>
     <input type="text" value={name} onChange={handleName} placeholder="owner name"/>
     <span class="fontawesome-lock"></span>
     <input type="password" value={password} onChange={handlePassword} placeholder="password" />
      <button type="submit">submit</button>
  </form>
  </div>
  );
}
export default Owner;