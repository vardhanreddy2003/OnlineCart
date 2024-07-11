import Express from "express";
import {studentCollection}  from "../db/ConnectToDB.js";
import { vegetableCollection } from "../db/ConnectToDB.js";
import { ownerCollection } from "../db/ConnectToDB.js";
import { couponCollection } from "../db/ConnectToDB.js";

const router=Express.Router();
const app=Express();
app.use(Express.json());




const addUser=async(name,password)=>
  {
   const details={
      name:name,
      password:password,
    };
    
     try{
      console.log(" iam vardhan");
      console.log(name);
      const result= await studentCollection.insertOne(details);
      console.log("record saved",result);
      
      
     }
     catch(error)
     {
      console.error("error saving user",error);
     }
  };

  const billGeneration = async(quantities)=>
    {
    var bill=0;
    const logInfoArray = [];
     

      if (quantities && typeof quantities === "object") {
        for (const key in quantities) {
          if (quantities.hasOwnProperty(key)) {
            if(quantities[key]>0){
              console.log(key);
            const price=await vegetableCollection.findOne({vegetable: key});
          const vegetablePrice=(price.price)*(quantities[key]);
          bill+=vegetablePrice;
          const logInfo=`amount for the ${quantities[key]} kgs of ${key} : ${vegetablePrice}`;     
        logInfoArray.push(logInfo);
            }
          }
        }
    }
    console.log(logInfoArray);
    console.log(`total bill is${bill}`);
    return {bill,logInfoArray};
  }
app.use(Express.urlencoded({ extended: true }));

router.get("/",(req,res)=>
{
    res.send("hello world");
    
});

router.get("/fetchVegetables",async(req,res)=>
{
  var vegetables=[];
  try{
    vegetables = await vegetableCollection.find({}).toArray();
  
  }
  catch(error)
  {
    console.error("error fetching vegetables",error);
  }
  
    res.json(vegetables);
});
router.post("/allocateCoupon",async(req,res)=>
{
  const user = await couponCollection.find().sort({ bill: -1 }).limit(1).toArray();
  var name;
if (user.length > 0) {
  console.log(user[0].name);
  name=user[0].name;
} else {
  console.log("No users found");
}

try{
  const result=await couponCollection.updateOne({name:name},
    {
      $set:
      {
       coupon:"available"
      }
    }
  );
  console.log(result.modifiedCount);
  
  if (result.modifiedCount > 0) {
    console.log("success");
    return res.json({message:"allocated"});
  } else {
    console.log("unsuccess");
   return  res.json({ message: "not allocated" });
  }
}
catch(error)
{
  console.log("error occured",error);
  return res.status(500).json({ message: "An error occurred while allocating" });
}
  
});

router.post("/userValidate",async(req,res)=>
{
  const {name,password}=req.body;

  
    const user=await studentCollection.findOne({name: name,password:password});
    if(user===null){
      
        res.json({message:"invaliduser"});
    }
    else
    {
    if((name===user.name)&&(password===user.password))
      {
        res.json({message: "valideuser"});
      }
      else if((name===user.name)&&(password!=user.password))
      {
        console.log(name===user.name);
        res.json({message:"wrongpassword"});
      }
    }
    
});

router.post("/userRegister",async(req,res)=>
{
  const {name,password}=req.body;
  console.log("reached to server");
  console.log(name);
  const user=await studentCollection.findOne({name:name});
  if(user===null){
  addUser(name,password);
  res.json({message: "registered"});
  }
  else
  {
    if((name===user.name)&&(password===user.password))
      {
        res.json({message: "validuser"});
      }
      else if((name===user.name)&&(password!=user.password))
      {
        console.log(name===user.name);
        res.json({message:"namenotavailable"});
      }
  }

});
router.post("/ownerValidate",async(req,res)=>
{
   const{ownerName,password}=req.body;
   console.log(ownerName);
  console.log(password);
   const owner=await ownerCollection.findOne({name: ownerName,password: password});
   console.log(owner);
   if(owner===null)
    {
      res.json({message:"invalidOwner"});
    }
    else{
      res.json({message:"validOwner"})
    }
});

router.post("/addCart",async(req,res)=>
{
  const { quantities } = req.body; // Destructure quantities from req.body
  
  const {bill,logInfoArray}= await billGeneration(quantities);
  console.log(bill);
  console.log(logInfoArray);
   res.json({message:"bill received",
    bill:bill,
    logInfoArray:logInfoArray
   });
});

router.post("/priceModification",async(req,res)=>
{
  const{vegetable,price}=req.body;
  console.log(vegetable);
  let pr=parseInt(price);
  if(pr===0)
  {
    return res.json({message:"please enter the price"});
  }
  try{
  const result=await vegetableCollection.updateOne({vegetable:vegetable},
    {
      $set:
      {
        price:pr
      }
    }
  );
  console.log(result.modifiedCount);
  
  if (result.modifiedCount > 0) {
    console.log("success");
    return res.json({message:"modified"});
  } else {
    console.log("unsuccess");
   return  res.json({ message: "No matching vegetable found or price is the same" });
  }
}
catch(error)
{
  console.log("error occured",error);
  return res.status(500).json({ message: "An error occurred while updating the price" });
}

});
router.post("/checkCoupon",async(req,res)=>
{
   const{username}=req.body;
   console.log(username);
   const user=await couponCollection.findOne({name: username});
   if(user!==null){
   if(user.coupon==="available")
   {
    return res.json({message:"couponok"});
   }
   else{
   return res.json({message:"couponnotok"});
   }
  }
  else{
    return res.json({message:"couponnotok"});
  }
  
  
   
  
});
router.post("/insertVegetable",async(req,res)=>
{
  const{vegetablename,intialprice}=req.body;
  
  const user=await vegetableCollection.findOne({vegetable:vegetablename});
  if(user===null)
  {
    if(intialprice===0)
    {
      return res.json({message:"please enter the price"});
    }
    const details={
      vegetable:vegetablename,
      price:intialprice,
    };
    const result=await vegetableCollection.insertOne(details);
    console.log("resulted saved",result);
    return res.json({message:"inserted"});
  }
  else{
   return  res.json({message:"present"});
  }
});
router.post("/checkOut",async(req,res)=>{
  const{Bill,coupon,username}=req.body;
  const user=await couponCollection.findOne({name:username});
  
  //if user is not registered in coupon table means this is first payment by the customer.
  if(user===null)
  {
    const details={
      name:username,
      bill:Bill,
      coupon:"",
    };
    const result= await couponCollection.insertOne(details);
    console.log("resulted saved",result);
    res.json({message:"completed"});
  }
  else{
    //if coupon is not there or not applied.
    if((coupon==="notapplied")||(coupon===""))
    {
      var updatedBill=user.bill;
      updatedBill+=Bill;
      console.log("udpated is");
      console.log(updatedBill);
      try{
        const result=await couponCollection.updateOne({name:username},
          {
            $set:
            {
              bill:updatedBill
            }
          }
        );
        console.log(result.modifiedCount);
        
        if (result.modifiedCount > 0) {
          console.log("success");
          return res.json({message:"completed"});
        } else {
          console.log("unsuccess");
         return  res.json({ message: "No matching record" });
        }
      }
      catch(error)
      {
        res.json({message:"error occured"});
      }
    }
    else
    {
      var updatedBill=user.bill;
      updatedBill+=Bill;
      console.log("udpated is");
      console.log(updatedBill);
      try{
        const result=await couponCollection.updateOne({name:username},
          {
            $set:
            {
              bill:updatedBill,
              coupon:""
            }
          }
        );
        console.log(result.modifiedCount);
        
        if (result.modifiedCount > 0) {
          console.log("success");
          return res.json({message:"completed"});
        } else {
          console.log("unsuccess");
         return  res.json({ message: "No matching record" });
        }
      }
      catch(error)
      {
        res.json({message:"error occured"});
      }
    }
  }
  
});
router.post("/removeVegetable",async(req,res)=>
{
  const{vegetable}=req.body;
  console.log(vegetable);
  try {
    const deletedVegetable = await vegetableCollection.findOneAndDelete({ vegetable:vegetable });
    if (deletedVegetable) {
        console.log(`Deleted vegetable: ${deletedVegetable.name} with price: ${deletedVegetable.price}`);
        res.json({message:"deleted"});
    } else {
        console.log("No matching vegetable found to delete.");
        res.json({message: "not deleted"});
    }
} catch (error) {
    console.error("Error deleting vegetable:", error);
    res.json({message:"error"});
}
});
export default router;