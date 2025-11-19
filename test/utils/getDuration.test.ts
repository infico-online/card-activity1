import {
    getDurationLeft,
    getDurationProgress,
    isVestingScheduleUnlocked,
} from '../../src/utils/getDuration';

import { SEC_PER_DAY } from '../../src/constants/commons';

describe('Duration', () => {
    const mockedTGETimestamp = 1669207921;
    const cliff = SEC_PER_DAY;
    const terms = SEC_PER_DAY;
    const duration = 1;
    let dateNowSpy: any;
    beforeAll(() => {
        dateNowSpy = jest
            .spyOn(Date.prototype, 'getTime')
            .mockImplementation(() => mockedTGETimestamp * 1000);
    });

    afterAll(() => {
        dateNowSpy.mockRestore();
    });

    describe('Duration Progress', () => {
        it('should get duration progress 0 if TGE in future', () => {
            expect(
                getDurationProgress(
                    cliff,
                    duration,
                    terms,
                    mockedTGETimestamp + 100,
                ),
            ).toBe(0);
        });

        it('should get duration progress 0 if TGE in now', () => {
            expect(
                getDurationProgress(cliff, duration, terms, mockedTGETimestamp),
            ).toBe(0);
        });

        it('should get duration progress if TGE in past', () => {
            expect(
                getDurationProgress(
                    cliff,
                    duration,
                    terms,
                    mockedTGETimestamp - SEC_PER_DAY,
                ),
            ).toBe(50);
        });

        it('should get duration progress 100 vesting unlocked', () => {
            expect(
                getDurationProgress(
                    cliff,
                    duration,
                    terms,
                    mockedTGETimestamp - SEC_PER_DAY * 2 - 1,
                ),
            ).toBe(100);
        });
    });

    describe('Get Duration Left', () => {
        it('should get number of terms before full unlock', () => {
            expect(
                getDurationLeft(
                    cliff,
                    duration,
                    terms,
                    mockedTGETimestamp + SEC_PER_DAY,
                ),
            ).toBe(4);
        });

        it('should get number of terms before full unlock', () => {
            expect(
                getDurationLeft(cliff, duration, terms, mockedTGETimestamp),
            ).toBe(3);
        });

        it('should get number of terms before full unlock', () => {
            expect(
                getDurationLeft(
                    cliff,
                    duration,
                    terms,
                    mockedTGETimestamp - SEC_PER_DAY,
                ),
            ).toBe(2);
        });

        it('should get 0 when fully unlocked', () => {
            expect(
                getDurationLeft(
                    cliff,
                    duration,
                    terms,
                    mockedTGETimestamp - SEC_PER_DAY * 2 - 1,
                ),
            ).toBe(0);
        });
    });

    describe('Is Vesting Schedule Unlocked', () => {
        it('should return tru if unlocked', () => {
            expect(
                isVestingScheduleUnlocked(
                    cliff,
                    duration,
                    terms,
                    mockedTGETimestamp - SEC_PER_DAY * 2 - 1,
                ),
            ).toBe(true);
        });
        it('should return false if not unlocked', () => {
            expect(
                isVestingScheduleUnlocked(
                    cliff,
                    duration,
                    terms,
                    mockedTGETimestamp - SEC_PER_DAY * 2,
                ),
            ).toBe(false);

            expect(
                isVestingScheduleUnlocked(
                    cliff,
                    duration,
                    terms,
                    mockedTGETimestamp - SEC_PER_DAY,
                ),
            ).toBe(false);

            expect(
                isVestingScheduleUnlocked(
                    cliff,
                    duration,
                    terms,
                    mockedTGETimestamp,
                ),
            ).toBe(false);

            expect(
                isVestingScheduleUnlocked(
                    cliff,
                    duration,
                    terms,
                    mockedTGETimestamp + 1,
                ),
            ).toBe(false);
        });
    });
});
