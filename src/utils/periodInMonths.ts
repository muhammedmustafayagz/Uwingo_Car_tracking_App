export const buildPeriodInMonthData = (
  t: (key: string) => string,// translation fn
  max: number = 12
) =>
  Array.from({ length: max }, (_, i) => {
    const value = i + 1;
    return {
      value,
      label: t(`common.periodInMonths.${value}`)
    };
  });
