//changed to cents because JS doesn't like decimals
const valueInCents = {
    'ONE HUNDRED': 10000,
    'TWENTY': 2000,
    'TEN': 1000,
    'FIVE': 500,
    'ONE': 100,
    'QUARTER': 25,
    'DIME': 10,
    'NICKEL': 5,
    'PENNY': 1
};

function checkCashRegister(price, cash, cashInDrawer) {
    if (cash < price) { return "Customer didn't pay enough" };
    const change = (cash - price) * 100;

    // change to give back to the customer
    // similar to cashInDrawer, array of arrays
    // this is what we return at the end (see above*)
    const customerChange = [];

    let totalInDrawer = 0;

    // leftovers should be 0 if we can give them change back
    // if it's anything but 0, we didn't have enough to give them full change
    const leftovers = cashInDrawer.reverse().reduce((changeLeft, denomination) => {
        const bill = denomination[0]; // 'TEN', 'DIME', etc.
        const amountInRegister = denomination[1] * 100; // total amount of this bill in the drawer
        totalInDrawer += amountInRegister;
        // calculate how much of this bill we should pay out to the customer
        /* lots of calculations here, probably */
        let amountPaidtoCustomer;
        if (amountInRegister <= changeLeft) {
            amountPaidtoCustomer = amountInRegister;
        }
        else {
            amountPaidtoCustomer = Math.floor(changeLeft / valueInCents[bill]) * valueInCents[bill];
        }
        if (amountPaidtoCustomer > 0) {
            customerChange.push([bill, amountPaidtoCustomer / 100]);
        }
        return changeLeft - amountPaidtoCustomer;
    }, change);

    if (leftovers > 0) { return "Insufficient Funds"; }
    if (totalInDrawer == change) { return "Closed"; }

    return customerChange;
}

let output = checkCashRegister(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.10],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
])
console.log(output)
