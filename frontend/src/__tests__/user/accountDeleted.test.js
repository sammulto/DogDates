import {render} from "@testing-library/react";
import AccountDeleted from "../../user/pages/AccountDelected";

describe('Account deleted page tests', () => {
    test('Goodbye header', () => {
        const {queryByText} = render(<AccountDeleted/>);

        const header = queryByText("Hope To See You Again");
        expect(header).toBeTruthy();
    });

    test('Goodbye body1', () => {
        const {queryByText} = render(<AccountDeleted/>);

        const body1 = queryByText("We're sorry to see you go.");
        expect(body1).toBeTruthy();
    });

    test('Goodbye header2', () => {
        const {queryByText} = render(<AccountDeleted/>);

        const body2 = queryByText("Your account has been deleted.");
        expect(body2).toBeTruthy();
    });

});
