const express = require('express'),
      Event = require('../models/Event');

const router = express.Router();

router.get('/', async (req, res) => {
  const events = await Event.find({
    userId: req.query.userId
  });
  res.status(200).json(events)
});

router.post('/', async (req, res) => {
  const eventData = {
    title: req.body.title,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    userId: req.body.userId
  };

  const event = new Event(eventData);

  await event.save();
  res.status(201).json(event)
});

router.put('/:id', async (req, res) => {
  const event = await Event.findByIdAndUpdate(
    {_id: req.params.id},
    req.body,
    {
      useFindAndModify: false,
      new: true
    });
  res.status(200).json(event)
});

router.delete('/:id', async (req, res) => {
  await Event.remove({_id: req.params.id});
  res.status(200).json({
    message: 'Event deleted'
  })
});

module.exports = router;
