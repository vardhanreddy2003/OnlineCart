import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import v1 from '../Css/images/v1.jpg';
import v2 from '../Css/images/v2.jpg';
import v3 from '../Css/images/v3.png';
import v4 from '../Css/images/v4.jpg';
import v5 from '../Css/images/v5.jpg';
import v6 from '../Css/images/v6.png';
import '../Css/Market.css'
function Market()
{
    const vegetableArray=[v1,v2,v3,v4,v5,v6];
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
                navigate("/BillDetails",{state:{username:username,bill:bill}})
                
            }
    },[bill]);
    return(
        <div className="market-container">
        <h1 style={{marginTop:'10px'}}>Items in market</h1>
        <form onSubmit={addCart}>
            <div className="market-gridContainer">
            {vegetables.map((veg,index)=>(
            <div key={index} className="market-vegetable">
                <div className="market-nameContainer">
                    <h3>{veg.vegetable.toUpperCase()}</h3>
                    <img src={vegetableArray[index%6]} style={{height:'30%',width:'30%',borderRadius:'50%'}}/>
                </div>
                <div className="market-price">
                    <h4 style={{color:'#004d00'}}>Rate per Kg </h4>
                    <h3>&#x20B9;{veg.price}</h3>
                </div>
                <div className="market-priceInput">
                    <h4>Kgs</h4>
                <input 
                type="number"
                name={veg.vegetable}
                value={quantities[veg.vegetable]|| 0}
                placeholder={`${veg.vegetable} quantity`}
                onChange={handleQuantityChange}
                className="market-input"
                />
                </div>
                
            </div>
             
            ))}
            
            </div>
            <div className="market-btnClass">
                <button type="submit" className="market-submitBtn">Add to cart</button>        
            </div>
            </form>
            
        </div>
    );
}
export default Market;