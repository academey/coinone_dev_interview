import * as React from "react";
import { ITickersRecord, ITickerCurrencyArray, ITickerRecord } from "../../../models/ticker";
import numberWithCommas from "../../../helpers/numberWithCommas";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { COINONE_CURRENCY } from "../../../api/coinone";

const styles = require("./chartTable.scss");

export interface IChartTableProps {
  isLoading: boolean;
  tickers: ITickersRecord;
  changeTitleCurrency: (currency: COINONE_CURRENCY) => void;
}

const ChartTable = (props: IChartTableProps) => {
  const { isLoading, tickers } = props;

  let tableData = Array();
  ITickerCurrencyArray.forEach((currency: string) => {
    const ticker: ITickerRecord = tickers[currency];
    if (!ticker) return;
    tableData.push(ticker);
  });

  const tableColumns = [
    {
      Header: "Currency",
      id: "currency", // Required because our accessor is not a string
      accessor: (ticker: ITickerRecord) => ticker.currency.toUpperCase(),
    },
    {
      Header: "Price(￦)",
      id: "last_price", // Required because our accessor is not a string
      accessor: (ticker: ITickerRecord) => numberWithCommas(ticker.last_price),
      sortMethod: (a: string, b: string) => {
        const commaRemovedA = a.replace(/,/gi, "");
        const commaRemovedB = b.replace(/,/gi, "");

        return parseInt(commaRemovedA, 10) > parseInt(commaRemovedB, 10) ? 1 : -1;
      },
    },
    {
      Header: "Price Diff For A Day(￦, %)",
      id: "price_diff", // Required because our accessor is not a string
      accessor: (ticker: ITickerRecord) => {
        const diffPriceForADay = ticker.last_price - ticker.first_price;
        const diffPercentageForADay = diffPriceForADay / ticker.first_price * 100;

        return diffPercentageForADay;
      },
      Cell: (props: any) => {
        const ticker: ITickerRecord = props.original;
        const diffPriceForADay = ticker.last_price - ticker.first_price;
        const diffPercentageForADay = (diffPriceForADay / ticker.first_price * 100).toFixed(2);
        const surplusForADay = diffPriceForADay > 0;

        if (surplusForADay) {
          return (
            <span className="number">
              {`+${numberWithCommas(diffPriceForADay)}`}
              <span className={styles.surplusForADay}>{` (${diffPercentageForADay}%)`}</span>
            </span>
          );
        } else {
          return (
            <span className="number">
              {`${numberWithCommas(diffPriceForADay)}`}
              <span className={styles.deficitForADay}>{` (${diffPercentageForADay}%)`}</span>
            </span>
          );
        }
      },
    },
    {
      Header: "Volume",
      id: "volume", // Required because our accessor is not a string
      accessor: (ticker: ITickerRecord) => numberWithCommas(ticker.volume),
      sortMethod: (a: string, b: string) => {
        const commaRemovedA = a.replace(/,/gi, "");
        const commaRemovedB = b.replace(/,/gi, "");

        return parseInt(commaRemovedA, 10) > parseInt(commaRemovedB, 10) ? 1 : -1;
      },
    },
    {
      Header: "Yesterday(￦, %)",
      id: "yesterday_diff", // Required because our accessor is not a string
      accessor: (ticker: ITickerRecord) => {
        const yesterdayDiffPriceForADay = ticker.yesterday_last - ticker.yesterday_first;
        const yesterdayDiffPercentageForADay = yesterdayDiffPriceForADay / ticker.first_price * 100;

        return yesterdayDiffPercentageForADay;
      },
      Cell: (props: any) => {
        const ticker: ITickerRecord = props.original;
        const yesterdayDiffPriceForADay = ticker.yesterday_last - ticker.yesterday_first;
        const yesterdayDiffPercentageForADay = (yesterdayDiffPriceForADay / ticker.first_price * 100).toFixed(2);
        const yesterdaySurplusForADay = yesterdayDiffPriceForADay > 0;

        if (yesterdaySurplusForADay) {
          return (
            <span className="number">
              {numberWithCommas(ticker.yesterday_last)}{" "}
              <span className={styles.surplusForADay}>{`+${numberWithCommas(
                yesterdayDiffPriceForADay,
              )} (${yesterdayDiffPercentageForADay}%)`}</span>
            </span>
          );
        } else {
          return (
            <span className="number">
              {numberWithCommas(ticker.yesterday_last)}{" "}
              <span className={styles.deficitForADay}>{`${numberWithCommas(
                yesterdayDiffPriceForADay,
              )} (${yesterdayDiffPercentageForADay}%)`}</span>
            </span>
          );
        }
      },
    },
  ];

  return (
    <ReactTable
      className={styles.chartTable}
      loading={isLoading}
      showPagination={false}
      minRows={9}
      data={tableData}
      columns={tableColumns}
    />
  );
};

export default ChartTable;
