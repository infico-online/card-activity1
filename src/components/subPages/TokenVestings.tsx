import { useContext, useEffect, useState } from 'react';

import { IBeneficiaryOverview } from '../../interfaces/beneficiaryOverview.interface';
import { IVestingSchedule } from '../../interfaces/vestingSchedule.interface';
import { JsonRpcProvider } from '@ethersproject/providers';
import { VestingSchedule } from '../vestingOverview/vestingSchedule/VestingSchedule';
import { WalletConnectContext } from '../../context';
import { formatVestingScheduleData } from '../../utils/formatVestingScheduleData';
import { useBeneficiaryOverview } from '../../hooks/use-beneficiary-overview';
import { useTgeTimestamp } from '../../hooks/use-tge-timestamp';

export const TokenVestings = () => {
    const { account, library } = useContext(WalletConnectContext);
    const [vestingSchedules, setVestingSchedules] = useState<
        IVestingSchedule[]
    >([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (library: JsonRpcProvider, account: string) => {
            const beneficiaryOverview = await useBeneficiaryOverview(
                library,
                account,
            );
            const tgeTimestamp = await useTgeTimestamp(library);

            const vestingSchedules = beneficiaryOverview.map(
                (el: IBeneficiaryOverview) =>
                    formatVestingScheduleData(el, tgeTimestamp),
            );

            setVestingSchedules(vestingSchedules);
            setIsLoading(false);
        };

        if (library && account) {
            setIsLoading(true);
            fetchData(library, account).catch(console.error);
        }
    }, [library, account]);

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <VestingSchedule data={vestingSchedules} isLoading={isLoading} />
        </div>
    );
};
