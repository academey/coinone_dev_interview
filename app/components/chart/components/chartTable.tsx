import * as React from "react";
import { ITickersRecord, ITickerCurrencyArray, ITickerRecord } from "../../../models/ticker";
import numberWithCommas from "../../../helpers/numberWithCommas";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { RaisedButton, Popover } from "material-ui";
import { Menu, MenuItem } from "material-ui/Menu";
import { PopoverAnimationVertical } from "material-ui/Popover";
import { COINONE_CURRENCY } from "../../../api/currency";
import alertToast from "../../../helpers/makeToastAction";

const styles = require("./chartTable.scss");

export interface IChartTableProps {
  isLoading: boolean;
  tickers: ITickersRecord;
  changeTitleCurrency: (currency: COINONE_CURRENCY) => void;
  isPopoverOpen: boolean;
  popoverAnchorEl: any;
  popoverOpenCurrency: COINONE_CURRENCY;
  togglePopover: (currency: COINONE_CURRENCY, targetElement: any) => void;
  closePopover: () => void;
}

const ChartTable = (props: IChartTableProps) => {
  const {
    isLoading,
    tickers,
    changeTitleCurrency,
    isPopoverOpen,
    popoverAnchorEl,
    popoverOpenCurrency,
    togglePopover,
    closePopover,
  } = props;

  const tableData = Array();
  ITickerCurrencyArray.forEach((currency: string) => {
    const ticker: ITickerRecord = tickers[currency];
    if (!ticker) return;
    tableData.push(ticker);
  });

  const tableColumns = [
    {
      Header: "Currency",
      accessor: "currency",
      Cell: (props: any) => {
        const ticker: ITickerRecord = props.original;
        const tickerCurrency = ticker.currency;
        const isThisPopoverOpen = isPopoverOpen && popoverOpenCurrency === ticker.currency;

        return (
          <RaisedButton
            onClick={e => {
              togglePopover(tickerCurrency, e.currentTarget);
            }}
            label={tickerCurrency.toUpperCase()}
          >
            <Popover
              open={isThisPopoverOpen}
              anchorEl={popoverAnchorEl}
              anchorOrigin={{ horizontal: "left", vertical: "top" }}
              targetOrigin={{ horizontal: "left", vertical: "top" }}
              onRequestClose={closePopover}
              animation={PopoverAnimationVertical}
            >
              <Menu>
                <MenuItem
                  primaryText="Show on Title"
                  onClick={() => {
                    changeTitleCurrency(tickerCurrency);
                    alertToast({
                      type: "info",
                      message: `${tickerCurrency.toUpperCase()} is showing on tab...`,
                    });
                    closePopover();
                  }}
                />
                <MenuItem
                  primaryText="Price Alarm"
                  onClick={() => {
                    alertToast({
                      type: "error",
                      message: `This function was not implemented yet..`,
                    });
                    closePopover();
                  }}
                />
              </Menu>
            </Popover>
          </RaisedButton>
        );
      },
    },
    {
      Header: "Price(￦)",
      id: "last_price",
      accessor: (ticker: ITickerRecord) => numberWithCommas(ticker.last_price),
      sortMethod: (a: string, b: string) => {
        const commaRemovedA = a.replace(/,/gi, "");
        const commaRemovedB = b.replace(/,/gi, "");

        return parseInt(commaRemovedA, 10) > parseInt(commaRemovedB, 10) ? 1 : -1;
      },
      Cell: (props: any) => {
        const ticker: ITickerRecord = props.original;
        return <span className={styles.tableCell}>{numberWithCommas(ticker.last_price)}</span>;
      },
    },
    {
      Header: "Price Diff For A Day(￦, %)",
      id: "price_diff",
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
            <span className={styles.tableCell}>
              <span>{`+${numberWithCommas(diffPriceForADay)}`}</span>
              <span className={styles.surplusForADay}>{` (${diffPercentageForADay}%)`}</span>
            </span>
          );
        } else {
          return (
            <span className={styles.tableCell}>
              <span>{`${numberWithCommas(diffPriceForADay)}`}</span>
              <span className={styles.deficitForADay}>{` (${diffPercentageForADay}%)`}</span>
            </span>
          );
        }
      },
    },
    {
      Header: "Volume",
      id: "volume",
      accessor: (ticker: ITickerRecord) => numberWithCommas(ticker.volume),
      sortMethod: (a: string, b: string) => {
        const commaRemovedA = a.replace(/,/gi, "");
        const commaRemovedB = b.replace(/,/gi, "");

        return parseInt(commaRemovedA, 10) > parseInt(commaRemovedB, 10) ? 1 : -1;
      },
      Cell: (props: any) => {
        const ticker: ITickerRecord = props.original;
        return <span className={styles.tableCell}>{numberWithCommas(ticker.volume)}</span>;
      },
    },
    {
      Header: "Yesterday(￦, %)",
      id: "yesterday_diff",
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
            <span className={styles.tableCell}>
              <span>{numberWithCommas(ticker.yesterday_last)} </span>
              <span className={styles.surplusForADay}>{`+${numberWithCommas(
                yesterdayDiffPriceForADay,
              )} (${yesterdayDiffPercentageForADay}%)`}</span>
            </span>
          );
        } else {
          return (
            <span className={styles.tableCell}>
              <span>{numberWithCommas(ticker.yesterday_last)} </span>
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
