import {render} from "@testing-library/react";
import EditProfile from "../../home/components/EditProfileButton";

describe('Sign In Component Tests', () => {

    test('Render standard component', () => {
        const {queryByText} = render(<EditProfile/>);
        const EditProfileButton = queryByText("Edit My Profile");
        expect(EditProfileButton).toBeTruthy();
    });
});
