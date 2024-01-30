const express = require('express');
const Report = require('../models/report');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/all/info', async (_, res) => {
    try {
        const reports = await Report.findAll();
        res.json(reports);
    } catch (error) {
        console.error('보고서 목록 조회 중 오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

router.get('/environmentconditions/info', async (_, res) => {
    try {
        const environmentconditions = await Report.findAll({
            attributes: ['reportDate','temperature', 'humidity', 'airQuality'],
        });

        // 조회된 환경 조건 정보를 응답으로 보냄
        res.json(environmentconditions);
    } catch (error) {
        console.error('오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

router.get('/inPeriod/info', async (req, res) => {
    try {
        // 시작일과 종료일을 요청 쿼리에서 받아옴
        const { startDate, endDate } = req.query;

        // 보고서를 조회
        const reportsInPeriod = await Report.findAll({
            where: {
                reportDate: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        res.json(reportsInPeriod);
    } catch (error) {
        console.error('기간 내 보고서 조회 중 오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const { reportId, reportDate, energyUsage, securityEventsCount, temperature, humidity, airQuality } = req.body;
        const report = await Report.create({
            reportId,
            reportDate,
            energyUsage,
            securityEventsCount,
            temperature,
            humidity,
            airQuality
        });
        res.json({ msg: '보고서를 등록했습니다.', report });
    } catch (error) {
        console.error('보고서 추가 중 오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

router.post('/update', async (req, res) => {
    try {
        const { reportId, reportDate, energyUsage, securityEventsCount, temperature, humidity, airQuality } = req.body;

        // 보고서 업데이트
        const [rowsUpdated] = await Report.update({
            reportDate,
            energyUsage,
            securityEventsCount,
            temperature,
            humidity,
            airQuality,
        }, {
            where: { reportId },
        });

        // 보고서가 존재하지 않으면 404 상태 코드와 함께 에러 응답
        if (rowsUpdated === 0) {
            return res.status(404).json({ error: '보고서를 찾을 수 없습니다.' });
        }

        // 업데이트된 보고서를 다시 조회하여 응답으로 보냄
        const updatedReport = await Report.findByPk(reportId);

        res.json({ msg: '보고서를 수정했습니다.', updatedReport });
    } catch (error) {
        console.error('보고서 수정 중 오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

router.get('/delete', async (req, res) => {
    try {
        const reportId = req.query.reportId;

        // 보고서 삭제
        const rowsDeleted = await Report.destroy({
            where: { reportId },
        });

        // 보고서가 존재하지 않으면 404 상태 코드와 함께 에러 응답
        if (rowsDeleted === 0) {
            return res.status(404).json({ error: '보고서를 찾을 수 없습니다.' });
        }

        res.json({ msg: '보고서를 삭제했습니다.'});
    } catch (error) {
        console.error('보고서 삭제 중 오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});


module.exports = router;