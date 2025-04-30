import { google } from 'googleapis';

export type Account = {
  twitter: string;
  wallet: string;
  idRepost: string;
};

async function fetchFormsData(): Promise<Account[]> {
  const auth = new google.auth.GoogleAuth({
    keyFile: './credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const sheetId = process.env.SHEET_ID;
  const range = '!B:D';

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: range,
  });

  const rows = res.data.values;
  if (!rows?.length) {
    throw new Error('Nenhum dado encontrado.');
  }

  const data = rows.slice(1).map(row => ({
    twitter: row[0],
    wallet: row[1],
    idRepost: row[2],
  }));

  return data;
}

export default fetchFormsData;

// const data = await fetchFormsData();

// console.log("fetchFormsData: ", data);
