console.log("Hii");

try{
    console.log("Hello, World!", testVariable);
}
catch(e){
    console.error("An error occurred:", e);
    console.log({e});
    console.log("Error name:", e.name);
    console.log("Error message:", e.message);
    console.log("Error stack:", e.stack);
}













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
