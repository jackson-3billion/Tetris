const router = require('express').Router();
const pool = require('../db');

router.get('/', (req, res) => {
  pool.query('select * from players', (err, rows) => {
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
    console.log(result);
    const insertId = result.insertId;
    console.log(insertId);
    if (err) {
      return res.status(500).json({ msg: 'Internal Server Error', err });
    }
    const rankSql = `
    SELECT ranking 
    FROM (SELECT *, dense_rank() 
          OVER(ORDER BY score DESC) AS ranking 
          FROM players) ranklist 
    WHERE ranklist.id = ${insertId};`;
    pool.query(rankSql, (err, data) => {
      if (err) {
        return res.status(500).json({ msg: 'Internal Server Error', err });
      }
      res.status(201).json({ msg: 'player score inserted', ranking: data[0].ranking });
    });
  });
});

module.exports = router;
