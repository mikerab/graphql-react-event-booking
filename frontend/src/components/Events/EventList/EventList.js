import React from "react";

import EventItem from "./EventItem/EventItem";
import './EventList.css';

const eventList = props => {
  const events = props.events.map(event => {
    return (
      <EventItem 
        eventId={event._id} 
        title={event.title} 
        price={event.price}
        date={event.date}
        description={event.description}
        userId={props.authUserId} 
        creator={event.creator._id} 
        onDetail={props.onViewDetail}/>
    );
  });
  return (<ul className="event__list">{events}</ul>)
};

export default eventList;