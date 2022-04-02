import {render} from "@testing-library/react";
import MyMatches from "../../home/components/MyMatchesButton";

describe('Sign In Component Tests', () => {

    test('Render standard component', () => {
        const {queryByText} = render(<MyMatches/>);
        const MyMatchesButton = queryByText("My Matches");
        expect(MyMatchesButton).toBeTruthy();
    });
});
