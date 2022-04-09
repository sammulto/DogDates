import {render} from "@testing-library/react";
import Match from "../../match/MatchItem";

describe('Match page tests', () => {

    test('Show user infoBox', () => {
        const {queryByTestId} = render(<Match/>);

        const infoBox = queryByTestId("infoBox");
        expect(infoBox).toBeTruthy();
    });

    test('Show user info', () => {
        const {queryByTestId} = render(<Match/>);

        const info = queryByTestId("info");
        expect(info).toBeTruthy();
    });

    test('Show user photo', () => {
        const {queryByTestId} = render(<Match/>);

        const photo = queryByTestId("photo");
        expect(photo).toBeTruthy();
    });

    test('Show ownerName', () => {
        const {queryByText} = render(<Match/>);

        const ownerName = queryByText("person");
        expect(ownerName).toBeTruthy();
    });

    test('Show dogName', () => {
        const {queryByText} = render(<Match/>);

        const dogName = queryByText("pets");
        expect(dogName).toBeTruthy();
    });

    test('Show city', () => {
        const {queryByText} = render(<Match/>);

        const city = queryByText("place");
        expect(city).toBeTruthy();
    });

    test('Show email', () => {
        const {queryByText} = render(<Match/>);

        const email = queryByText("mail");
        expect(email).toBeTruthy();
    });

    test('Show description', () => {
        const {queryByText} = render(<Match/>);

        const description = queryByText("3p");
        expect(description).toBeTruthy();
    });
});
