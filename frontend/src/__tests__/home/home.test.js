import {render} from "@testing-library/react";
import Home from "../../home/pages/Home";

describe('Home page tests', () => {
    test('welcome words', () => {
        const {queryByText,queryByTestId} = render(<Home/>);

        const header = queryByText("Dog Dates");
        expect(header).toBeTruthy();

        const body = queryByTestId("body");
        expect(body).toBeTruthy();
    });

    test('welcome photo', () => {
        const {queryByTestId} = render(<Home/>);

        const photo = queryByTestId("photo");
        expect(photo).toBeTruthy();
    });

    test('RegisterButton', () => {
        const {queryByTestId} = render(<Home/>);

        const button = queryByTestId("button");
        expect(button).toBeTruthy();
    });
});

