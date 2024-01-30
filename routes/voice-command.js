const express = require('express');
const VoiceCommand = require('../models/voice-command');

const router = express.Router();

router.get('/info', async (_, res) => {
    try {
        // VoiceCommand 모델을 사용하여 모든 행을 조회
        const allVoiceCommands = await VoiceCommand.findAll();
        // 조회된 데이터를 JSON 형태로 응답
        res.json(allVoiceCommands);
    } catch (error) {
        console.error('음성 명령 조회 중 에러 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

router.post('/add', async (req, res) => {
    try {
        // 요청 본문에서 command와 action 추출
        const { command, action } = req.body;

        // Sequelize의 create 메서드를 사용하여 VoiceCommand 테이블에 새로운 행 추가
        const newVoiceCommand = await VoiceCommand.create({
            command,
            action
        });

        // 응답에 성공 메시지와 생성된 행을 포함
        res.json({
            msg: '음성명령을 등록했습니다.',
            newVoiceCommand
        });
    } catch (error) {
        console.error('음성 명령 추가 중 오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

router.post('/update', async (req, res) => {
    try {
        const { command, action } = req.body;

        // Sequelize의 update 메서드를 사용하여 해당 명령을 찾아 업데이트
        const [updatedRowCount, updatedRows] = await VoiceCommand.update(
            { action },
            { where: { command }, returning: true, }
        );

        // 업데이트된 행이 없는 경우
        if (updatedRowCount === 0) {
            return res.status(404).json({ error: '업데이트 된 행이 없습니다.' });
        }
        
        // 응답에 성공 메시지와 업데이트된 행을 포함
        res.json({
            msg: '음성명령을 수정했습니다.',
        });
    } catch (error) {
        console.error('음성 명령 수정 중 오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

router.get('/delete', async (req, res) => {
    try {
        const command = req.query.command;

        // Sequelize의 destroy 메서드를 사용하여 해당 명령을 찾아 삭제
        const deletedRowCount = await VoiceCommand.destroy({
            where: { command }
        });

        // 삭제된 행이 없는 경우
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: '존재하지 않는 음성명령입니다.' });
        }

        // 응답에 성공 메시지를 포함
        res.json({ msg: '음성명령을 삭제했습니다.' });
    } catch (error) {
        console.error('음성 명령 삭제 중 오류 발생:', error);
        res.status(500).json({ error: '내부 서버 오류' });
    }
});

module.exports = router;
