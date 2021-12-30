import {render, screen} from '@testing-library/react';
import DepositStake from "@/components/stake/depositStake"

describe("DepositStake", () => {
    it("checks if there is a submit button", () => {
        const {getByText} = render(<DepositStake/>);
        expect(getByText('Permit FOLD to mint xFOLD')).toBeInTheDocument();
    })
})