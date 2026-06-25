console.log("Hii");

// try{
//     const APIError = new Error("This is a test error");
//     throw APIError;
// }
// catch(e){
//     console.error("An error occurred:", e);
//     console.log({e});
//     console.log("Error name:", e.name);
//     console.log("Error message:", e.message);
//     console.log("Error stack:", e.stack);
// }







class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = "CustomError";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }
    }
}

console.log("\n--- CustomError constructor demo ---");
try {
    throw new CustomError("Constructor sets message and name");
} catch (err) {
    console.log("Error name:", err.name);
    console.log("Error message:", err.message);
    console.log("Error stack:", err.stack);
    logStackFrames(err);
}

function vivekName() {
    console.log("Vivek");
}

function LogNames(callback = vivekName) {
    console.log("LogNames function called");
    callback();
}

LogNames();



function fetchUserData(userId, callback) {
  setTimeout(() => { // Simulating a 2-second network request
    const data = { id: userId, name: "Alice" };
    callback(data);
  }, 2000);
}

fetchUserData(101, );





















function logStackFrames(error) {
    if (!error || !error.stack) {
        console.log("No stack available");
        return;
    }

    console.log("Parsed stack frames:");
    error.stack
        .split("\n")
        .slice(1)
        .map(frame => frame.trim())
        .forEach((frame, index) => {
            console.log(`#${index + 1} ${frame}`);
        });
}

function nestedFunctionOne() {
    nestedFunctionTwo();
}

function nestedFunctionTwo() {
    throw new Error("Real stack usage demo");
}

// try {
//     nestedFunctionOne();
// } catch (realError) {
//     console.log("--- Real stack trace demo ---");
//     console.log(realError.stack);
//     logStackFrames(realError);
// }
