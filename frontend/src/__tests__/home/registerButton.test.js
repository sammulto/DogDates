import {render} from "@testing-library/react";
import Signup from "../../home/components/RegisterButton";

describe('Sign In Component Tests', () => {

    test('Render standard component', () => {
        const {queryByText} = render(<Signup/>);
        const signIn = queryByText("Sign Up");
        expect(signIn).toBeTruthy();
    });
});