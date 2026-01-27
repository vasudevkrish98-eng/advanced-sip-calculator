function calculateSIP() {
    let monthly = Number(document.getElementById("monthlyInvestment").value);
    const annualRate = Number(document.getElementById("returnRate").value) / 100;
    const years = Number(document.getElementById("years").value);
    const stepUp = Number(document.getElementById("stepUp").value) / 100;

    const monthlyRate = annualRate / 12;
    let futureValue = 0;

    for (let year = 1; year <= years; year++) {
        for (let month = 1; month <= 12; month++) {
            futureValue = (futureValue + monthly) * (1 + monthlyRate);
        }
        monthly = monthly * (1 + stepUp); // increase SIP yearly
    }

    document.getElementById("result").innerText =
        "Estimated Corpus (with Step-Up): ₹ " +
        Math.round(futureValue).toLocaleString("en-IN");
}
