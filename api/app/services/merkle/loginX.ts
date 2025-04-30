// login.ts
import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('➡️ Acesse o Twitter e faça login manual...');
  await page.goto('https://x.com/login');

  // Espera até você logar e a home carregar
  await page.waitForURL('https://x.com/home', { timeout: 0 });

  console.log('✅ Login detectado. Salvando sessão...');
  await context.storageState({ path: 'twitter-auth.json' });

  await browser.close();
})();
