import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { useSelector } from 'react-redux';

export const ToggleListings = (props) => {

    // const { getAllAdvertisesByUserId, getAllAdvertisesByLocation, advertises } = props;

    // const listings = useSelector((state) => state.listings);

    // const handleToggle = (value) => {
    //     if (value === 1) {
    //         console.log('Listings button clicked');
    //         if (listings.location !== "") {
    //             getAllAdvertisesByLocation();
    //         }
    //     }
    //     else if (value === 2) {
    //         console.log('My Listings button clicked');
    //         getAllAdvertisesByUserId();
    //     }
    // };

    // return (
    //     <ToggleButtonGroup type="radio" name="options" defaultValue={1} className="toggle-group-button-listings" onChange={handleToggle}>
    //         <ToggleButton variant="outline-light" id="tbg-radio-2" value={1} className="toggle-button-listings">
    //             Listings
    //         </ToggleButton>
    //         <ToggleButton variant="outline-light" id="tbg-radio-1" value={2} className="toggle-button-listings">
    //             My Listings
    //         </ToggleButton>
    //     </ToggleButtonGroup>
    // );
}