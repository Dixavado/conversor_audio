const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.render(path.join(__dirname, '../views/index.ejs'), {
    title: 'Bem-vindo(a) à API!'
  });
});

router.get('/mp3-to-64', (req, res) => {
  res.render(path.join(__dirname, '../views/mp3-to-64.ejs'), {
    title: 'Bem-vindo(a) à API!'
  });
});
router.get('/64-to-mp3', (req, res) => {
  res.render(path.join(__dirname, '../views/64-to-mp3.ejs'), {
    title: 'Bem-vindo(a) à API!'
  });
});
router.get('/64-to-ogg', (req, res) => {
  res.render(path.join(__dirname, '../views/64-to-ogg.ejs'), {
    title: 'Bem-vindo(a) à API!'
  });
});

module.exports = router;
