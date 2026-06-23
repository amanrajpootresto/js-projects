const STORAGE_KEYS = Object.freeze({
    profile: 'expenseTracker.profile.v1',
    transactions: 'expenseTracker.transactions.v1'
})

console.log('storage.js loaded: STORAGE_KEYS initialized');

// fetch initial data from profile.json and save it to localstorage
async function fetchInitialData(){
    console.log('fetchInitialData: starting fetch for Profile.json');
    const response = await fetch('./data/Profile.json');
    console.log(`fetchInitialData: fetch completed, status=${response.status}, ok=${response.ok}`);
    
    if(!response.ok){
        console.error('fetchInitialData: response not ok', response.status, response.statusText);
        throw new Error(`Failed to parse data from Profile.json`)
    }

    const data = await response.json();
    console.log('fetchInitialData: parsed response data', data);
    return data;
}

// Convert json data into localstorage data
function saveJSON(key, value){
    console.log(`saveJSON: saving key=${key}`);
    try {
        const serializedValue = JSON.stringify(value);

        localStorage.setItem(key, serializedValue);
        console.log(`saveJSON: successfully saved key=${key}`);
    } catch (error) {
        console.error("saveJSON: unable to save JSON to localstorage", error);
    }
}

// get app data
function getAppData(){
    console.log('getAppData: retrieving transactions from localStorage');
    const serializedDataProfile = localStorage.getItem(STORAGE_KEYS.profile);
    const serializedDataTransactions = localStorage.getItem(STORAGE_KEYS.transactions);
    
    if(serializedDataTransactions === null || serializedDataProfile === null){
        console.log('getAppData: no transaction or profile data found in localStorage');
        return null;
    }

    try {
        const parsedData = JSON.parse(serializedDataTransactions);
        const parsedDataProfile = JSON.parse(serializedDataProfile);
        console.log('getAppData: parsed transaction data', parsedData);
        return { transactions: parsedData, profile: parsedDataProfile };
    } catch (error) {
        console.error('getAppData: stored application data is invalid:', error);
        return null;
    }
}

// load profile.json when localstorage is not initialized

async function initializeStorage(){
    const profileExists = localStorage.getItem(STORAGE_KEYS.profile) !== null;

    const transactionsExists = localStorage.getItem(STORAGE_KEYS.transactions) !== null;

    if(profileExists && transactionsExists){
        console.log("profile existed")
        return;
    }

    const initialData = await fetchInitialData();

    saveJSON(STORAGE_KEYS.profile, initialData);

    if(!Response.ok){
        throw new Error(
            `Unable to load Profile.json Status: ${Response.status}`
        )
    }
}




// Read and parse JSON data

function readJSON(key, fallbackValue){
    console.log(`readJSON: reading key=${key}`);
    try {
        const storedValue = localStorage.getItem(key);

        if(storedValue === null){
            console.log(`readJSON: key=${key} not found, returning fallback`);
            return fallbackValue
        };

        const parsedValue = JSON.parse(storedValue);
        console.log(`readJSON: parsed value for key=${key}`, parsedValue);
        return parsedValue;
    } catch (error) {
        console.error(`Unable to read ${key} from localstorage:`, error);

        return fallbackValue;
    }
}

// const data = await Response.json();


const response = getAppData();
console.log('main: getAppData response', response);
if(!response){
    console.log('main: response missing, initialising storage');
    initializeStorage()
}

