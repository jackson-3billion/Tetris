const router = require('express').Router();
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
  const { gameRoomId, email, inviter } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.google.com',
    port: 587,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.OAUTH_USER,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  const mailDetails = {
    from: `REACT-TETRIS <${process.env.OAUTH_CLIENT_ID}>`,
    to: email,
    subject: '[Invitation] React-Tetris',
    html: `
      <h2>${inviter}님께서 1:1 테트리스 대결을 신청하셨습니다.🎮</h2>
      <a href="${process.env.CLIENT_URL}/game/join/${gameRoomId}">테트리스 게임 입장하기</a>
    `,
  };

  transporter.sendMail(mailDetails, err => {
    if (err) {
      res.status(500).json({ msg: 'Error occurred', err });
    } else {
      res.status(200).json({ msg: 'Invitation mail sent successfully ' });
    }
  });
});

module.exports = router;
