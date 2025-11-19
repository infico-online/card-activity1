import { getPrecision } from '../../src/utils/getPrecision';

describe('Get Precision', () => {
    it('should get precision', () => {
        expect(getPrecision(10)).toBe(2);
        expect(getPrecision(1001)).toBe(0);
        expect(getPrecision(-1001)).toBe(0);
    });

    it('should get precision for number with symbol', () => {
        expect(getPrecision(10, '$')).toBe(8);
        expect(getPrecision(1001, '$')).toBe(0);
        expect(getPrecision(-1001, '$')).toBe(0);
        expect(getPrecision(10, '%')).toBe(2);
        expect(getPrecision(1001, '%')).toBe(2);
        expect(getPrecision(-1001, '%')).toBe(2);
    });

    it('should get precision for number with symbol and precision', () => {
        expect(getPrecision(10, '$', 1)).toBe(1);
        expect(getPrecision(1001, '$', 1)).toBe(0);
        expect(getPrecision(-1001, '$', 1)).toBe(0);
        expect(getPrecision(10, '%', 1)).toBe(2);
        expect(getPrecision(1001, '%', 1)).toBe(2);
        expect(getPrecision(-1001, '%', 1)).toBe(2);
    });
});
