import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import { switchMap, first, map } from 'rxjs/operators';
import { PARAMETERS } from '@angular/core/src/util/decorators';


@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {

  user$: Observable<any>;
  public user = 1;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private route: ActivatedRoute) { 

                this.user$ = this.route.paramMap.pipe(
                  switchMap((params: ParamMap) =>
                    this.chatList[params.get('id')])
                );
    /*this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );*/
  }

  ngOnInit() {
    //first chat opens
    this.chatName = this.chatList[this.chatID];
  }

  public messageTitle = "Example User";
  public exampleName = "Example";
  public exampleMessageSnip = "Hi there I'm an example";
  public exDateStub ="Thur";
  public messages = ["hi", "hi1", "hi2", "hi3", "hi4", "hi5", "hi6"];
  public chatList = ["Dave", "Kevin", "Brad", "Dave", "Kevin", "Brad", "Dave", "Kevin", "Brad", "Dave", "Kevin", "Brad"];
  public chatID = 0;
  public chatName = "";


  //TODO Submit typed text, if there is any
  public messageSubmit(){

  }

}
