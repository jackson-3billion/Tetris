const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({
    data: 'hi this is JC',
  });
});

module.exports = router;
