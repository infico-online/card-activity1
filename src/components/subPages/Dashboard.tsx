import { AccountOverview } from '../accountOverview/AccountOverview';
import { Banner } from '../banner/Banner';
import { Footer } from '../footer/Footer';
import { Stats } from '../stats/Stats';
import { VestingOverview } from '../vestingOverview/VestingOverview';
import { Widgets } from '../widgets/Widgets';

export const Dashboard = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full h-full lg:h-[670px] flex flex-col lg:flex-row justify-between mt-4 lg:mt-0 lg:py-6">
                <div className="w-full lg:w-[66%]">
                    <AccountOverview />
                </div>
                <div className="w-full lg:w-[31%] mt-4 lg:mt-0">
                    <Stats />
                </div>
            </div>
            <div className="hidden lg:block w-full h-[670px] py-6">
                <Widgets />
            </div>
            <div className="w-full h-auto lg:h-[630px] mt-4 lg:mt-0 lg:py-6">
                <VestingOverview />
            </div>
            <div className="w-full h-auto lg:h-[120px] mt-4 lg:mt-0 lg:py-6">
                <Banner />
            </div>
            <div className="w-full h-[260px] mt-4 lg:mt-0 lg:pt-6 mb-6 lg:pb-10">
                <Footer />
            </div>
        </div>
    );
};
