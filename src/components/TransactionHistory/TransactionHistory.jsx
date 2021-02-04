import React,  {Fragment} from 'react';
import Transaction from '../Transaction/Transaction';

import './transactionHistory.scss';

const TransactionHistory = ({transactions}) => {
    return (
      <div className="transactionHistory">
        <h4>Transaction History</h4>
        {transactions.map(transaction => {
          return (
              <Transaction
                  key={transaction.id}
                  transaction={transaction}
              />
          )
        })}
      </div>
    );
};

export default TransactionHistory;