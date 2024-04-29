export const formatMoney = (value: number) => {
  return `Rs. ${Intl.NumberFormat("en-IN").format(value)}`;
};
