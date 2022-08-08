import { Injectable } from '@angular/core';
import { observable, Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NavBarService {
    public sideNavState$: Subject<boolean> = new Subject();

    showSideNav = false;
    disableTopNavbar: boolean;
    visible: boolean;
    creationMode: boolean;
    private subject_guest_user = new Subject<any>();
    set_guest_user(valueGuest): void {
        this.subject_guest_user.next(valueGuest);
    }
    get_guest_user(): Observable<any> {
        return this.subject_guest_user.asObservable();

    }
    constructor() {
        this.visible = true;
        // this.disableTopNavbar = false;
        this.creationMode = false;
    }
    hide(): void {
        this.visible = false;
    }
    enableMode(): void {
        this.creationMode = true;
        this.showSideNav = false;
    }
    disableMode(): void {
        this.creationMode = false;
        this.showSideNav = true;
        // this.disableTopNavbar = false;
    }
    toggleSideNav(): void {
        this.showSideNav = !this.showSideNav;
    }
}