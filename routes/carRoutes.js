const express = require('express');
const { createCar, getCars, updateCar, deleteCar } = require('../controllers/carController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, createCar);
router.get('/', authMiddleware, getCars);
router.put('/:id', authMiddleware, adminMiddleware, updateCar);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCar);

module.exports = router;
