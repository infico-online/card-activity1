import { formatAddress } from '../../src/utils/formatAddress';

describe('Format Address', () => {
    it('should format address', () => {
        expect(
            formatAddress('0xDCA0f2BeB03c01178D71f6da373cfD38229c87d7'),
        ).toBe('0xDCA0.....87d7');
    });
    it('should return empty string for empty address', () => {
        expect(formatAddress('')).toBe('');
    });
});
