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
    let realValueText = "";
    if (years > 1) {
        const realValue = postTaxValue / Math.pow(1 + inflationRate, years);
        realValueText =
    "<strong>Post-Tax Value (Today's Money)</strong>" +
    "<span>₹ " + Math.round(realPostTaxValue).toLocaleString("en-IN") + "</span>";

    }

    // ✅ STEP 6: Display results
document.getElementById("result").innerHTML =
    "<strong>Total Invested</strong>" +
    "<span>₹ " + Math.round(totalInvestment).toLocaleString("en-IN") + "</span>" +

    "<strong>Total Gains</strong>" +
    "<span>₹ " + Math.round(gains).toLocaleString("en-IN") + "</span>" +

    "<strong>Total Corpus (Pre-Tax)</strong>" +
    "<span>₹ " + Math.round(futureValue).toLocaleString("en-IN") + "</span>" +

    "<strong>Tax Amount (" + taxType + ")</strong>" +
    "<span>₹ " + Math.round(taxAmount).toLocaleString("en-IN") + "</span>" +

    "<strong>Post-Tax Corpus</strong>" +
    "<span>₹ " + Math.round(postTaxValue).toLocaleString("en-IN") + "</span>" +

    realValueText;

}
