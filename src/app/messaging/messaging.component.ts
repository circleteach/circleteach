import {Observable, of} from 'rxjs';
import { switchMap, first, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { UsersService } from '../users.service';
import { GroupsService } from '../services/groups.service';
import { Group } from '../models/group.model';
import { Users } from '../models/users.model';

import * as firebase from 'firebase';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {

  //user$: Observable<any>;
  public userID: string;
  public profile: Users;
  public userName;

  public groups: Group[];
  public group;

  public groupsDoc: Observable<any>; //Observable
  public groupsDocs: DocumentReference[];

  public group1 = "";

  public messageTitle = "Example User";
  public exampleName = "Example";
  public exampleMessageSnip = "Hi there I'm an example";
  public exDateStub ="Thur";
  public messages = ["hi", "hi1", "hi2", "hi3", "hi4", "hi5", "hi6"];
  public chatList = ["Dave", "Kevin", "Brad", "Dave", "Kevin", "Brad", "Dave", "Kevin", "Brad", "Dave", "Kevin", "Brad"];
  public chatID = 0;
  public chatName = "";


  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private route: ActivatedRoute,
              private auth: AuthenticationService,
              private usersService: UsersService,
              private groupsService: GroupsService) 
              { 

                //this.group1 = this.groupsService.getName(this.groupsDoc.id);
                
                
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
      // Get ID from auth
      console.log("ngOnInit begun");
      if (this.auth.getUserId() != null) {
        this.userID = this.auth.getUserId();
      }
  
      // get userName
      this.usersService
        .getUser(this.userID)
        .pipe(
          map(doc => {
            this.profile = doc.payload.data() as Users;
            console.log("data" + doc.payload.data());
          })
        )
        .subscribe(data => {
          this.userName = this.profile.name;
          this.groupsDocs = this.profile.groups;
          console.log("userName: " + this.userName);

          this.groupsDocs.forEach(groupDoc => {
            this.getGroup(groupDoc);
          });

          /*this.groups = data.map(e => {
            return {
              ...
            } as Group;
          })
          map(doc => {
            this.profile = doc.payload.data() as Users;
            console.log("data" + doc.payload.data());
          })*/
             
            
            /*this.groupsDocs.forEach(groupDoc => {
            return groupDoc.get().then(doc => {
              if (doc.exists) {
                return doc.data().groups as Group;
              } else {
                console.log("No such document!");
              }
            })*/
        });
    

  }

  public getGroup(groupDoc: DocumentReference) {
    let group: Group = new Group();
    group.name = this.groupsService.getName(groupDoc.id);
    group.messages = this.groupsService.getMessages(groupDoc.id);
    group.members = this.groupsService.getMembers(groupDoc.id);
    console.log("group added");

    this.groups.push(group);
  }


  //TODO Submit typed text, if there is any
  public messageSubmit() {

  }
  

}
