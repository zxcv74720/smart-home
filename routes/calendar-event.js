const express = require('express');
const CalendarEvent = require('../models/calendar-event');

const router = express.Router();

router.get('/all/info', async (_, res) => {
    try {
        // Sequelize의 findAll 메서드를 사용하여 모든 캘린더 이벤트 조회
        const allEvents = await CalendarEvent.findAll();

        // 응답에 조회된 모든 캘린더 이벤트를 포함
        res.json(allEvents);
    } catch (error) {
        console.error('캘린더 이벤트 조회 중 오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

router.get('/company/info', async (_, res) => {
    try {
        // Sequelize의 findAll 메서드를 사용하여 type이 "company"인 캘린더 이벤트 조회
        const companyEvents = await CalendarEvent.findAll({
            where: { type: 'company' }
        });

        // 조회된 모든 "company" 타입의 캘린더 이벤트를 응답으로 보냄
        res.json(companyEvents);
    } catch (error) {
        console.error('회사 이벤트 조회 중 오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

router.get('/school/info', async (_, res) => {
    try {
        // Sequelize의 findAll 메서드를 사용하여 type이 "company"인 캘린더 이벤트 조회
        const schoolEvents = await CalendarEvent.findAll({
            where: { type: 'school' }
        });

        // 조회된 모든 "company" 타입의 캘린더 이벤트를 응답으로 보냄
        res.json(schoolEvents);
    } catch (error) {
        console.error('회사 이벤트 조회 중 오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

router.get('/etc/info', async (_, res) => {
    try {
        // Sequelize의 findAll 메서드를 사용하여 type이 "company"인 캘린더 이벤트 조회
        const etcEvents = await CalendarEvent.findAll({
            where: { type: 'etc' }
        });

        // 조회된 모든 "company" 타입의 캘린더 이벤트를 응답으로 보냄
        res.json(etcEvents);
    } catch (error) {
        console.error('회사 이벤트 조회 중 오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const { title, date, time, type } = req.body;

        // Sequelize의 create 메서드를 사용하여 데이터베이스에 새로운 캘린더 이벤트 행 생성
        await CalendarEvent.create({
            title,
            date,
            time,
            type
        });

        res.json({ msg: '일정을 등록했습니다.' });
    } catch (error) {
        console.error('캘린더 이벤트 등록 중 오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

router.post('/update', async (req, res) => {
    try {
        const { title, date, time, type } = req.body;

        // Sequelize의 update 메서드를 사용하여 데이터베이스에서 캘린더 이벤트 업데이트
        const result = await CalendarEvent.update({
            date,
            time,
            type
        }, {
            where: { title },
            returning: true
        });

        const rowsUpdated = result[0];

        // 캘린더 이벤트가 존재하지 않으면 404 상태 코드와 함께 에러 응답
        if (rowsUpdated === 0) {
            return res.status(404).json({ error: '일정을 찾을 수 없습니다.' });
        }

        res.json({ msg: '일정을 수정했습니다.' });
    } catch (error) {
        console.error('캘린더 이벤트 수정 중 오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});


router.get('/delete', async (req, res) => {
    try {
        const title = req.query.title;

        // Sequelize의 destroy 메서드를 사용하여 데이터베이스에서 캘린더 이벤트 삭제
        const rowsDeleted = await CalendarEvent.destroy({
            where: { title }
        });

        // 캘린더 이벤트가 존재하지 않으면 404 상태 코드와 함께 에러 응답
        if (rowsDeleted === 0) {
            return res.status(404).json({ error: '일정을 찾을 수 없습니다.' });
        }

        res.json({ msg: '일정을 삭제했습니다.' });
    } catch (error) {
        console.error('캘린더 이벤트 삭제 중 오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});


module.exports = router;
