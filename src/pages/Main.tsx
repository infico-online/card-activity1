import { useEffect, useState } from 'react';

import { BuyCrypto } from '../components/subPages/BuyLake';
import { Dashboard } from '../components/subPages/Dashboard';
import { Disclaimer } from '../components/disclaimer/Disclaimer';
import { LOADING_DELAY } from '../constants/commons';
import { Loading } from '../components/loading/Loading';
import { Menu } from '../components/menu/Menu';
import { Page } from '../components/page/Page';
import { ProvideLiquidity } from '../components/subPages/ProvideLiquidity';
import { SwapLake } from '../components/subPages/SwapLake';
import { TokenVestings } from '../components/subPages/TokenVestings';

export const Main = () => {
    const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [subPageIndex, setSubPageIndex] = useState<number>(0);
    useEffect(() => {
        setIsDisclaimerAccepted(
            localStorage.getItem('isDisclaimerAccepter') === 'true',
        );
        setTimeout(() => {
            setIsLoading(false);
        }, LOADING_DELAY);
    }, []);

    const acceptDisclaimer = () => {
        localStorage.setItem('isDisclaimerAccepter', 'true');
        setIsDisclaimerAccepted(true);
    };
    return (
        <>
            {isLoading && <Loading />}
            {isDisclaimerAccepted && (
                <>
                    <Page>
                        {subPageIndex === 0 && <Dashboard />}{' '}
                        {subPageIndex === 1 && <ProvideLiquidity />}
                        {subPageIndex === 2 && <BuyCrypto />}
                        {subPageIndex === 3 && <SwapLake />}
                        {subPageIndex === 4 && <TokenVestings />}
                    </Page>
                    <div className="w-full lg:hidden fixed bottom-0 flex justify-center">
                        <Menu
                            subPageIndex={subPageIndex}
                            setSubPage={(index: number) => {
                                setSubPageIndex(index);
                            }}
                        />
                    </div>
                </>
            )}
            {!isDisclaimerAccepted && !isLoading && (
                <Disclaimer onAcceptClick={acceptDisclaimer} />
            )}
        </>
    );
};
