import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

export const ToggleListings = () => {

    const handleToggle = (value) => {
        if (value === 1) {
            console.log('All Listings button clicked');
        } 
        else if (value === 2) {
            console.log('My Listings button clicked');
        }
    };

    return (
        <ToggleButtonGroup type="radio" name="options" defaultValue={1} className="toggle-group-button-listings" onChange={handleToggle}>
            <ToggleButton variant="outline-light" id="tbg-radio-2" value={1} className="toggle-button-listings">
                All listings
            </ToggleButton>
            <ToggleButton variant="outline-light" id="tbg-radio-1" value={2} className="toggle-button-listings">
                My listings
            </ToggleButton>
        </ToggleButtonGroup>
    );
}