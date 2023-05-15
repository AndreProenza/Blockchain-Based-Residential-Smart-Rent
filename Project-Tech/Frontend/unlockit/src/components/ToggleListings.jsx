import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

export const ToggleListings = () => {
    return (
        <ToggleButtonGroup type="radio" name="options" defaultValue={1} className="toggle-group-button-listings">
            <ToggleButton variant="outline-light" id="tbg-radio-1" value={1} className="toggle-button-listings">
                My listings
            </ToggleButton>
            <ToggleButton variant="outline-light" id="tbg-radio-2" value={2} className="toggle-button-listings">
                All listings
            </ToggleButton>
        </ToggleButtonGroup>
    );
}