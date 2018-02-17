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
    const customerChange = [];
    let totalInDrawer = 0;
    const leftovers = cashInDrawer.reverse().reduce((changeLeft, denomination) => {
        const bill = denomination[0];
        const amountInRegister = denomination[1] * 100;
        totalInDrawer += amountInRegister;

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

let outputWorks = checkCashRegister(3.26, 100, [
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

let outputInsufficient = checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
])

let outputClosed = checkCashRegister(19.5, 20, [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
])

console.log(outputWorks)
console.log(outputInsufficient)
console.log(outputClosed)
