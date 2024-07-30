import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LastPage from './LastPage';
import '../Css/BillDetails.css';
function BillDetails()
{  
     const navigate=useNavigate();
     const locationData=useLocation();
     const username=locationData.state?.username;
     const bill=locationData.state?.bill;
    const[coupon,setCoupon]=useState("");
    const[Bill,setBill]=useState(bill);
    const[message,setMessage]=useState("");
    const checkForCoupon=async(event)=>
    {
        event.preventDefault();
        const data={username};
        const response=await fetch("http://localhost:5000/checkCoupon",
            {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data)
            }
        );
        const coupon=await response.json();
         
         if(coupon.message==="couponok")
         {
            const bill=Bill/2;
            setBill(bill);
            setCoupon("applied");
            alert("you have coupon and coupon has been applied");
         }
         else{
            alert("there is no coupon available for you");
            setCoupon("notapplied");
         }
    }
    const checkOut=async(event)=>
    {
        event.preventDefault();
        
        const data={Bill,coupon,username};
        const response=await fetch("http://localhost:5000/checkOut",
            {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data)
            }
        );
        const res= await response.json();
        setMessage(res.message);
    }
    useEffect(()=>
    {
       if(message==="completed")
       {
        navigate("/last",{state:{username:username}});
       }
    },[message]);
    
    return(
        <div className="billDetails-container">
            <div className="billDetails-innerContainer">
            <h1 style={{ width:'100%',color:'orange',alignItems:'center',display:'flex',justifyContent:'center'}}>Bill Details</h1>
            <div className="billDetails-line"></div>
                <div className="billDetails-bill">
                    <h2>Total Bill : </h2>
                    <h2 style={{color:'green'}}>&#x20B9;{Bill}</h2>
                </div>
                <div className="billDetails-btnClass">
                    <button onClick={checkForCoupon} className="billDetails-submitBtn">Check for any coupon</button>
                    <button onClick={checkOut} className="billDetails-submitBtn">Proceed to checkout</button>    
                </div>
                {/* <LastPage/> */}
            </div>
            
        </div>
    );
}
export default BillDetails;