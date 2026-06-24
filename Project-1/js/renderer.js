
import {STORAGE_KEYS} from './storage.js'
const username = document.getElementById('username');

// fetch('./data/Profile.json').then(response => response.json()).then(data => {
//     username.innerText = data.personalInfo.firstName + ' ' + data.personalInfo.lastName;
// })

const income = document.getElementById('income');

// fetch('./data/Profile.json')
//     .then(response => response.json())
//     .then(data => {
//         income.innerText = data.income.value + ' ' + data.income.currency;
//     })
=

const transactionList = document.getElementById('transaction-list');

function createTransactionItem(transaction){

    // initialize elements

    // create transaction element
    const transactionItem = document.createElement('li');
    transactionItem.classList.add('transaction-item');

    // create transaction info window
    const info = document.createElement('div');
    info.classList.add('transaction-info');
    transactionItem.appendChild(info);


    // layout designing
    const top = document.createElement('div');
    top.classList.add('transaction-top');

    const middle = document.createElement('div');
    middle.classList.add('transaction-middle');

    const bottom = document.createElement('div');
    bottom.classList.add('transaction-bottom');


    // appending layout elements to info window
    info.appendChild(top);
    info.appendChild(middle);
    info.appendChild(bottom);

    // appending amount to top
    // const 
    const amount = document.createElement('h3');
    amount.classList.add('transaction-amount');
    amount.innerText = transaction?.currency || '' + ' ' + transaction.amount;
    top.appendChild(amount);

    // appending category to top
    const category = document.createElement('span');
    category.classList.add('transaction-category');
    category.innerText = transaction.category;
    top.appendChild(category);

    // appending title to middle
    const title = document.createElement('h4');
    title.classList.add('transaction-title');
    title.innerText = transaction.title;
    middle.appendChild(title);

    const date = document.createElement('span');
    date.classList.add('transaction-date');
    date.innerText = transaction.date;
    bottom.appendChild(date);

    // appending details button at the end
    const detailsButton = document.createElement('button');
    detailsButton.classList.add('transaction-details-btn')
    detailsButton.innerText = "View More";
    bottom.appendChild(detailsButton);

    const buttonLink = document.createElement('a');
    buttonLink.classList.add('button-link');
    buttonLink.href = '/something'
    detailsButton.appendChild(buttonLink);

    // does this function needs to return something
    return transactionItem;

}

function renderUsingStorage (){
    try {
        const profile = localStorage.getItem(STORAGE_KEYS?.profile)
        const transactions = localStorage.getItem(STORAGE_KEYS?.transactions)

        console.log("profile", profile);
        console.log("transactions", transactions);

        if(profile && transactions){

            const transactionsData = JSON.parse(transactions)
            const profileData = JSON.parse(profile)

            console.log("transactionsData", transactionsData);
            console.log("profileData", profileData);

            transactionsData.forEach((transactions) => {
                    const transactionItem = createTransactionItem(transactions);
                    transactionList.appendChild(transactionItem);
            })
        }

    } catch (error) {
        console.log("error loading the storage data", error)
        renderUsingJSON()
    }
}

function renderUsingJSON (){
try {
    fetch('./data/Profile.json').then(response => response.json())
    .then(data => {
        console.log(data.transactions);
        const transactions = data?.transactions || [];
        transactions.forEach(transaction => {
            const transactionItem = createTransactionItem(transaction);
            transactionList.appendChild(transactionItem);
        });
    })
} catch (error) {
    console.log("error loading the json file")
}
}

export { renderUsingJSON, renderUsingStorage};

