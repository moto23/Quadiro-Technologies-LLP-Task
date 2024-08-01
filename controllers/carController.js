const Car = require('../models/Car');

const createCar = async (req, res) => {
  const { carName, manufacturingYear, price } = req.body;
  try {
    const car = new Car({ carName, manufacturingYear, price });
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    const totalCars = cars.length;
    res.json({ cars, totalCars });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateCar = async (req, res) => {
  const { id } = req.params;
  const { carName, manufacturingYear, price } = req.body;
  try {
    const car = await Car.findByIdAndUpdate(id, { carName, manufacturingYear, price }, { new: true });
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const deleteCar = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findByIdAndDelete(id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { createCar, getCars, updateCar, deleteCar };
