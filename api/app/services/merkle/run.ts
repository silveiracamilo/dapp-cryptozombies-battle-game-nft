import { runVerificationBatch } from './batchVerifier.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.production' });

(async () => {
    await runVerificationBatch();
})();
