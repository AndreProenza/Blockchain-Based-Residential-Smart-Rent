import logo from "../assets/log.svg"
import { useNavigate } from "react-router-dom";

import '../components-css/DisplayInitial.css';

export const DisplayInitial = () => {

    const navigate = useNavigate();

    return (
        <div className="align-center">
            <div className="align-center">
                <img src={logo} className="unlockit-logo" alt="unlockit-logo" />
                <p className="text-1">
                    Rebuilding the way 
                    <br/>
                    Real Estate is transacted
                </p>
            </div>
            <div>
                <p className="text-2">
                    Agents, buyers and sellers together in this journey
                    <br />
                    through a digital technology
                </p>
            </div>
            <div className="separator-1">

            </div>
            <div>
                <button className="green-button" onClick={() => navigate("/login")}>Login</button>
            </div>
            <div className="separator-2">

            </div>
            <div>
                <p className="text-3">powered by Web3 Technology</p>
            </div>
        </div>

    );
}
