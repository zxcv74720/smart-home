const express = require('express');
const bcrypt = require('bcrypt')
const User = require('../models/user');

const { logout } = require('./helpers');


const router = express.Router();

router.post('/', async (req, res, next) => {
    const { id, password, name } = req.body;

    const user = await User.findOne({ where: { id } });
    if (user) {
        next('이미 등록된 사용자 아이디입니다.');
        return;
    }

    try {
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            id,
            password: hash,
            name
        });

        next('회원가입이 성공적으로 되었습니다.');
        return;
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/update', async (req, res, next) => {
    const { id, password, name } = req.body;
    
    try {
        // 사용자 ID가 이미 존재하는지 확인
        const existingUser = await User.findOne({ where: { id } });
        if (!existingUser) {
            next('등록되지 않은 사용자 아이디입니다.');
            return;
        }
    
        // 새로운 비밀번호가 제공되었을 때, 해시 생성
        let hash;
        if (password) {
            hash = await bcrypt.hash(password, 12);
        }
    
        // 사용자 정보 업데이트
        await existingUser.update({
            password: hash, 
            name: name, 
        });
    
        next('사용자 정보가 성공적으로 업데이트되었습니다.');
        return;
    } catch (err) {
        console.error(err);
        next(err);
    }
});    

router.get('/delete/:id', async (req, res, next) => {
    try {
        const result = await User.destroy({
            where: { id: req.params.id }
        });

        if (result) next('회원 탈퇴가 성공적으로 되었습니다. ;)');
        else next(`There is no user with ${req.params.id}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
}, logout);

router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'name']
        });

        if (user) res.json(user);
        else next(`There is no user with ${req.params.id}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
