import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../Css/PriceChange.css'
function PriceChange()
{
    const[vegetables,setVegetables]=useState([]);
    const[status,setStatus]=useState("");
    const [vegetable, setSelectedVegetable] = useState('');
  const [price, setPrice] = useState(0);
  const[intialprice,setIntialPrice]=useState(0);
  const[vegetablename,setVegetableName]=useState("");
     const handleVegetableChange = (e) => {
    setSelectedVegetable(e.target.value);
  };
  const handleIntialPriceChange = (e) => {
    setIntialPrice(e.target.value);
  };
  const handleVegetablename = (e) => {
    setVegetableName(e.target.value);
  };
  


  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

    const fetchingVegetables=async()=>

    {
        const response=await fetch("http://localhost:5000/fetchVegetables",
            {
                method:"GET",
                headers:{"Content-Type":"application/json"}
            }
        );

    const res=await response.json();
    console.log(res);
    setVegetables(res);
       
   };
   const removeVegetable=async()=>
   {
    console.log(vegetable);
    const data={vegetable}
    const response=await fetch("http://localhost:5000/removeVegetable",
        {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }
    );
    console.log(response);
    const res= await response.json();
    setStatus(res.message);

   }
   const handleClick=async(event)=>
   {
    event.preventDefault();
    alert(`the vegetable you want to insert is ${vegetablename}`);
    alert(`the ${vegetablename} price is${intialprice}`);
    const data={vegetablename,intialprice};
    const response=await fetch("http://localhost:5000/insertVegetable",
        {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }
    );
    console.log(response);
     const res= await response.json();
     setStatus(res.message);

   }
   const  onModification=async(event)=>
    {
     event.preventDefault();
     alert(vegetable);
     alert(price);
     const data={vegetable,price};
     const response=await fetch("http://localhost:5000/priceModification",
         {
             method:"POST",
             headers:{"Content-Type":"application/json"},
             body:JSON.stringify(data)
         }
     );
     console.log(response);
     const res= await response.json();
     setStatus(res.message);
     
    }
    const allocateCoupon=async()=>
    {
        const response=await fetch("http://localhost:5000/allocateCoupon",
            {
                method:"POST",
                headers:{"Content-Type":"application/json"}
            }
        );
        console.log(response);
        const res= await response.json();
        setStatus(res.message);

    }
    useEffect(()=>
     {
        if(status!=="")
         {
             alert(status);
             window.location.reload();
         }
         else if(status==="deleted")
         {
            alert(status);
            window.location.reload();
         }
         else if(status==="inserted")
         {
            alert("vegetable inserted");
            window.location.reload();
         }
         else if(status==="present")
         {
            alert("vegetable already present");
            window.location.reload();
         }
     },[status]);
 
   useEffect(()=>
    {
       fetchingVegetables();
    },[]);
  return (
    <div className="priceChange-container">
    <div className="priceChange-innerContainer">
        <h1>If you want to change the price of any vegetable select from below</h1>
        <div onChange={handleVegetableChange}>
            {vegetables.map((veg,index)=>(
            <div key={index}>
                <input
                type="radio"
                name="vegetable"
                value={veg.vegetable}
                />
                 <label htmlFor={veg.vegetable}>{veg.vegetable} and its price is &#x20B9;{veg.price}</label>
           </div>
            )
            )}
        </div>

price:<input type="number" value={price} placeholder="enter modified price" onChange={handlePriceChange} />
<div className="priceChage-btnClass">
    <button type="submit" className="priceChange-submitBtn" onClick={onModification}>Click to Change</button>
    <button type="submit" className="priceChange-submitBtn" onClick={removeVegetable}>Click to Delete</button>
</div>
<div>
    <h2>If you want to add any vegetables</h2>
    <form onSubmit={handleClick}>
        <div className="priceChange-inputField">
            <div className="priceChange-vegetable">
                Vegetable name:  <input type="text" value={vegetablename} onChange={handleVegetablename} className="priceChange-input"/>
            </div>
            <div className="priceChange-vegetable">
                Price: <input type="text" value={intialprice} onChange={handleIntialPriceChange} className="priceChange-input"/>
            </div>
        </div>
    
            <div className="priceChange-btnClass">
                <button type="submit" className="priceChange-submitBtn">Submit</button>
            </div>
            
            </form>
            <div>
        <h2 className="priceChange-innerContainer" style={{marginTop:'-20px'}}>Coupon Allocation</h2>
        <button onClick={allocateCoupon} className="priceChange-submitBtn">Allocate</button>
    </div>
    </div>
    
    <div className="priceChange-link">
    <Link to="/" style={{borderRadius:'20px',color:'white', textDecoration:'none', background:'orange',padding:'10px', fontFamily:'cursive'}}>logout</Link>
    </div>

</div>
    </div>
  );
}
export default PriceChange;