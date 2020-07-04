import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {PeopleService} from '../../service/people.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/User';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit, OnDestroy {
  users: User[];
  addForm: FormGroup;
  mySubscription: any;

  menuItems = [
    {routerLink: '/dashboard', name: 'Dashboard', class: 'fa fa-tachometer'},
    {routerLink: '/people', name: 'People', class: 'fa fa-users'},
    {routerLink: '/things', name: 'Things', class: 'fa fa-wifi'},
    {routerLink: '/places', name: 'Place', class: 'fa fa-map-marker'}
  ];
  peopleHeaders = ['First Name', 'Last Name', 'Email', 'Location', 'Active/Inacive', 'Action'];
  peopleHeadersKeys = ['firstName', 'lastName', 'email', 'location',  'enabled'];

  current: User;
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private peopleService: PeopleService,
              public dialog: MatDialog) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
    this.peopleService.getAllPeople()
      .subscribe( data => {
        console.log(data);
        this.users = data;
      });
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      location: ['', Validators.required],
      enabled: [true, Validators.required]
    });
    this.peopleService.getAllPeople()
      .subscribe( data => {
        console.log(data);
        this.users = data;
      });
  }

  changeScreen(routePath){
    this.router.navigate([routePath]);
  }



  onSubmit() {
    let user = this.addForm.value;
    user.roles = [];
    console.log(user);

    this.peopleService.createUser(user)
      .subscribe( data => {
        this.router.navigate(['people']);
      });
  }
  openDialog(user: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '900px';
    dialogConfig.data = user;
    const dialogRef = this.dialog.open(EditPeopleDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  onActionHandler($event: any) {
    console.log('inside people')
    console.log($event);
    this.openDialog($event);
  }
}

@Component({
  selector: 'edit-people-dialog',
  templateUrl: './edit-people.component.html',
  styleUrls: ['./people.component.css']
})
// tslint:disable-next-line:component-class-suffix
export class EditPeopleDialog implements OnInit {
  currentUser: User;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private peopleService: PeopleService,
    private router: Router,
    public dialogRef: MatDialogRef<EditPeopleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User) {
    this.currentUser = data;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: ['', ''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      location: ['', Validators.required],
      profilePhoto: ['', ''],
      roles: ['', ''],
      enabled: [true, Validators.required]
    });

    this.form.setValue(this.currentUser);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    const user = this.form.value;
    user.profilePhoto = null;
    this.peopleService.updateUser(user)
      .subscribe( data => {
        this.dialogRef.close();
        this.router.navigate(['people']);
      });
    console.log(user);
  }
}
