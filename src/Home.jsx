import React, { useState, useEffect, Fragment } from 'react';
import Loader from "react-loader-spinner";
import TransactionHistory from './components/TransactionHistory/TransactionHistory';

import './Home.scss';

function Home() {
    const [transactionalData, setTransactions] = useState();
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(false);

    const fetchTransactions = async () => {
        setLoading(true);
        await fetch('http://www.mocky.io/v2/5c62e7c33000004a00019b05', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'manual',
            referrerPolicy: 'no-referrer',
        })
            .then(response => response.json())
            .then(data => {
                const filterExpensesOnly = data.transactions.filter(transaction => transaction.category_title !== 'Income');
                const sortedExpensesOnly = filterExpensesOnly.sort((a, b) => Math.abs(a.amount.value) - Math.abs(b.amount.value));
                setTransactions({ ...data, transactions: sortedExpensesOnly.slice(0, 10) });
                setLoading(false);
            })
            .catch((error) => {
                setError(true);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    if (isLoading) return <div className="loading-spinner" data-testid="loading-spinner"><Loader type="Circles" color="#00BFFF" height={80} width={80}/></div>
    if (hasError) return <div className="error-message">Something went wrong. Please try again or try again later</div>

    return (
        <div className="home">
            <h1>Accounts</h1>
            {(!isLoading && transactionalData) && (
                <Fragment>
                    <div className="home__account-info">
                        <h3>{`${transactionalData.provider.title} - ${transactionalData.provider.description}`}</h3>
                        <div className="home__account-balance">
                            {transactionalData.balance.amount.toLocaleString(undefined, {style: 'currency', currency: transactionalData.balance.currency_iso})}
                        </div>
                        <div>{`Account Number: ${transactionalData.provider.account_number}`}</div>
                        <div>{`Sort Code: ${transactionalData.provider.sort_code}`}</div>
                    </div>
                    <TransactionHistory
                        transactions={transactionalData.transactions}
                    />
                </Fragment>
            )}
        </div>
    );
}
export default Home;