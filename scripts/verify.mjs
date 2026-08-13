import { chromium } from "playwright";

const BASE = "http://localhost:5173";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  // Capture console for errors
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));

  console.log("1. Loading page...");
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 15000 });

  // Wait for hero content
  await page.waitForSelector(".hero-title", { timeout: 5000 });
  const title = await page.textContent(".hero-title");
  console.log("   Hero title:", title.trim());

  // Check navbar
  const navLinks = await page.$$eval(".nav-link", (els) =>
    els.map((e) => e.textContent.trim())
  );
  console.log("   Nav links:", navLinks.join(", "));

  // Scroll through sections
  for (const section of ["about", "projects", "gallery", "contact"]) {
    await page.click(`.nav-link:has-text("${section.charAt(0).toUpperCase() + section.slice(1)}")`);
    await page.waitForTimeout(800);
    const visible = await page.isVisible(`#${section}`);
    console.log(`   Section #${section} visible: ${visible}`);
  }

  // Take full page screenshot
  console.log("2. Taking screenshots...");
  await page.screenshot({ path: "screenshot-hero.png", fullPage: false });
  
  // Full page
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: "screenshot-full.png", fullPage: true });

  // Check errors
  if (errors.length > 0) {
    console.log("\n3. Console errors:", errors.join("\n   "));
  } else {
    console.log("\n3. No console errors ✓");
  }

  // Check download button exists
  const downloadBtn = await page.$(".download-btn");
  console.log("4. Download button exists:", !!downloadBtn);

  await browser.close();
  console.log("\n✓ Verification complete");
}

main().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
