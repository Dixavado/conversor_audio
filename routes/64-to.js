const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/64-to-mp3', (req, res) => {
  if (!req.body.audio) {
    res.status(400).json({ error: 'Nenhum dado de áudio enviado' });
    return;
  }

  const base64Data = req.body.audio;
  const outputFile = 'output.mp3';

  // Converte o valor em base64 para um arquivo MP3
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFile(outputFile, buffer, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao converter áudio' });
      return;
    }

    res.download(outputFile, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao baixar arquivo convertido' });
      } else {
        // Remove o arquivo convertido após o download
        fs.unlinkSync(outputFile);
      }
    });
  });
});

router.post('/64-to-ogg', (req, res) => {
  if (!req.body.audio) {
    res.status(400).json({ error: 'Nenhum dado de áudio enviado' });
    return;
  }

  const base64Data = req.body.audio;
  const outputFile = 'output.ogg';

  // Converte o valor em base64 para um arquivo OGG
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFile(outputFile, buffer, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao converter áudio' });
      return;
    }

    res.download(outputFile, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao baixar arquivo convertido' });
      } else {
        // Remove o arquivo convertido após o download
        fs.unlinkSync(outputFile);
      }
    });
  });
});

module.exports = router;
