import { chromium } from 'playwright';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import fs from 'fs';
import fetchFormsData, { Account } from './googleSheets.js';

export async function verifyUser(inscrito: Account): Promise<boolean> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ storageState: 'twitter-auth.json' });
  const page = await context.newPage();

  const repostUrl = `https://x.com/${inscrito.twitter.replace('@', '')}/status/${inscrito.idRepost}`;

  try {
    await page.goto(repostUrl, { timeout: 60000 });
    await page.waitForTimeout(4000);

    // Verifica se o tweet é uma citação do tweet fixado original
    const quoted = await page.evaluate(() => {
      //@ts-ignore
      const quotedTweet = document.querySelector('article')?.textContent || '';
      return quotedTweet.includes('Mint Free Zombie') && quotedTweet.includes('@zombiesbattle');
    });

    if (!quoted) {
      console.log(`❌ ${inscrito.twitter} não citou o tweet correto`);
      await browser.close();
      return false;
    }

    // Verifica se há pelo menos dois @ no texto do repost
    const hasMentions = await page.evaluate(() => {
      //@ts-ignore
      const textContent = document.querySelector('article div[data-testid="tweetText"]')?.textContent || '';
      const mentions = textContent.match(/@\w+/g);
      return (mentions && mentions.length >= 2);
    });

    await browser.close();

    if (!hasMentions) {
      console.log(`❌ ${inscrito.twitter} não mencionou 2 contas`);
      return false;
    }

    console.log(`✅ ${inscrito.twitter} passou`);
    return true;

  } catch (err) {
    console.error(`⚠️ Erro com ${inscrito.twitter}:`, err);
    await browser.close();
    return false;
  }
}

export async function runVerificationBatch() {
  console.log(`[${new Date().toISOString()}] Iniciando verificação...`);

  const approvedWallets: string[] = [];

  // Carrega wallets previamente aprovadas
  let previouslyApproved: Set<string> = new Set();
  if (fs.existsSync('merkle_root.json')) {
    try {
      const data = JSON.parse(fs.readFileSync('merkle_root.json', 'utf-8'));
      if (Array.isArray(data.approvedWallets)) {
        previouslyApproved = new Set(data.approvedWallets.map((w: string) => w.toLowerCase()));
      }
    } catch (err) {
      console.warn('⚠️ Erro ao ler merkle_root.json:', err);
    }
  }

  const accounts: Account[] = await fetchFormsData();
  console.log('Total de contas:', accounts.length, accounts);

  for (const account of accounts) {
    const walletLower = account.wallet.toLowerCase();
    if (previouslyApproved.has(walletLower)) {
      console.log(`⏭️ ${account.twitter} já aprovado anteriormente`);
      continue;
    }

    const passed = await verifyUser(account);
    if (passed) {
      approvedWallets.push(account.wallet);
      console.log(`✅ ${account.twitter} aprovado`);
    } else {
      console.log(`❌ ${account.twitter} reprovado`);
    }
  }

  if (approvedWallets.length > 0) {
    const leaves = approvedWallets.map(addr => keccak256(addr.toLowerCase()));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const root = tree.getHexRoot();

    console.log('🌳 Novo Merkle Root:', root);

    fs.writeFileSync('merkle_root.json', JSON.stringify({
      timestamp: new Date().toISOString(),
      root,
      approvedWallets: [
        ...Array.from(previouslyApproved),
        ...approvedWallets.map(w => w.toLowerCase())
      ]
    }, null, 2));
  } else {
    console.log('Nenhum novo aprovado');
  }
}

// export async function runVerificationBatch() {
//   console.log(`[${new Date().toISOString()}] Iniciando verificação...`);

//   const approvedWallets: string[] = [];
//   const accounts = await fetchFormsData();

//   console.log('accounts: ', accounts);

//   for (const account of accounts) {
//     const passed = await verifyUser(account);
//     if (passed) {
//       approvedWallets.push(account.wallet);
//       console.log(`✅ ${account.twitter} aprovado`);
//     } else {
//       console.log(`❌ ${account.twitter} reprovado`);
//     }
//   }

//   if (approvedWallets.length > 0) {
//     const leaves = approvedWallets.map(addr => keccak256(addr.toLowerCase()));
//     const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
//     const root = tree.getHexRoot();

//     console.log('🌳 Merkle Root:', root);

//     fs.writeFileSync('merkle_root.json', JSON.stringify({
//       timestamp: new Date().toISOString(),
//       root,
//       approvedWallets
//     }, null, 2));
//   } else {
//     console.log('Nenhum aprovado');
//   }
// }
