
import EventRepository from "./repository";
import Event from "./models";

export default class EventService {

    /**
     * The event repository
     * @type {EventRepository}
     */
    _eventRepository;

    /**
     *
     * @param {EventRepository} eventRepository
     */
    constructor(eventRepository) {
        this._eventRepository = eventRepository;
    }

    /**
     * Return all events
     * @return {Event[]}
     */
    getEvents() {
        return this._eventRepository.getAll();
    }

    /**
     * Get the first upcomming event
     * @return {null | Event}
     */
    getFirstEvent() {
        const now = Date.now(); 
        const sortedEvents = this.getEvents().sort((firstEvent, secondEvent) => firstEvent.startTime - secondEvent.endTime);
        const upcommingEvent = sortedEvents.find(event => event.startTime > now);
        return upcommingEvent != null ? upcommingEvent : null;
    }

    /**
     * Get the last upcomming event
     * @return {null | Event}
     */
    getLastEvent() {
        const now = Date.now();
        const events = this.getEvents().sort((firstEvent, secondEvent) => firstEvent.startTime - secondEvent.endTime).reverse();
        const lastUpcommingEvent = events.find(event => event.startTime > now);
        return lastUpcommingEvent != null ? lastUpcommingEvent : null;
    }

    /**
     * Get the longest event
     * @return {null | Event}
     */
    getLongestEvent() {
        const now = Date.now();
        let longestEventDate = null;
        let longestEvent = null;
        this.getEvents().forEach(event => {
            if (event.startTime < event.endTime) {
                if (longestEvent != null) {
                    if (longestEventDate < (event.endTime - event.startTime)) {
                        longestEventDate = event.endTime - event.startTime;
                        longestEvent = event;
                    }
                } else {
                    longestEventDate = event.endTime - event.startTime;
                    longestEvent = event;
                }
            }
        });
        return longestEvent != null ? longestEvent : null;
    }

    /**
     * get the shortest event
     * @return {null | Event}
     */
    getShortestEvent() {
        return null; //TODO
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     * @return {Event[]}
     */
    hasEventOn(time) {
        let evts = this._eventRepository.getAll();
        return evts.filter(function (e) {
            return time >= e.getStartTime() && time <= e.getEndTime();
        });
    }

    // A implementer en TDD
    /**
     *
     * @param title
     * @return {null | Event}
     */
    getEventByTitle(title) {
        return null
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     */
    isLocationAvailable(time) {
    }

    /**
     * Get current events
     * @return {Event[]}
     */
    getCurrentEvents() {
        let now = Date.now();
        return this.hasEventOn(new Date(now));
    }

}