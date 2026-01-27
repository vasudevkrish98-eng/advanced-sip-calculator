function calculateSIP() {
    let monthly = Number(document.getElementById("monthlyInvestment").value);
    const annualRate = Number(document.getElementById("returnRate").value) / 100;
    const years = Number(document.getElementById("years").value);
    const stepUp = Number(document.getElementById("stepUp").value) / 100;
    const inflationRate = Number(document.getElementById("inflation").value) / 100;

    const monthlyRate = annualRate / 12;
    let futureValue = 0;

    // SIP + Step-up calculation
    for (let year = 1; year <= years; year++) {
        for (let month = 1; month <= 12; month++) {
            futureValue = (futureValue + monthly) * (1 + monthlyRate);
        }
        monthly = monthly * (1 + stepUp);
    }

    // =========================
    // ✅ STEP 4: Inflation formula
    // =========================
    const realValue =
        futureValue / Math.pow(1 + inflationRate, years);

    // =========================
    // ✅ STEP 5: Display results
    // =========================
    document.getElementById("result").innerHTML =
        "Estimated Corpus (with Step-Up): ₹ " +
        Math.round(futureValue).toLocaleString("en-IN") +
        "<br><br>" +
        "Value in today’s money (after inflation): ₹ " +
        Math.round(realValue).toLocaleString("en-IN");
}
