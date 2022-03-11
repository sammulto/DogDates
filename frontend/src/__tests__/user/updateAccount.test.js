import {render} from "@testing-library/react";
import UpAccount from "../../user/pages/UpdateAccInfo";

describe('Update user info page tests', () => {
    test('Update account page words', () => {
        const {queryByText} = render(<UpAccount/>);

        const header = queryByText("Update Account Profile");
        expect(header).toBeTruthy();
    });

    test('Email', () => {
        const {queryByTestId} = render(<UpAccount/>);

        const email = queryByTestId("email");
        expect(email).toBeTruthy();
    });

    test('Password', () => {
        const {queryByTestId} = render(<UpAccount/>);

        const password = queryByTestId("password");
        expect(password).toBeTruthy();
    });

    test('Owner name', () => {
        const {queryByTestId} = render(<UpAccount/>);

        const ownerName = queryByTestId("ownerName");
        expect(ownerName).toBeTruthy();
    });

    test('Dog name', () => {
        const {queryByTestId} = render(<UpAccount/>);

        const dogName = queryByTestId("dogName");
        expect(dogName).toBeTruthy();
    });

    test('City', () => {
        const {queryByTestId} = render(<UpAccount/>);

        const city = queryByTestId("city");
        expect(city).toBeTruthy();
    });

    test('City drop down', () => {
        const {queryByTestId} = render(<UpAccount/>);

        const select_city = queryByTestId("select_city");
        expect(select_city).toBeTruthy();

        const winnipeg = queryByTestId("winnipeg");
        expect(winnipeg).toBeTruthy();

        const toronto = queryByTestId("toronto");
        expect(toronto).toBeTruthy();
    });

    test('Description', () => {
        const {queryByTestId} = render(<UpAccount/>);

        const description = queryByTestId("description");
        expect(description).toBeTruthy();
    });

    test('Error message', () => {
        const {queryByTestId} = render(<UpAccount/>);

        const errorMsg = queryByTestId("errorMsg");
        expect(errorMsg).toBeTruthy();
    });

    test('Update button', () => {
        const {queryByTestId} = render(<UpAccount/>);

        const button = queryByTestId("button");
        expect(button).toBeTruthy();
    });
});
