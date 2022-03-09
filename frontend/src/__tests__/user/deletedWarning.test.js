import {render} from "@testing-library/react";
import DeleteWarning from "../../user/pages/DeleteAccountWarning";

describe('Delete account warning tests', () => {
    test('warning words', () => {
        const {queryByText} = render(<DeleteWarning/>);

        const warningHeader = queryByText("You're Deleting Your Account!");
        expect(warningHeader).toBeTruthy();

        const warningBody = queryByText("You won't be able to access your profile once your account is deleted.");
        expect(warningBody).toBeTruthy();
    });

    test('Go Back button', () => {
        const {queryByTestId} = render(<DeleteWarning/>);

        const goBack = queryByTestId("goBack");
        expect(goBack).toBeTruthy();
    });

    test('Delete My Account button', () => {
        const {queryByTestId} = render(<DeleteWarning/>);

        const deleteAccount = queryByTestId("deleteAccount");
        expect(deleteAccount).toBeTruthy();
    });
});

