import { test, expect } from '@playwright/test';

const siteUrl = 'https://prompt-to-website-ihu08z8cn-federico-de-pontes-projects.vercel.app';

test.describe('Deployed Site Analysis', () => {
  test('Homepage - Full Analysis', async ({ page }) => {
    console.log('=== NAVIGATING TO HOMEPAGE ===');
    
    const consoleMessages = [];
    const consoleErrors = [];
    
    page.on('console', msg => {
      const msgType = msg.type();
      const msgText = msg.text();
      const text = `[` + msgType + `] ` + msgText;
      consoleMessages.push(text);
      if (msgType === 'error') {
        consoleErrors.push(text);
      }
    });

    const failedRequests = [];
    page.on('requestfailed', request => {
      const method = request.method();
      const url = request.url();
      const failure = request.failure();
      const errorText = failure ? failure.errorText : 'Unknown error';
      failedRequests.push(method + ' ' + url + ' - ' + errorText);
    });

    const response = await page.goto(siteUrl, { waitUntil: 'networkidle', timeout: 30000 });
    const status = response ? response.status() : 0;
    console.log('Response status: ' + status);

    await page.waitForTimeout(3000);

    await page.screenshot({ 
      path: '/tmp/homepage-full.png', 
      fullPage: true 
    });
    console.log('Screenshot saved: /tmp/homepage-full.png');

    await page.screenshot({ 
      path: '/tmp/homepage-viewport.png', 
      fullPage: false 
    });
    console.log('Screenshot saved: /tmp/homepage-viewport.png');

    const title = await page.title();
    console.log('Page title: ' + title);

    const bodyText = await page.textContent('body');
    const hasContent = bodyText ? 'Yes' : 'No';
    const contentLength = bodyText ? bodyText.length : 0;
    console.log('Body has content: ' + hasContent);
    console.log('Body text length: ' + contentLength + ' characters');

    const allText = await page.evaluate(() => document.body.innerText);
    console.log('\n=== VISIBLE TEXT ON PAGE ===');
    console.log(allText.substring(0, 1000));

    const headerCount = await page.locator('header').count();
    const navCount = await page.locator('nav').count();
    const mainCount = await page.locator('main').count();
    const footerCount = await page.locator('footer').count();
    const formCount = await page.locator('form').count();
    const buttonCount = await page.locator('button').count();
    const inputCount = await page.locator('input').count();

    console.log('\n=== PAGE STRUCTURE ===');
    console.log('Headers: ' + headerCount);
    console.log('Navs: ' + navCount);
    console.log('Mains: ' + mainCount);
    console.log('Footers: ' + footerCount);
    console.log('Forms: ' + formCount);
    console.log('Buttons: ' + buttonCount);
    console.log('Inputs: ' + inputCount);

    console.log('\n=== CONSOLE MESSAGES ===');
    if (consoleMessages.length === 0) {
      console.log('No console messages');
    } else {
      consoleMessages.forEach(msg => console.log(msg));
    }

    console.log('\n=== CONSOLE ERRORS ===');
    if (consoleErrors.length === 0) {
      console.log('No console errors detected');
    } else {
      consoleErrors.forEach(err => console.log(err));
    }

    console.log('\n=== FAILED NETWORK REQUESTS ===');
    if (failedRequests.length === 0) {
      console.log('No failed network requests');
    } else {
      failedRequests.forEach(req => console.log(req));
    }

    const links = await page.locator('a').all();
    const linkCount = links.length;
    console.log('\n=== LINKS (' + linkCount + ' total) ===');
    for (let i = 0; i < Math.min(10, linkCount); i++) {
      const href = await links[i].getAttribute('href');
      const text = await links[i].textContent();
      const trimmedText = text ? text.trim() : '';
      console.log('Link ' + (i+1) + ': ' + trimmedText + ' -> ' + href);
    }

    const layoutInfo = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
      return {
        bodyScrollHeight: body.scrollHeight,
        bodyClientHeight: body.clientHeight,
        htmlScrollHeight: html.scrollHeight,
        htmlClientHeight: html.clientHeight,
        bodyWidth: body.clientWidth,
        bodyScrollWidth: body.scrollWidth,
        hasHorizontalScrollbar: body.scrollWidth > body.clientWidth,
        hasVerticalScrollbar: body.scrollHeight > body.clientHeight
      };
    });

    console.log('\n=== LAYOUT INFO ===');
    console.log(JSON.stringify(layoutInfo, null, 2));
  });
});
