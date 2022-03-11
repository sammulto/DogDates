import {render} from "@testing-library/react";
import InfoUpdated from "../../user/pages/InfoUpdated";

describe('Info updated page tests', () => {
    test('Updated message', () => {
        const {queryByText} = render(<InfoUpdated/>);

        const message = queryByText("Your account profile has been updated, please log in again.");
        expect(message).toBeTruthy();
    });
});
