const express = require('express');
const dotenv = require('dotenv');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');

const path = require('path');
const { sequelize } = require('./models');

/* 추가된 부분
    [수하]
*/
const passport = require('passport');
const passportConfig = require('./passport');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const voiceCommandRouter = require('./routes/voice-command');
const calendarEventRouter = require('./routes/calendar-event');
const deviceControlRouter = require('./routes/device-control');
const reportRouter = require('./routes/report');

dotenv.config();
passportConfig();

const app = express();
app.set('port', process.env.PORT || 3000);

app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'views'), {
    express: app,
    watch: true,
});

// 데이터베이스 연결 구문
sequelize.sync({ force: false })
    .then(() => console.log('데이터베이스 연결 성공'))
    .catch(err => console.error(err));

app.use(
    morgan('dev'), // 서버에 들어온 응답과 요청을 기록해주는 미들웨어, 기록 후 next 호출
    express.static(path.join(__dirname, 'public')), // 요청하는 파일이 있을 때 파일 경로를 제공하며, localhost:3000 에 접속하면 public으로 경로를 바꿔줌
    express.json(), // put이나 patch, post 요청 시에 req.body에 프런트에서 온 데이터를 넣어줌
    express.urlencoded({ extended: false }),
    cookieParser(process.env.SECRET),
    session({ // 로그인 정보를 세션으로 저장하겠다는 의미
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET,
        cookie: {
            httpOnly: true,
            secure: false
        },
        name: 'session-cookie'
    })
);

/* 추가된 부분
    [수하]
*/

// passport를 사용할 수 있도록 처리를 해주는 작업 => 
// 요청 객체에 passport 설정을 심음
app.use(passport.initialize());

//req.session 객체에 passport 정보를 저장함.
app.use(passport.session()); // 세션 객체에 유저정보를 저장해주는 일

// 각 주소에 해당하는 라우터로 넘김
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/voice-command', voiceCommandRouter);
app.use('/calendar-event', calendarEventRouter);
app.use('/device-control', deviceControlRouter);
app.use('/report', reportRouter);

app.get('/voice-command', (_, res) => res.sendFile(path.join(__dirname, 'views', 'voice-command.html')));
app.get('/calendar-event', (_, res) => res.sendFile(path.join(__dirname, 'views', 'calendar-event.html')));
app.get('/device-control', (_, res) => res.sendFile(path.join(__dirname, 'views', 'device-control.html')));
app.get('/report', (_, res) => res.sendFile(path.join(__dirname, 'views', 'report.html')));

app.get('/', (_, res) => {
    res.render('index');
})

app.use((req, res, next) => {
    next('Not found error!')
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
