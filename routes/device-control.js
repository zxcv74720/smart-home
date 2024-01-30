const express = require('express');
const DeviceControl = require('../models/device-control');

const router = express.Router();

const devices = {};

router.get('/all/info', async (_, res) => {
    try {
        // Sequelize의 findAll 메서드를 사용하여 모든 장치 정보 조회
        const allDevices = await DeviceControl.findAll();

        // 조회된 장치 정보를 응답으로 보냄
        res.json(allDevices);
    } catch (error) {
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

router.get('/lighting/info', async (_, res) => {
    try {
        // Sequelize의 findAll 메서드를 사용하여 type이 "lighting"인 장치 정보 조회
        const lightingDevices = await DeviceControl.findAll({
            attributes: ['name', 'action'],
            where: { type: 'lighting' }
        });

        // 조회된 장치 정보를 응답으로 보냄
        res.json(lightingDevices);
    } catch (error) {
        res.status(500).json({ error: '내부 서버 오류' });
    }
});


router.get('/homeappliances/info', async (_, res) => {
    try {
        const homeappliancesDevices = await DeviceControl.findAll({
            attributes: ['name', 'action'],
            where: { type: 'homeappliances' }
        });

        // 조회된 장치 정보를 응답으로 보냄
        res.json(homeappliancesDevices);
    } catch (error) {
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

router.get('/etcdevice/info', async (_, res) => {
    try {
        const etcDevices = await DeviceControl.findAll({
            attributes: ['name', 'action'],
            where: { type: 'etc' }
        });

        // 조회된 장치 정보를 응답으로 보냄
        res.json(etcDevices);
    } catch (error) {
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const { name, action, type } = req.body;

        // Sequelize의 create 메서드를 사용하여 데이터베이스에 장치 정보 추가
        const newDevice = await DeviceControl.create({
            name,
            action,
            type
        });

        // 추가된 장치 정보를 응답으로 보냄
        res.json({ msg: '장치제어를 등록했습니다.', newDevice });
    } catch (error) {
        console.error('장치제어 등록 중 오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

router.post('/update', async (req, res) => {
    try {
        const { name, action, type } = req.body;

        // Sequelize의 update 메서드를 사용하여 데이터베이스에서 장치 정보 업데이트
        const [rowsUpdated] = await DeviceControl.update({
            action,
            type
        }, {
            where: { name },
            returning: true
        });

        // 장치 정보가 존재하지 않으면 404 상태 코드와 함께 에러 응답
        if (rowsUpdated === 0) {
            return res.status(404).json({ error: '장치를 찾을 수 없습니다.' });
        }

        // 업데이트된 장치 정보를 응답으로 보냄
        res.json({ msg: '장치제어를 수정했습니다.' });
    } catch (error) {
        console.error('장치제어 수정 중 오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

router.get('/delete', async (req, res) => {
    try {
        const name = req.query.name;

        // Sequelize의 destroy 메서드를 사용하여 데이터베이스에서 장치 정보 삭제
        const rowsDeleted = await DeviceControl.destroy({
            where: { name }
        });

        // 삭제된 장치 정보가 없으면 404 상태 코드와 함께 에러 응답
        if (rowsDeleted === 0) {
            return res.status(404).json({ error: '장치를 찾을 수 없습니다.' });
        }

        // 삭제 성공 응답
        res.json({ msg: '장치를 삭제했습니다.' });
    } catch (error) {
        console.error('장치제어 삭제 중 오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});



module.exports = router;