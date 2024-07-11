import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Market()
{
    const locationData=useLocation();
    const navigate=useNavigate();
    const username=locationData.state?.username;
  const [vegetables,setVegetables]=useState([]);
  const [quantities,setQuantities]=useState({});
  const[billdetails,setBilldetails]=useState([]);
   const[bill,setBill]=useState(0);
    const fetchingVegetables=async()=>{
         const response=await fetch("http://localhost:5000/fetchVegetables",
            {
                method:"GET",
                headers:{"Content-Type":"application/json"}
            }
        );

        const res=await response.json();
        setVegetables(res);
        
    }
    const handleQuantityChange=(event)=>
    {
      setQuantities(
        {
            ...quantities,
            [event.target.name]:parseInt(event.target.value,10),
        }
      );
    };
    const addCart=async(event)=>
    {
        event.preventDefault();
        const data={quantities};
        const response=await fetch("http://localhost:5000/addCart",
            {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data)
            }
        );
        const res=await response.json();
        alert(`you items are ${res.logInfoArray}`);
        setBill(res.bill);
        setBilldetails(res.logInfoArray);
    }
    useEffect(()=>
    {
        fetchingVegetables();
        
        
    },[]);
    useEffect(()=>
    {
        if(bill!==0)
            {
                alert(`bill is ${bill}`);
                navigate("/BillDetails",{state:{username:username,bill:bill}})
                
            }
    },[bill]);
    return(
        <div>
        <h1>market</h1>
        <form onSubmit={addCart}>
        <ul>
            {vegetables.map((veg,index)=>(
            <li key={index}>
                {veg.vegetable}:${veg.price}
                quantity:
                <input 
                type="number"
                name={veg.vegetable}
                value={quantities[veg.vegetable]|| 0}
                placeholder={`${veg.vegetable} quantity`}
                onChange={handleQuantityChange}
                />
            </li> 
            ))}
        </ul>
        <button type="submit">add to cart</button>
        </form>
        </div>
    );
}
export default Market;