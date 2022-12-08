import { Link } from "react-router-dom";

const Navigation = () => {
    return (
    <>
        {/* creating a nav to go about and home 
        we can use simple anchor <a> tags but it will refresh the page
        so there is another link tag which we will use  */}
        <Link to='/'> Home </Link>
        <Link to='/about'> About </Link>
    </>
    )
};

export default Navigation;