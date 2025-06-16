export default function handler(req, res) {
  res.json({ jwt: process.env.PINATA_JWT || 'NOT FOUND' });
}