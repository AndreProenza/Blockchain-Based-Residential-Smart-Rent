import { DisplayInitial } from "../components/DisplayInitial";
import { NavigatorInitial } from "../components/NavigatorInitial";

import '../components-css/DisplayInitial.css';


export const Initial = () => {
    return (
      <>
        <div className="banner">
          <NavigatorInitial />  
          <DisplayInitial />
        </div>
      </>
    );
};