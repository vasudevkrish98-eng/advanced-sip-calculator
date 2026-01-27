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
    totalInvestment += monthly;



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
// =========================
// =========================
// ✅ Tax calculation (India)
// =========================
let postTaxValue = futureValue;
let taxAmount = 0;
let taxType = "LTCG";

const gains = futureValue - totalInvestment;

// Decide tax type
if (years <= 1) {
    taxType = "STCG";
    taxAmount = gains > 0 ? gains * 0.15 : 0;
    postTaxValue = futureValue - taxAmount;
} else {
    taxType = "LTCG";
    const exemption = 125000;

    if (gains > exemption) {
        taxAmount = (gains - exemption) * 0.10;
        postTaxValue = futureValue - taxAmount;
    }
}

// =========================
// ✅ Inflation adjustment (ONLY for LTCG)
// =========================
let realValueText = "";

if (years > 1) {
    const realValue =
        postTaxValue / Math.pow(1 + inflationRate, years);

    realValueText =
        "<br><br><strong>Post-Tax Value (Today’s Money):</strong> ₹ " +
        Math.round(realValue).toLocaleString("en-IN");
}


    
    // ✅ STEP 5: Display results
    // =========================
document.getElementById("result").innerHTML =
    "<strong>Total Invested:</strong> ₹ " +
    Math.round(totalInvestment).toLocaleString("en-IN") +

    "<br><br><strong>Total Gains:</strong> ₹ " +
    Math.round(gains).toLocaleString("en-IN") +

    "<br><br><strong>Total Corpus (Pre-Tax):</strong> ₹ " +
    Math.round(futureValue).toLocaleString("en-IN") +

    "<br><br><strong>Tax Amount (" + taxType + "):</strong> ₹ " +
    Math.round(taxAmount).toLocaleString("en-IN") +

    "<br><br><strong>Post-Tax Corpus:</strong> ₹ " +
    Math.round(postTaxValue).toLocaleString("en-IN") +

    realValueText;



}
