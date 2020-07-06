import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {PeopleService} from '../../service/people.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/User';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import PageAndSort from "../../model/PageAndSort";
import Item from "../../model/Item";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit, OnDestroy {
  users: User[];
  addForm: FormGroup;
  mySubscription: any;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  peopleHeaders = ['Last Name', 'First Name',  'Email', 'Location', 'Active/Inacive', 'Action'];
  peopleHeadersKeys = ['lastName', 'firstName',  'email', 'location',  'enabled', 'action'];

  current: User;
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private peopleService: PeopleService,
              public dialog: MatDialog) {
    console.log("in constructor");
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
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
    this.initialData({pageIndex: 0, pageSize: 20});
  }
  initialData(pageAndSort: any) {
    this.peopleService.getAllPeople(pageAndSort)
      .subscribe( data => {
        console.log(data);
        this.users = data.content;
        this.pageSize = data.numberOfElements;
        this.length = data.totalElements;
      });
  }
  ngAfterViewInit(): void {
    this.paginator.page.subscribe(page => {
      console.log(page);
      this.initialData(page);
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
  uploadedFile: File;
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
      /*password: ['', Validators.required],*/
      location: ['', Validators.required],
      profilePhoto: ['', ''],
      roles: ['', ''],
      enabled: [true, Validators.required]
    });

    this.form.setValue(this.currentUser);
  }

  uploadImage() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      this.uploadedFile = fileUpload.files[0];
    };
    fileUpload.click();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onUpdate() {
    const user = this.form.value;
    user.profilePhoto = null;
    this.peopleService.updateUser(user)
      .subscribe( data => {
        this.dialogRef.close();
        this.router.navigate(['people']);
      });
      /*if (this.uploadedFile) {
        this.saveImage();
      }*/
    console.log(user);
  }
  private saveImage() {
    if (this.uploadedFile)
      console.log(this.uploadedFile);
      this.peopleService.uploadFile(this.uploadedFile, this.currentUser.id)
        .subscribe(event => {
          console.log(event);
          this.dialogRef.close();

        });
    this.router.navigate(['people']);
  }
}
