import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import '../Css/LastPage.css'
function LastPage()
{ 
    const locationData=useLocation();
    const navigate=useNavigate();
    const username=locationData.state?.username;
    function handleClick()
    {
        navigate("/Market",{state:{username:username}});
    }
    function handleLogout()
    {
        navigate("/");
    }
    return(
        <div className="lastPage-container">
            <div className="lastPage-innerContainer">
                <h1 style={{ width:'100%',color:'orange',alignItems:'center',display:'flex',justifyContent:'center'}}>Thank You For Shopping in Our Shop</h1>
                <div className="lastPage-line"></div>
                <div className="lastPage-btnClass">
                    <button className="lastPage-submitBtn" onClick={handleClick}>Buy Something else?</button>
                    <button className="lastPage-submitBtn" onClick={handleLogout}>logout</button>    
                </div>
                
            </div>
            
        </div>
    );
}
export default LastPage;