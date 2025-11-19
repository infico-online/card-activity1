import { isPositionActive } from '../../src/utils/isPositionActive';
import { useConfig } from '../../src/hooks/use-config';

describe('Check is position active', () => {
    const { wethAddress, lakeAddress } = useConfig();
    it('should return true for right position', () => {
        expect(isPositionActive(wethAddress, lakeAddress, 1)).toBe(true);
    });

    it('should return false for wrong pair', () => {
        expect(isPositionActive(wethAddress, wethAddress, 1)).toBe(false);
        expect(isPositionActive(lakeAddress, wethAddress, 1)).toBe(false);
    });

    it('should return false for position without liquidity', () => {
        expect(isPositionActive(wethAddress, lakeAddress, 0)).toBe(false);
        expect(isPositionActive(wethAddress, lakeAddress, -1)).toBe(false);
    });
});
