import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/" className="flex items-center gap-2">
            <i className="iconlogo-headerDt"></i>
        </Link>
    );
};
export default Logo;
