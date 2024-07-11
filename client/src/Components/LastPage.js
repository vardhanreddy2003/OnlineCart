import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
        <div>
            <h1>thank you for shopping in our shop</h1>
            <p>click here if you want to buy anything</p>
            <button onClick={handleClick}>click here</button>
            <p>click here if you want to logout</p>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
}
export default LastPage;