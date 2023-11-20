import express from 'express';
import { listGroupsController } from './controllers/group.js';

export const router = express.Router()

router.get('/group', listGroupsController)
