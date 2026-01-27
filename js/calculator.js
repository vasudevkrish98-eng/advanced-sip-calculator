function calculateSIP() {
    // ✅ STEP 1: Read user inputs
    let monthly = Number(document.getElementById("monthlyInvestment").value);
    const annualRate = Number(document.getElementById("returnRate").value) / 100;
    const years = Number(document.getElementById("years").value);
    const stepUp = Number(document.getElementById("stepUp").value) / 100;
    const inflationRate = Number(document.getElementById("inflation").value) / 100;

    // ✅ STEP 2: Validate inputs
    if (monthly < 0 || annualRate < 0 || years <= 0 || stepUp < 0 || inflationRate < 0) {
        alert("Please enter valid non-negative values.");
        return;
    }

    // ✅ STEP 3: SIP + Step-up calculation
    const monthlyRate = annualRate / 12;
    let futureValue = 0;
    let totalInvestment = 0;

    for (let year = 1; year <= years; year++) {
        for (let month = 1; month <= 12; month++) {
            futureValue = (futureValue + monthly) * (1 + monthlyRate);
            totalInvestment += monthly;
        }
        monthly = monthly * (1 + stepUp); // Apply annual step-up
    }

    // ✅ STEP 4: Tax calculation (STCG/LTCG)
    let postTaxValue = futureValue;
    let taxAmount = 0;
    const gains = futureValue - totalInvestment;
    let taxType = "";

    if (years <= 1) {
        // Short-Term Capital Gains (STCG) - 20%
        taxAmount = gains > 0 ? gains * 0.20 : 0;
        postTaxValue = futureValue - taxAmount;
        taxType = "STCG";
    } else {
        // Long-Term Capital Gains (LTCG) - 12.5% after ₹1,25,000 exemption
        const exemption = 125000;
        const taxableGains = gains > exemption ? gains - exemption : 0;
        taxAmount = taxableGains * 0.125;
        postTaxValue = futureValue - taxAmount;
        taxType = "LTCG";
    }

    // ✅ STEP 5: Inflation adjustment (only for LTCG)
    let realValueText = ""; // reset to avoid duplication
    if (years > 1) {
        const realValue = postTaxValue / Math.pow(1 + inflationRate, years);
        realValueText =
            "<br><br><strong>Post-Tax Value (Today’s Money):</strong> ₹ " +
            Math.round(realValue).toLocaleString("en-IN");
    }

    // ✅ STEP 6: Display results
    document.getElementById("result").innerHTML =
        "<strong>Total Invested:</strong> ₹ " +
        Math.round(totalInvestment).toLocaleString("en-IN") +
        "<br><br><strong>Total Gains:</strong> ₹ " +
        Math.round(gains).toLocaleString("en-IN") +
        "<br><br><strong>Total Corpus (Pre-Tax):</strong> ₹ " +
        Math.round(futureValue).toLocaleString("en-IN") +
        "<br><br><strong>Tax Amount (" + t
}