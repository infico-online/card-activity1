import { formatValue } from '../../src/utils/formatValue';

describe('Format Value', () => {
    it('should use default rounding for values with no symbol', () => {
        expect(formatValue(10)).toBe('10.00');
        expect(formatValue(10.123)).toBe('10.12');
        expect(formatValue(100.1234)).toBe('100.12');
        expect(formatValue(1000.1234)).toBe('1,000');
        expect(formatValue(-1000.1234)).toBe('-1,000');
    });

    it('should format numbers with symbol', () => {
        expect(formatValue(10.123456789, '$')).toBe('10.12345678 $');
        expect(formatValue(1000.123, '$')).toBe('1,000 $');
    });

    it('should format numbers with symbol and selected percentage', () => {
        expect(formatValue(10.123, '$', 1)).toBe('10.1 $');
        expect(formatValue(10.123456789, '$', 3)).toBe('10.123 $');
        expect(formatValue(1000.123, '$', 0)).toBe('1,000 $');
    });

    it('should format percentages', () => {
        expect(formatValue(10.123, '%')).toBe('10.12 %');
        expect(formatValue(10.123456789, '%')).toBe('10.12 %');
        expect(formatValue(1000.123, '%')).toBe('1,000.12 %');
        expect(formatValue(10.123, '%', 1)).toBe('10.12 %');
        expect(formatValue(10.123456789, '%', 3)).toBe('10.12 %');
        expect(formatValue(1000.123, '%', 0)).toBe('1,000.12 %');
    });
});
