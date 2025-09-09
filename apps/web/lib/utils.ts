import * as ct from "countries-and-timezones";
export const getCountryFromTimezone = (timezone?: string) => {
  if (!timezone) {
    return null;
  }
  const timeZoneInfo = ct.getTimezone(timezone);
  if (!timeZoneInfo?.countries.length) {
    return null;
  }
  const countryCode = timeZoneInfo.countries[0];
  const country = ct.getCountry(countryCode as string);
  return {
    code: countryCode,
    name: country?.name || countryCode,
  };
};
export const getCountryFlagUrl = (countryCode: string) => {
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
};