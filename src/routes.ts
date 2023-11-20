import express from 'express';
import { listGroups } from './controllers/group.js';

export const router = express.Router()

router.get('/group', listGroups)
