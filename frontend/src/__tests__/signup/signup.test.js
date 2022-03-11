import {render} from "@testing-library/react";
import Signup from "../../signup/pages/Signup";

describe('Sign up page tests', () => {
    test('Sign up words', () => {
        const {queryByTestId} = render(<Signup/>);

        const header = queryByTestId("header");
        expect(header).toBeTruthy();
    });

    test('Email', () => {
        const {queryByTestId} = render(<Signup/>);

        const email = queryByTestId("email");
        expect(email).toBeTruthy();
    });

    test('Password', () => {
        const {queryByTestId} = render(<Signup/>);

        const password = queryByTestId("password");
        expect(password).toBeTruthy();
    });

    test('Owner name', () => {
        const {queryByTestId} = render(<Signup/>);

        const ownerName = queryByTestId("ownerName");
        expect(ownerName).toBeTruthy();
    });

    test('Dog name', () => {
        const {queryByTestId} = render(<Signup/>);

        const dogName = queryByTestId("dogName");
        expect(dogName).toBeTruthy();
    });

    test('City', () => {
        const {queryByTestId} = render(<Signup/>);

        const city = queryByTestId("city");
        expect(city).toBeTruthy();
    });

    test('City drop down', () => {
        const {queryByTestId} = render(<Signup/>);

        const select_city = queryByTestId("select_city");
        expect(select_city).toBeTruthy();

        const winnipeg = queryByTestId("winnipeg");
        expect(winnipeg).toBeTruthy();

        const toronto = queryByTestId("toronto");
        expect(toronto).toBeTruthy();
    });

    test('Description', () => {
        const {queryByTestId} = render(<Signup/>);

        const description = queryByTestId("description");
        expect(description).toBeTruthy();
    });

    test('Error message', () => {
        const {queryByTestId} = render(<Signup/>);

        const errorMsg = queryByTestId("errorMsg");
        expect(errorMsg).toBeTruthy();
    });

    test('Signup button', () => {
        const {queryByTestId} = render(<Signup/>);

        const button = queryByTestId("button");
        expect(button).toBeTruthy();
    });
});
