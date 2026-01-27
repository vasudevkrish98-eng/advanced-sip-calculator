function calculateSIP() {
    const monthly = Number(document.getElementById("monthlyInvestment").value);
    const annualRate = Number(document.getElementById("returnRate").value) / 100;
    const years = Number(document.getElementById("years").value);

    const months = years * 12;
    const monthlyRate = annualRate / 12;

    let futureValue = 0;

    for (let i = 1; i <= months; i++) {
        futureValue = (futureValue + monthly) * (1 + monthlyRate);
    }

    document.getElementById("result").innerText =
        "Estimated Corpus: ₹ " + Math.round(futureValue).toLocaleString("en-IN");
}
