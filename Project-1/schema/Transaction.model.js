const transaction = {
    _id: String,
    type: String, // user entered name
    title: String, // name of the transaction ( actual buying item )
    amount: Number, // cost spent on the transaction
    category: String, // default selection object
    date: Date,
    location: String,
    createdAt: Date,
}

export { transaction };

console.log(transaction);

// SAMPLE TRANSACTION OBJECT

const sampleTransaction = {
    _id: crypto.randomUUID(),
    type: "DairyProduct",
    title: "Milk",
    amount: 37,
    category: "Grocerry",
    date: new Date().toISOString(),
    location: "Jayanti Departmental Store",
    createdAt: new Date().toISOString(),
};

export { sampleTransaction };

console.log(sampleTransaction);