import { act, render } from "@testing-library/react";
import LoadingSpinner from "../components/LoadingSpinner";

test('check loading spinner', async () => {
    await act(async () => {
        const { getByText } = render(<LoadingSpinner message="testing..." />)
        expect(getByText("testing...")).toBeInTheDocument();
    })
})