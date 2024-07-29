import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventItem from './EventItem';
import './styles.css'

const EventList = () => {
    const [events, setEvents] = useState([]);

    const fetchAllEvents = async () => {
        const response = await axios.get('http://localhost:4981/api/events');
        setEvents(response.data.data)
    }

    console.log("These are my events", events)

    useEffect(() => {
        fetchAllEvents();
    }, [])

    return (
        <div>
            <h2>Events</h2>
            <div className="flexbox">
            {
                events.map((event, _) => {
                    return (
                        <EventItem event={event} setEvents={setEvents} events={events} />
                    )
                })
            }
            </div>
        </div>
    )
}

export default EventList;