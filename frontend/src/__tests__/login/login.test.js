import {render} from "@testing-library/react";
import Login from "../../login/pages/Login";

describe('Login page tests', () => {
    test('Log in words', () => {
        const {queryByText} = render(<Login/>);

        const header = queryByText("Log in");
        expect(header).toBeTruthy();
    });

    test('Email', () => {
        const {queryByTestId} = render(<Login/>);

        const email = queryByTestId("email");
        expect(email).toBeTruthy();
    });

    test('Password', () => {
        const {queryByTestId} = render(<Login/>);

        const password = queryByTestId("password");
        expect(password).toBeTruthy();
    });

    test('Error message', () => {
        const {queryByTestId} = render(<Login/>);

        const errorMsg = queryByTestId("errorMsg");
        expect(errorMsg).toBeTruthy();
    });

    test('Login button', () => {
        const {queryByTestId} = render(<Login/>);

        const button = queryByTestId("button");
        expect(button).toBeTruthy();
    });
});
