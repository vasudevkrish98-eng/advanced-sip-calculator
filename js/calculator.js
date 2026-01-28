// ===============================
// Animated number counter
// ===============================
function animateValue(element, start, end, duration) {
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.innerText = "₹ " + value.toLocaleString("en-IN");

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// ===============================
// Main SIP Calculator
// ===============================
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

    // ===============================
    // STEP 1: Year-wise data arrays
    // ===============================
    let yearLabels = [];
    let investedData = [];
    let corpusData = [];

    let cumulativeInvestment = 0;

    // ===============================
    // SIP + Step-up calculation
    // ===============================
    for (let year = 1; year <= years; year++) {

        let yearlyInvestment = 0;

        for (let month = 1; month <= 12; month++) {
            futureValue = (futureValue + monthly) * (1 + monthlyRate);
            yearlyInvestment += monthly;
        }

        cumulativeInvestment += yearlyInvestment;
        totalInvestment += yearlyInvestment;

        // Store year-wise values (for graph)
        yearLabels.push("Year " + year);
        investedData.push(Math.round(cumulativeInvestment));
        corpusData.push(Math.round(futureValue));

        // Step-up after every year
        monthly = monthly * (1 + stepUp);
    }

    const gains = futureValue - totalInvestment;

    // ===============================
    // STEP 2: Inflation adjustment
    // ===============================
    const realValue = futureValue / Math.pow(1 + inflationRate, years);

    // ===============================
    // STEP 3: Tax calculation (India)
    // ===============================
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

    // ===============================
    // STEP 4: Output rendering
    // ===============================
    document.getElementById("result").innerHTML =
        "<strong>Invested Amount</strong><span id='inv'></span>" +
        "<strong>Estimated Gains</strong><span id='gain' class='gain'></span>" +
        "<strong>Total Corpus (Pre-Tax)</strong><span id='pre'></span>" +
        "<strong>Tax Amount (" + taxType + ")</strong><span id='tax' class='tax'></span>" +
        "<strong>Total Corpus (Post-Tax)</strong><span id='post' class='highlight'></span>" +
        "<strong>Post-Tax Value (Today’s Money)</strong><span id='real'></span>";

    // Animate numbers
    animateValue(document.getElementById("inv"), 0, Math.round(totalInvestment), 800);
    animateValue(document.getElementById("gain"), 0, Math.round(gains), 900);
    animateValue(document.getElementById("pre"), 0, Math.round(futureValue), 1000);
    animateValue(document.getElementById("tax"), 0, Math.round(taxAmount), 900);
    animateValue(document.getElementById("post"), 0, Math.round(postTaxValue), 1100);
    animateValue(document.getElementById("real"), 0, Math.round(postTaxRealValue), 1100);

    // ===============================
    // DEBUG (for next step - charts)
    // ===============================
    console.log("Years:", yearLabels);
    console.log("Invested:", investedData);
    console.log("Corpus:", corpusData);
}
