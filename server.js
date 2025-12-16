
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});




const express = require('express');
const multer = require('multer');

const cors = require('cors');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'temp/' }); // temporary file storage

app.use(cors());
app.use(express.json());

// Upload video
app.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const folder = req.body.folder || 'default';
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: folder
    });

    // delete temp file
    fs.unlinkSync(req.file.path);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Upload failed');
  }
});

// List folders
app.get('/folders', async (req, res) => {
  try {
    const result = await cloudinary.api.root_folders();
    res.json(result.folders.map(f => f.name));
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch folders');
  }
});
app.get('/videos/:folder', async (req, res) => {
  try {
    const { folder } = req.params;

    // Fetch all video resources (Cloudinary may still include TXT in here)
    const result = await cloudinary.api.resources_by_asset_folder(folder, {
      resource_type: 'video', // still fetch videos
      type: 'upload'
    });

    const resources = result.resources || [];

    let infoText = "";
    const videoUrls = [];

    for (const r of resources) {
      const url = r.secure_url;

      if (url.toLowerCase().endsWith(".txt")) {
        // This is the info text
        try {
          const txtRes = await fetch(url);
          infoText = await txtRes.text();
        } catch (e) {
          console.log("Failed to load TXT:", e);
        }
      } else {
        // Everything else is a video
        videoUrls.push(url);
      }
    }

    res.json({
      info: infoText,
      videos: videoUrls
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch videos");
  }
});



app.get('/debug', async (req, res) => {
  const result = await cloudinary.api.resources({
    resource_type: 'folder',
    type: 'upload',
    max_results: 500
  });

  const list = result.resources.map(r => r.public_id);
  res.json(list);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
