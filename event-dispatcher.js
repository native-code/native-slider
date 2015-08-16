/**
 * Created by Romany Saad [contact.romany-saad.com] on 16/08/2015.
 *
 * reference http://stackoverflow.com/questions/2490825
 */

Element.prototype.dispatchCustomEvent= function ( eventName, data) {
    var event; // The custom event that will be created

    if (document.createEvent) {
        event = document.createEvent("HTMLEvents");
        event.initEvent(eventName, true, true);
    } else {
        event = document.createEventObject();
        event.eventType = eventName;
    }

    event.eventName = eventName;
    event.data = data;
    if (document.createEvent) {
        this.dispatchEvent(event);
    } else {
        this.fireEvent("on" + event.eventType, event);
    }
};