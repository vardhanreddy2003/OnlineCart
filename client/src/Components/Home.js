import { Link } from "react-router-dom";
function HomePage()
{
    return(
        <div>
        <div>
            <p>click here to if you are an customer</p>
            <Link  to="/Login">Customer Login</Link>
        </div>

        <div>
            <p>click here if you are a owner</p>
            <Link to="/Owner">owner</Link>
            </div>
    </div>
    );
}
export default HomePage;