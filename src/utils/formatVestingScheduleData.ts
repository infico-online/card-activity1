import {
    getDurationLeft,
    getDurationProgress,
    isVestingScheduleUnlocked,
} from './getDuration';

import { ASSET_LAKE } from '../constants/assets';
import { IBeneficiaryOverview } from '../interfaces/beneficiaryOverview.interface';
import { IVestingSchedule } from '../interfaces/vestingSchedule.interface';
import { formatValue } from './formatValue';
import { getTermsAsString } from './getTermsAsString';
import { getUnlockedAmount } from './getUnlockedAmount';
import { parseBigNumber } from './parseBigNumber';

export const formatVestingScheduleData = (
    beneficiaryOverview: IBeneficiaryOverview,
    tgeTimestamp: number,
): IVestingSchedule => {
    const { name } = beneficiaryOverview;
    const terms = parseBigNumber(beneficiaryOverview.terms, 0);
    const cliff = parseBigNumber(beneficiaryOverview.cliff, 0);
    const duration = parseBigNumber(beneficiaryOverview.duration, 0);
    const allocatedAmount = parseBigNumber(
        beneficiaryOverview.allocatedAmount,
        ASSET_LAKE.decimals,
    );
    const vestingRate = allocatedAmount / duration;
    const isUnlocked = isVestingScheduleUnlocked(
        cliff,
        duration,
        terms,
        tgeTimestamp,
    );
    return {
        name,
        terms,
        cliff,
        duration,
        durationLeft: isUnlocked
            ? 0
            : getDurationLeft(cliff, duration, terms, tgeTimestamp),
        durationProgress: isUnlocked
            ? 100
            : getDurationProgress(cliff, duration, terms, tgeTimestamp),
        vestingRate,
        vestingRateAsString: isUnlocked
            ? 'FULLY VESTED'
            : `${formatValue(vestingRate)} $LAKE / ${getTermsAsString(terms)}`,
        unlockedAmount: isUnlocked
            ? allocatedAmount
            : getUnlockedAmount(cliff, terms, vestingRate, tgeTimestamp),
        isUnlocked,
        allocatedAmount,
        withdrawnAmount: parseBigNumber(
            beneficiaryOverview.withdrawnAmount,
            ASSET_LAKE.decimals,
        ),
    };
};
