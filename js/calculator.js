function calculateSIP() {

    let monthly = Number(document.getElementById("monthlyInvestment").value);
    const annualRate = Number(document.getElementById("returnRate").value) / 100;
    const years = Number(document.getElementById("years").value);
    const stepUp = Number(document.getElementById("stepUp").value) / 100;
    const inflationRate = Number(document.getElementById("inflation").value) / 100;

    // Validation
    if (monthly <= 0 || annualRate < 0 || years <= 0 || stepUp < 0 || inflationRate < 0) {
        alert("Please enter valid positive values.");
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

    const gains = futureValue - totalInvestment;

    // Inflation adjustment
    const realValue = futureValue / Math.pow(1 + inflationRate, years);

    // Tax calculation (India)
    let taxType = "";
    let taxAmount = 0;

    if (years <= 1) {
        taxType = "STCG (20%)";
        taxAmount = gains > 0 ? gains * 0.20 : 0;
    } else {
        taxType = "LTCG (12.5%)";
        const exemption = 125000;
        if (gains > exemption) {
            taxAmount = (gains - exemption) * 0.125;
        }
    }

    const postTaxValue = futureValue - taxAmount;
    const postTaxRealValue = postTaxValue / Math.pow(1 + inflationRate, years);

    // Output
    document.getElementById("result").innerHTML =
        "<strong>Invested Amount</strong>" +
        "<span>₹ " + Math.round(totalInvestment).toLocaleString("en-IN") + "</span>" +

        "<strong>Estimated Gains</strong>" +
        "<span>₹ " + Math.round(gains).toLocaleString("en-IN") + "</span>" +

        "<strong>Total Corpus (Pre-Tax)</strong>" +
        "<span>₹ " + Math.round(futureValue).toLocaleString("en-IN") + "</span>" +

        "<strong>Tax Amount (" + taxType + ")</strong>" +
        "<span>₹ " + Math.round(taxAmount).toLocaleString("en-IN") + "</span>" +

        "<strong>Total Corpus (Post-Tax)</strong>" +
        "<span class='highlight'>₹ " + Math.round(postTaxValue).toLocaleString("en-IN") + "</span>" +

        "<strong>Post-Tax Value (Today’s Money)</strong>" +
        "<span>₹ " + Math.round(postTaxRealValue).toLocaleString("en-IN") + "</span>";
}
