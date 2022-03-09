import {render} from "@testing-library/react";
import Account from "../../user/pages/Account";

describe('Account page tests', () => {
    test('Expired access', () => {
        const {queryByText} = render(<Account/>);

        const expired = queryByText("Your session is expired, please log out and log in again.");
        expect(expired).toBeTruthy();
    });
});
