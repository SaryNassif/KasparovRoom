import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(path.resolve('./items.json'), 'utf8');
      res.status(200).json(JSON.parse(data));
    } catch (error) {
      res.status(500).send('Error reading items file');
    }
  }
}
