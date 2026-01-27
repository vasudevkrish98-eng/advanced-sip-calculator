function calculateSIP() {
    let monthly = Number(document.getElementById("monthlyInvestment").value);
    const annualRate = Number(document.getElementById("returnRate").value) / 100;
    const years = Number(document.getElementById("years").value);
    const stepUp = Number(document.getElementById("stepUp").value) / 100;
    const inflationRate = Number(document.getElementById("inflation").value) / 100;
    
    if (
    monthly < 0 ||
    annualRate < 0 ||
    years <= 0 ||
    stepUp < 0 ||
    inflationRate < 0
) {
    alert("Please enter valid non-negative values.");
    return;
}

    const monthlyRate = annualRate / 12;
    let futureValue = 0;
    let totalInvestment = 0;


    // SIP + Step-up calculation
    for (let year = 1; year <= years; year++) {
        for (let month = 1; month <= 12; month++) {
            futureValue = (futureValue + monthly) * (1 + monthlyRate);
            totalInvestment += monthly;
        }
        monthly = monthly * (1 + stepUp);
    }

    // =========================
    // ✅ STEP 4: Inflation formula
    // =========================
    const realValue =
        futureValue / Math.pow(1 + inflationRate, years);

    // =========================
    // =========================
// ✅ STEP 6: Tax calculation (India)
// =========================
    const applyTax = document.getElementById("applyTax").checked;
    let postTaxValue = futureValue;
    let taxAmount = 0;
    if (applyTax) {
    const gains = futureValue - totalInvestment;
    const exemption = 125000; // ₹1.25L LTCG exemption
    if (gains > exemption) {
        taxAmount = (gains - exemption) * 0.10;
        postTaxValue = futureValue - taxAmount;
    }
}  
    
    // ✅ STEP 5: Display results
    // =========================
    document.getElementById("result").innerHTML =
    "Estimated Corpus (Pre-Tax): ₹ " +
    Math.round(futureValue).toLocaleString("en-IN") +
    "<br><br>" +

    "Value in today’s money (after inflation): ₹ " +
    Math.round(realValue).toLocaleString("en-IN") +
    "<br><br>" +

    "Post-Tax Corpus (India): ₹ " +
    Math.round(postTaxValue).toLocaleString("en-IN");

}
