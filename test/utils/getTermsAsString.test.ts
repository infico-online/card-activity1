import { SEC_PER_DAY } from '../../src/constants/commons';
import { getTermsAsString } from '../../src/utils/getTermsAsString';

describe('Get Terms As String', () => {
    it('should convert hourly terms', () => {
        expect(getTermsAsString(SEC_PER_DAY / 24)).toBe('HOUR');
    });
    it('should convert daily terms', () => {
        expect(getTermsAsString(SEC_PER_DAY)).toBe('DAY');
    });
    it('should convert weekly terms', () => {
        expect(getTermsAsString(SEC_PER_DAY * 7)).toBe('WEEK');
    });
    it('should convert to seconds other terms', () => {
        expect(getTermsAsString(SEC_PER_DAY / 864000)).toBe('0.1 SEC');
        expect(getTermsAsString(SEC_PER_DAY / 86400)).toBe('1 SEC');
        expect(getTermsAsString(SEC_PER_DAY / 8640)).toBe('10 SEC');
        expect(getTermsAsString(SEC_PER_DAY / 864)).toBe('100 SEC');
        expect(getTermsAsString(SEC_PER_DAY * 2)).toBe('172800 SEC');
    });
});
