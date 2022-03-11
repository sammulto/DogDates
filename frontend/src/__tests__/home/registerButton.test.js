import {render} from "@testing-library/react";
import Register from "../../home/components/RegisterButton";

describe('Sign In Component Tests', () => {

    test('Render standard component', () => {
        const {queryByText} = render(<Register/>);
        const register = queryByText("Sign Up");
        expect(register).toBeTruthy();
    });
});
