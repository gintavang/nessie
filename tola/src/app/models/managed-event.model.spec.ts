import {ManagedEvent} from './managed-event.model'

describe('event', () => {
    it('should have the correct constructor', () => {
        const event = new ManagedEvent('title', 'location', 'description', 'link');
        expect(event).toBeTruthy();
    });

    it('should have readonly properties', () => {
        const event = new ManagedEvent('event', 'crockpot', 'whoa', 'www.com');
        expect(event.title).toEqual('event');
        expect(event.location).toEqual('crockpot');
        expect(event.description).toEqual('whoa');
        expect(event.link).toEqual('www.com');
    });
});