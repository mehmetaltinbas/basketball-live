import express from 'express';

const router = express.Router();

router.get('/test', async function test(req, res) {
    const response = { isSuccess: true, message: 'test' };
    res.json(response);
});

export default router;
