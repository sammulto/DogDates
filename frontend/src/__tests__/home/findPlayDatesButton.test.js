import {render} from "@testing-library/react";
import FindPlayDates from "../../home/components/FindPlayDatesButton";

describe('Sign In Component Tests', () => {

    test('Render standard component', () => {
        const {queryByText} = render(<FindPlayDates/>);
        const PlayDatesButton = queryByText("Find Play Dates");
        expect(PlayDatesButton).toBeTruthy();
    });
});
