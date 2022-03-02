const regionNames = new Intl.DisplayNames(['uk'], {type: 'region'});

export const getCountryDisplayName = (countryCode) => {
  return regionNames.of(countryCode);
}
