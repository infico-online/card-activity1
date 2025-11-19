import { formatNumber } from '../../src/utils/formatNumber';

describe('Format Number', () => {
    it('should use default rounding for values with no symbol', () => {
        expect(formatNumber(10)).toBe(10);
        expect(formatNumber(10.123)).toBe(10.12);
        expect(formatNumber(100.1234)).toBe(100.12);
    });

    it('should format numbers with symbol', () => {
        expect(formatNumber(10.123456789, '$')).toBe(10.12345678);
        expect(formatNumber(1000.123, '$')).toBe(1000);
    });

    it('should format numbers with symbol and selected percentage', () => {
        expect(formatNumber(10.123, '$', 1)).toBe(10.1);
        expect(formatNumber(10.123456789, '$', 3)).toBe(10.123);
        expect(formatNumber(1000.123, '$', 0)).toBe(1000);
    });

    it('should format percentages', () => {
        expect(formatNumber(10.123, '%')).toBe(10.12);
        expect(formatNumber(10.123456789, '%')).toBe(10.12);
        expect(formatNumber(1000.123, '%')).toBe(1000.12);
        expect(formatNumber(10.123, '%', 1)).toBe(10.12);
        expect(formatNumber(10.123456789, '%', 3)).toBe(10.12);
        expect(formatNumber(1000.123, '%', 0)).toBe(1000.12);
    });
});
