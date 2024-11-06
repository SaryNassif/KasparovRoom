import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(path.resolve('./events.json'), 'utf8');
      res.status(200).json(JSON.parse(data));
    } catch (error) {
      res.status(500).send('Error reading events file');
    }
  } else if (req.method === 'POST') {
    const newEvent = req.body;

    try {
      const data = fs.readFileSync(path.resolve('./events.json'), 'utf8');
      const events = JSON.parse(data);
      events.push(newEvent);

      fs.writeFileSync(path.resolve('./events.json'), JSON.stringify(events, null, 2));
      res.send('Event added successfully');
    } catch (error) {
      res.status(500).send('Error updating events file');
    }
  }
}
