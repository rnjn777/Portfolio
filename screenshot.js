const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  try {
    // Wait for the cinematic preloader to disappear (takes ~2.5s)
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    // Screenshot of the Hero section
    await page.screenshot({ path: 'portfolio_hero_neural.png' });
    
    // Scroll to About
    await page.evaluate(() => document.getElementById('about').scrollIntoView());
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'portfolio_about_neural.png' });

    // Scroll to Experience
    await page.evaluate(() => document.getElementById('experience').scrollIntoView());
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'portfolio_experience_neural.png' });

    // Scroll to Tech Stack
    await page.evaluate(() => document.getElementById('skills').scrollIntoView());
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'portfolio_tech_neural.png' });

    // Scroll to Projects
    await page.evaluate(() => document.getElementById('projects').scrollIntoView());
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'portfolio_projects_neural.png' });

    // Scroll to Achievements
    await page.evaluate(() => document.getElementById('achievements').scrollIntoView());
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'portfolio_achievements_neural.png' });

    console.log("Screenshots captured successfully.");
  } catch (err) {
    console.error("Error capturing screenshots:", err);
  } finally {
    await browser.close();
  }
})();
