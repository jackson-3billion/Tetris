const router = require('express').Router();
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
  const { gameRoomId, email, inviter } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailDetails = {
    from: 'REACT-TETRIS',
    to: email,
    subject: '[Invitation] React-Tetris',
    html: `
      <h3>${inviter}님께서 1:1 테트리스 대결을 신청하셨습니다.🎮</h3>
      <a href="http://localhost:2000/game/join/${gameRoomId}">테트리스 게임 입장하기</a>
    `,
  };

  transporter.sendMail(mailDetails, err => {
    if (err) {
      res.status(500).json({ msg: 'Error occurred' });
    } else {
      res.status(200).json({ msg: 'Invitation mail sent successfully ' });
    }
  });
});

module.exports = router;
