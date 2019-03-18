import { Title } from '@angular/platform-browser';

export class ManagedEvent {
    constructor(readonly title: string,
                readonly location: string,
                readonly description: string,
                readonly link: string) {}
}