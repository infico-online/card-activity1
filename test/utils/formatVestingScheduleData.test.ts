import { BigNumber } from 'ethers';
import { SEC_PER_DAY } from '../../src/constants/commons';
import { formatVestingScheduleData } from '../../src/utils/formatVestingScheduleData';

describe('Format Vesting Schedule Data', () => {
    const mockedTGETimestamp = 1669207921;
    const name = 'Name';
    const cliff = SEC_PER_DAY;
    const terms = SEC_PER_DAY;
    const duration = 1;
    const allocatedAmount = 100;
    const withdrawnAmount = 10;
    let dateNowSpy: any;
    beforeAll(() => {
        dateNowSpy = jest
            .spyOn(Date.prototype, 'getTime')
            .mockImplementation(() => mockedTGETimestamp * 1000);
    });

    afterAll(() => {
        dateNowSpy.mockRestore();
    });

    it('should format vesting schedule data', () => {
        const data = {
            name: name,
            terms: BigNumber.from(terms),
            cliff: BigNumber.from(cliff),
            duration: BigNumber.from(duration),
            allocatedAmount: BigNumber.from(allocatedAmount),
            withdrawnAmount: BigNumber.from(withdrawnAmount),
        };

        const unlockedAmount = 0;

        const formattedData = {
            name,
            terms,
            cliff,
            duration,
            durationLeft: 3,
            durationProgress: 0,
            vestingRate: allocatedAmount / 10 ** 18,
            vestingRateAsString: '0.00 $LAKE / DAY',
            unlockedAmount: unlockedAmount,
            isUnlocked: false,
            allocatedAmount: allocatedAmount / 10 ** 18,
            withdrawnAmount: withdrawnAmount / 10 ** 18,
            availableAmount: unlockedAmount - withdrawnAmount / 10 ** 18,
        };

        expect(
            formatVestingScheduleData(data, mockedTGETimestamp),
        ).toStrictEqual(formattedData);
    });
});
