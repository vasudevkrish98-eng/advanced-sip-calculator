/**
 * Animates a numeric value from start to end
 */
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

/**
 * Main Calculation Logic
 */
function calculateSIP() {
    // Inputs
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

    // SIP + Annual Step-up calculation
    for (let year = 1; year <= years; year++) {
        for (let month = 1; month <= 12; month++) {
            futureValue = (futureValue + monthly) * (1 + monthlyRate);
            totalInvestment += monthly;
        }
        // Apply Step-up at the end of each year
        monthly = monthly * (1 + stepUp);
    }

    const gains = futureValue - totalInvestment;

    // Tax calculation (India - FY 2024-25 Rules)
    let taxType = "";
    let taxAmount = 0;
    
    if (years <= 1) {
        taxType = "STCG (20%)";
        taxAmount = gains > 0 ? gains * 0.20 : 0;
    } else {
        taxType = "LTCG (12.5%)";
        const exemption = 125000; // Updated exemption limit
        if (gains > exemption) {
            taxAmount = (gains - exemption) * 0.125;
        }
    }

    const postTaxValue = futureValue - taxAmount;
    
    // Inflation adjustment (Future value in today's purchasing power)
    const postTaxRealValue = postTaxValue / Math.pow(1 + inflationRate, years);

    // Build Output UI
    document.getElementById("result").innerHTML = `
        <strong>Invested Amount</strong><span id='inv'></span>
        <strong>Estimated Gains</strong><span id='gain' class='gain'></span>
        <strong>Total Corpus (Pre-Tax)</strong><span id='pre'></span>
        <strong>Tax Amount (${taxType})</strong><span id='tax' class='tax'></span>
        <strong>Total Corpus (Post-Tax)</strong><span id='post' class='highlight'></span>
        <strong>Post-Tax Value (Today’s Money)</strong><span id='real'></span>
    `;

    // Trigger Animations
    animateValue(document.getElementById("inv"), 0, Math.round(totalInvestment), 800);
    animateValue(document.getElementById("gain"), 0, Math.round(gains), 900);
    animateValue(document.getElementById("pre"), 0, Math.round(futureValue), 1000);
    animateValue(document.getElementById("tax"), 0, Math.round(taxAmount), 900);
    animateValue(document.getElementById("post"), 0, Math.round(postTaxValue), 1100);
    animateValue(document.getElementById("real"), 0, Math.round(postTaxRealValue), 1100);
}