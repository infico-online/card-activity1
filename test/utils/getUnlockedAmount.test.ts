import { SEC_PER_DAY } from '../../src/constants/commons';
import { getUnlockedAmount } from '../../src/utils/getUnlockedAmount';

describe('Duration', () => {
    const mockedTGETimestamp = 1669207921;
    const cliff = SEC_PER_DAY;
    const terms = SEC_PER_DAY;
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

    describe('Get Unlocked Amount', () => {
        it('should return 0 if TGE in future', () => {
            expect(
                getUnlockedAmount(
                    cliff,
                    terms,
                    duration,
                    vestingRate,
                    mockedTGETimestamp + 100,
                ),
            ).toBe(0);
        });

        it('should get duration progress 0 if TGE in now', () => {
            expect(
                getUnlockedAmount(
                    cliff,
                    terms,
                    duration,
                    vestingRate,
                    mockedTGETimestamp,
                ),
            ).toBe(0);
        });

        it('should get unlocked amount if TGE in past', () => {
            expect(
                getUnlockedAmount(
                    cliff,
                    terms,
                    duration,
                    vestingRate,
                    mockedTGETimestamp - SEC_PER_DAY,
                ),
            ).toBe(0);

            expect(
                getUnlockedAmount(
                    cliff,
                    terms,
                    duration,
                    vestingRate,
                    mockedTGETimestamp - 2 * SEC_PER_DAY,
                ),
            ).toBe(vestingRate);
        });

        it('should return full amount if vesting finished', () => {
            expect(
                getUnlockedAmount(
                    cliff,
                    terms,
                    duration,
                    vestingRate,
                    mockedTGETimestamp - SEC_PER_DAY * 2 - 1,
                ),
            ).toBe(vestingRate * duration);
        });
    });
});
