import express from 'express';
import { gamesService } from '../services/games.service.js';

const router = express.Router();

router.get('/test', async function test(req, res) {
    // const response = { isSuccess: true, message: 'test' };
    const date = new Date();
    const response = await gamesService.fetchGames(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
    res.json(response);
});

export default router;

