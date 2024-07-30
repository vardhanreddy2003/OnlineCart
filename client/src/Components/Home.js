import { Link } from "react-router-dom";
import '../Css/Home.css'
import customer from '../Css/images/customer.jpg';
import owner from '../Css/images/owner.jpg';
function HomePage()
{
    return(
        <div className="home-container">
            <div className="home-textContainer">
                <h1 style={{marginTop:'50px',fontFamily:'cursive'}} className="home-text">Welcome to the Store . </h1>
            </div>
            <div className="home-content">
                <div className="home-customer">
                    <img src={customer} style={{height:'200px', width:'300px',borderRadius:'10%'}}/>
                    <div className="home-link">
                        <Link style={{borderRadius:'20px',color:'orange', textDecoration:'none', background:'white',padding:'10px',fontFamily:'cursive'}}  to="/Login">Customer Login</Link>
                    </div>
                </div>
                <div className="home-owner">
                    <img src={owner} style={{height:'200px',width:'300px', borderRadius:'10%'}}/>
                    <div className="home-link">
                        <Link style={{borderRadius:'20px',color:'orange', textDecoration:'none', background:'white',padding:'10px', fontFamily:'cursive'}}  to="/owner">Owner Login</Link>
                    </div>
                </div>
                
            </div>
        </div>
        
    );
}
export default HomePage;