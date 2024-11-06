import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(path.resolve('./updates.json'), 'utf8');
      res.status(200).json(JSON.parse(data));
    } catch (error) {
      res.status(500).send('Error reading updates file');
    }
  } else if (req.method === 'POST') {
    const newUpdate = req.body;

    try {
      let updates = JSON.parse(fs.readFileSync(path.resolve('./updates.json'), 'utf8'));
      updates = updates.filter(update => update.player !== newUpdate.player);
      updates.unshift(newUpdate);

      fs.writeFileSync(path.resolve('./updates.json'), JSON.stringify(updates, null, 2));
      res.send('Player update added successfully');
    } catch (error) {
      res.status(500).send('Error updating updates file');
    }
  }
}
