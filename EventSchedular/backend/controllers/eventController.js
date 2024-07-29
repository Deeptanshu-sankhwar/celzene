const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find({ isDeleted: false });

        res.status(200).json({
            success: true,
            data: events
        })
    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.createEvent = async (req, res) => {
    const { title, date, time, location, description } = req.body;

    try {
        const newEvent = new Event({
            title,
            date,
            time,
            location,
            description
        })

        await newEvent.save();

        res.status(201).json({
            success: true,
            data: newEvent
        })
    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.updateEvent = async (req, res) => {
    const { id } = req.params
    const body = req.body
    try {
        const event = await Event.findByIdAndUpdate(id, body);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "No such even exists in the database"
            })
        }

        res.status(200).json({
            success: true,
            data: body
        })
    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.deleteEvent = async (req, res) => {
    const { id } = req.params
    try {
        // soft delete
        const event = await Event.findByIdAndUpdate(id, { isDeleted: true })

        event.isDeleted = true

        res.status(200).json({
            success: true,
            data: event
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}