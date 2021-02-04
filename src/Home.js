import React, {useState, useEffect, Fragment} from 'react';

function Home() {
    const [transactionalData, setTransactions] = useState();
    const [error, setError] = useState(false);

    const fetchTransactions = async () => {
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
            setTransactions({...data, transactions: sortedExpensesOnly.slice(0, 10)});
        })
        .catch((error) => {
            setError(true);
        });
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div>
            {transactionalData?.transactions.map(transaction => {
                return (
                    <Fragment key={transaction.id}>
                        <div>{transaction.amount.value}</div>
                        <div>{transaction.date}</div>
                        <div>{transaction.category_title}</div>
                        <div>{transaction.description}</div>
                    </Fragment>
                )
            })}
        </div>
    );
}
export default Home;