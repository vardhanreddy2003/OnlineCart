import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../Css/Login.css'
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

        <div className="login-container">
          <div className="login-innerContainer">
            <h1 style={{ width:'100%',color:'orange',alignItems:'center',display:'flex',justifyContent:'center'}}>Login Form</h1>
            <div className="login-line"></div>
          <form onSubmit={handleClick}>
            <div className="login-nameContainer">
              <h3>Name:</h3>
              <input type="text" value={name} onChange={handleName}  className="login-input" placeholder="Enter Username"/>
            </div>
            <div className="login-passwordContainer">
              <h3>Password:</h3>
              <input type="password" value={password} onChange={handlePassword} className="login-input" placeholder="Enter Password"/>    
            </div>   
            <div className="login-btnClass">
              <button type="submit" className="login-submitBtn">Login</button>
            </div>
            <div className="login-register">
                <p>Don't have an account?</p>
                <Link to="/Register" style={{borderRadius:'20px',color:'orange', textDecoration:'none',padding:'10px',fontFamily:'cursive'}}>Register</Link>
            </div>
          </form>
            
          </div>
            

        </div>
    );

}
export default Login;