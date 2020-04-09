import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs'
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

 
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
    ) {}

    canActivate() : Observable<boolean> {
        // return this.afAuth.authState.pipe(auth => {
        //     console.log(auth);
        //     if (!auth) {
        //         this.router.navigate(['/login']);
        //         console.log(auth);
        //         return false; 
                
        //     } else {
        //         console.log(auth);
        //         return true;
        //     }
        // });
        return this.afAuth.authState.pipe(
            map(auth => {
                    if (!auth) {
                        this.router.navigate(['/login']);
                        return false;
                    } else {
                        return true;
                    }
                })
        );
    }
}