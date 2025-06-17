import formidable from 'formidable';
import FormData from 'form-data';
import fetch from 'node-fetch';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Form parse error' });
      return;
    }
    const file = files.file;
    const formData = new FormData();
    formData.append('file', file.filepath ? require('fs').createReadStream(file.filepath) : file, file.originalFilename);

    const pinataRes = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`
      },
      body: formData
    });

    const data = await pinataRes.json();
    res.status(pinataRes.status).json(data);
  });
}