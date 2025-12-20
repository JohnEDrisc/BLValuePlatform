



import { AnalysisResult, CalculatorResults, CalculatorInputs } from "../types";

// Helper to sanitize filenames
const sanitize = (name: string) => name.replace(/[^a-z0-9]/gi, '_').toLowerCase();

// --- PDF EXPORT ---
// Uses browser's native print-to-PDF which handles CSS styles (hidden elements) automatically.
export const exportToPDF = () => {
  window.print();
};

// --- WORD EXPORT ---
// Generates an HTML document that Word can open.
export const exportToWord = (title: string, contentHtml: string) => {
  const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' 
        xmlns:w='urn:schemas-microsoft-com:office:word' 
        xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.5; color: #000; }
          h1 { color: #1a1a1a; font-size: 24pt; border-bottom: 2px solid #F9B734; padding-bottom: 10px; }
          h2 { color: #333; font-size: 18pt; margin-top: 20px; background-color: #f5f5f5; padding: 5px; }
          h3 { color: #555; font-size: 14pt; margin-top: 15px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th { background-color: #000; color: #fff; padding: 8px; text-align: left; }
          td { border: 1px solid #ddd; padding: 8px; }
          .highlight { color: #d97706; font-weight: bold; }
          .box { border: 1px solid #ccc; padding: 10px; background: #fafafa; margin-bottom: 10px; }
        </style></head><body>`;
  const footer = "</body></html>";
  const sourceHTML = header + contentHtml + footer;

  const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
  const fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = `${sanitize(title)}.doc`;
  fileDownload.click();
  document.body.removeChild(fileDownload);
};

// --- WORD GENERATION HELPERS ---

export const generateAnalysisHtml = (query: string, data: AnalysisResult) => {
    return `
      <h1>Value Narratives: ${query}</h1>
      <p>Generated on ${new Date().toLocaleDateString()}</p>

      <h2>Executive Summary</h2>
      <div class="box">
        <h3>CFO Takeaway</h3>
        <p>${data.cfoPunchline}</p>
      </div>
      <div class="box">
        <h3>CAO Takeaway</h3>
        <p>${data.caoPunchline || "N/A"}</p>
      </div>
      <div class="box">
        <h3>CIO Takeaway</h3>
        <p>${data.cioPunchline}</p>
      </div>

      <h2>Strategic Value Drivers</h2>
      <table>
        <tr><th>Driver</th><th>Message</th><th>Impact</th></tr>
        ${Object.entries(data.valueDriverImpacts).map(([k, v]) => `
            <tr>
              <td><strong>${k}</strong></td>
              <td>${v.message}</td>
              <td class="highlight">${v.metric}</td>
            </tr>
        `).join('')}
      </table>

      ${data.kpiHighlights && data.kpiHighlights.length > 0 ? `
      <h2>High-Impact KPIs</h2>
      <table>
        <tr><th>KPI Title</th><th>Context</th><th>Metric</th></tr>
        ${data.kpiHighlights.map(k => `
            <tr>
               <td>${k.title}</td>
               <td>${k.context}</td>
               <td class="highlight">${k.metric}</td>
            </tr>
        `).join('')}
      </table>
      ` : ''}

      <h2>Value Chain</h2>
      <table>
        <tr><th>Feature</th><th>Benefit</th><th>Value</th></tr>
        ${data.valueChain.map(v => `
           <tr><td>${v.feature}</td><td>${v.benefit}</td><td>${v.value}</td></tr>
        `).join('')}
      </table>

      <h2>Business Scenarios</h2>
      ${data.businessScenarios.map(s => `
         <div class="box">
           <p><strong>Scenario:</strong> ${s.scenario}</p>
           <p><strong>Solution:</strong> ${s.solution}</p>
         </div>
      `).join('')}

      <h2>Objection Handling</h2>
      ${data.objectionHandling.map(obj => `
         <div class="box">
           <p><strong>Objection:</strong> ${obj.objection}</p>
           <p><strong>Rebuttal:</strong> ${obj.rebuttal}</p>
         </div>
      `).join('')}

      <h2>Sales Talk Track</h2>
      <p><em>"${data.talkTrack}"</em></p>

      <h2>Discovery Questions</h2>
      <ul>
        ${data.discoveryQuestions.map(q => `<li>${q}</li>`).join('')}
      </ul>

      ${data.references && data.references.length > 0 ? `
      <h2>References</h2>
      <ul>${data.references.map(r => `<li>${r}</li>`).join('')}</ul>
      ` : ''}
    `;
};

export const generateCalculatorHtml = (inputs: CalculatorInputs, results: CalculatorResults) => {
    return `
      <h1>Value Assessment Dashboard</h1>
      <p><strong>Company:</strong> ${inputs.companyName}</p>
      <p><strong>Opportunity:</strong> ${inputs.opportunityName || 'N/A'} (ID: ${inputs.opportunityId || 'N/A'})</p>
      <p><strong>Industry:</strong> ${inputs.industry}</p>
      <p><strong>Annual Revenue:</strong> $${inputs.annualRevenue.toLocaleString()}</p>
      <p><strong>Investment Period:</strong> ${inputs.investmentPeriod} Years</p>
      
      <h2>Investment Recommendation</h2>
      <table>
         <tr><th>Metric</th><th>Value</th></tr>
         <tr><td>Total Annual Value</td><td class="highlight">$${results.totalValue.toLocaleString()}</td></tr>
         <tr><td>${inputs.investmentPeriod}-Year Cumulative Net Value</td><td class="highlight">$${results.netPresentValue.toLocaleString()}</td></tr>
         <tr><td>Total Investment Cost</td><td style="color:red">($${results.totalCost.toLocaleString()})</td></tr>
         <tr><td>Expected ROI</td><td class="highlight">${results.roiMultiple.toFixed(1)}x</td></tr>
      </table>

      <h2>Financial Projection (${inputs.investmentPeriod}-Year)</h2>
      <table>
         <tr><th>Year</th><th>Cost</th><th>Benefit</th><th>Net</th><th>Cumulative</th></tr>
         ${results.yearlyData.map(y => `
            <tr>
              <td>Year ${y.year}</td>
              <td>($${y.cost.toLocaleString()})</td>
              <td>$${y.benefit.toLocaleString()}</td>
              <td>$${y.net.toLocaleString()}</td>
              <td><strong>$${y.cumulative.toLocaleString()}</strong></td>
            </tr>
         `).join('')}
      </table>

      <h2>Value Driver Breakdown</h2>
      <table>
        <tr><th>Value Driver</th><th>Annual Value</th><th>Likely (100%)</th><th>Conservative (90%)</th><th>Optimistic (110%)</th></tr>
        ${results.drivers.map(d => `
           <tr>
             <td>${d.name}</td>
             <td><strong>$${d.value.toLocaleString()}</strong></td>
             <td>$${d.value.toLocaleString()}</td>
             <td>$${d.conservative.toLocaleString()}</td>
             <td>$${d.optimistic.toLocaleString()}</td>
           </tr>`).join('')}
      </table>

      <h2>KPI Benchmarks Summary</h2>
      <table>
         <tr><th>Driver</th><th>Key Benchmark</th><th>World-Class Target</th><th>ROI Impact</th></tr>
         <tr><td>Process Efficiency</td><td>Monthly Close</td><td>≤3 days</td><td>40% efficiency gain</td></tr>
         <tr><td>Working Capital</td><td>Cash Conversion</td><td>&lt;30 days</td><td>$10-50M release</td></tr>
         <tr><td>Trust Premium</td><td>Financial Accuracy</td><td>&gt;99.9%</td><td>10-20% valuation</td></tr>
         <tr><td>M&A Integration</td><td>Integration Time</td><td>6 months</td><td>3x faster</td></tr>
         <tr><td>Talent Retention</td><td>Turnover Rate</td><td>&lt;8%</td><td>$2-5M savings</td></tr>
         <tr><td>Innovation/AI</td><td>Automation Rate</td><td>&gt;70%</td><td>50% time freed</td></tr>
         <tr><td>Regulatory</td><td>Compliance Rate</td><td>&gt;99%</td><td>$1-5M fine avoidance</td></tr>
         <tr><td>Resilience</td><td>System Uptime</td><td>99.999%</td><td>$10M+ protection</td></tr>
      </table>
    `;
};