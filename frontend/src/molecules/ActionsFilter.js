import { useState, useMemo } from "react";

export function useActionsFilter(data) {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setDate(date.getDate() + 1);

  const weekAgoDate = new Date();
  weekAgoDate.setHours(0);
  weekAgoDate.setMinutes(0);
  weekAgoDate.setSeconds(0);
  weekAgoDate.setDate(weekAgoDate.getDate() - 7);

  const [dateFrom, setDateFrom] = useState(weekAgoDate);
  const [dateTo, setDateTo] = useState(date);
  const dataToFilter = (data && data.actionsForPlace) || [];

  const actions = useMemo(() => {
    return dataToFilter.filter(
      (item) =>
        new Date(parseInt(item.date, 10)) >= dateFrom &&
        new Date(parseInt(item.date, 10)) <= dateTo
    );
  }, [dataToFilter, dateFrom, dateTo]);

  return {
    actions,
    dateFilterProps: { dateFrom, setDateFrom, dateTo, setDateTo },
  };
}
