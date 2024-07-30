import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../Css/Owner.css'
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
              // alert("valid owner");
              navigate("/PriceChange");
            }
            else if(res==="invalidOwner")
              {
                alert("invalid owner");
                window.location.reload();
              }
              
            
           
        },[res]);
    
  return(
    <div className="owner-container">
      <div className='owner-innerContainer'>
      <h1 style={{ width:'100%',color:'orange',alignItems:'center',display:'flex',justifyContent:'center'}}>Owner Login</h1>
      <div className="owner-line"></div>
    <form name="form-login" onSubmit={handleClick}>
        <div className="owner-nameContainer">
          <h3>Name:</h3>
          <input type="name" value={name} onChange={handleName} placeholder="Enter Owner name" className="owner-input"/>
        </div>
        <div className="owner-passwordContainer">
          <h3>Password:</h3>
          <input type="password" value={password} onChange={handlePassword} placeholder="Enter password" className="owner-input"/>
        </div>
        <div className="owner-btnClass">
          <button type="submit" className="owner-submitBtn">Login</button>
        </div>
  </form>
  </div>

  </div>
  );
}
export default Owner;