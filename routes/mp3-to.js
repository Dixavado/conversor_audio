const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/mp3-to-ogg', (req, res) => {
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

router.post('/mp3-to-wav', (req, res) => {
  if (!req.body.audio) {
    res.status(400).json({ error: 'Nenhum dado de áudio enviado' });
    return;
  }

  const base64Data = req.body.audio;
  const inputFile = 'input.mp3';
  const outputFile = 'output.wav';

  // Converte o valor em base64 para um arquivo MP3
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFile(inputFile, buffer, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao converter áudio' });
      return;
    }

    const command = `ffmpeg -i ${inputFile} ${outputFile}`;

    // Executa o comando ffmpeg para converter de MP3 para WAV
    exec(command, (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao converter o áudio para WAV' });
      } else {
        res.download(outputFile, (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao baixar arquivo convertido' });
          } else {
            // Remove os arquivos após o download
            fs.unlinkSync(inputFile);
            fs.unlinkSync(outputFile);
          }
        });
      }
    });
  });
});


module.exports = router;
