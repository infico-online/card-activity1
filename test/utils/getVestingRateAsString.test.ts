import { SEC_PER_DAY } from '../../src/constants/commons';
import { getVestingRateAsString } from '../../src/utils/getVestingRateAsString';

describe('Get Vesting Rate As String', () => {
    const mockedTGETimestamp = 1669207921;
    const cliff = SEC_PER_DAY;
    const duration = 1;
    const vestingRate = 10;
    let dateNowSpy: any;
    beforeAll(() => {
        dateNowSpy = jest
            .spyOn(Date.prototype, 'getTime')
            .mockImplementation(() => mockedTGETimestamp * 1000);
    });

    afterAll(() => {
        dateNowSpy.mockRestore();
    });

    it('should get hourly rate', () => {
        expect(
            getVestingRateAsString(
                cliff,
                duration,
                SEC_PER_DAY / 24,
                mockedTGETimestamp,
                vestingRate,
            ),
        ).toBe('10.00 $LAKE / HOUR');
    });

    it('should get daily rate', () => {
        expect(
            getVestingRateAsString(
                cliff,
                duration,
                SEC_PER_DAY,
                mockedTGETimestamp,
                vestingRate,
            ),
        ).toBe('10.00 $LAKE / DAY');
    });

    it('should get weekly rate', () => {
        expect(
            getVestingRateAsString(
                cliff,
                duration,
                SEC_PER_DAY * 7,
                mockedTGETimestamp,
                vestingRate,
            ),
        ).toBe('10.00 $LAKE / WEEK');
    });

    it('should gat rate per seconds for other terms', () => {
        expect(
            getVestingRateAsString(
                cliff,
                duration,
                SEC_PER_DAY / 8640,
                mockedTGETimestamp,
                vestingRate,
            ),
        ).toBe('10.00 $LAKE / 10 SEC');
        expect(
            getVestingRateAsString(
                cliff,
                duration,
                SEC_PER_DAY / 864,
                mockedTGETimestamp,
                vestingRate,
            ),
        ).toBe('10.00 $LAKE / 100 SEC');
    });

    it('should return fully vested for finished vesting', () => {
        expect(
            getVestingRateAsString(
                cliff,
                duration,
                SEC_PER_DAY,
                mockedTGETimestamp - SEC_PER_DAY * 2 - 1,
                vestingRate,
            ),
        ).toBe('FULLY VESTED');
    });
});
