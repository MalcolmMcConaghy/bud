import React, {Fragment} from 'react';

import './transaction.scss';

const Transaction = ({transaction}) => {
  const {amount, date, category_title, description} = transaction;

  const formattedDate = new Date(date);

  return (
    <Fragment>
      <div className="transaction">
        <div className="transaction__date">{formattedDate.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        <div className="transaction__details">
          <div>
            <div>{description}</div>
            <div>{category_title}</div>
          </div>
          <div>{amount.value.toLocaleString(undefined, {style: 'currency', currency: amount.currency_iso})}</div>
        </div>
      </div>
      <hr />
    </Fragment>
  );
};

export default Transaction;