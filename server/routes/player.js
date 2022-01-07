const router = require('express').Router();
const pool = require('../db');

router.get('/', (req, res) => {
  const query = 'SELECT * FROM players ORDER BY score DESC LIMIT 5';
  pool.query(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ msg: 'Internal Server Error', err });
    }
    res.status(200).json({ data: rows });
  });
});

router.post('/', (req, res) => {
  const { nickname, score } = req.body;
  const insertSql = `
  INSERT INTO players (nickname, score) 
              VALUES ("${nickname}", ${score})`;
  pool.query(insertSql, (err, result) => {
    if (err) {
      return res.status(500).json({ msg: 'Internal Server Error', err });
    }
    const { insertId } = result;
    /*
    const rankSql = `
    SELECT ranking 
    FROM (SELECT *, dense_rank() 
          OVER(ORDER BY score DESC) AS ranking 
          FROM players) ranklist 
    WHERE ranklist.id = ${insertId};`;
    */
    const rankSql = 'SELECT id FROM players ORDER BY score DESC';
    pool.query(rankSql, (err, data) => {
      if (err) {
        return res.status(500).json({ msg: 'Internal Server Error', err });
      }
      const ranking = data?.findIndex(row => row.id === insertId) + 1;
      res.status(201).json({ msg: 'player score inserted', ranking });
    });
  });
});

module.exports = router;
