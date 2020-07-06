import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Edge} from '../../model/Edge';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavigationEnd, Router} from '@angular/router';
import {PeopleService} from '../../service/people.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {EditPeopleDialog} from '../people/people.component';
import {EdgeService} from '../../service/edge.service';
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-edge',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.css']
})
export class EdgeComponent implements OnInit, OnDestroy {

  edges: Edge[];
  addForm: FormGroup;
  mySubscription: any;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  headers = ['Edge ID', 'Description', 'Manufacturer', 'Model', 'Serial Number', 'IP Address', 'Location ID', 'Status', 'Edit'];
  headerKeys = ['edgeId', 'description', 'manufacturer', 'model',  'serialNumber', 'ipAddress', 'locationId', 'status', 'edit'];
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private edgeService: EdgeService,
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
   this.initialData({pageIndex: 0, pageSize: 20});
  }

  initialData(pageAndSort: any){
    this.edgeService.getAllEdges(pageAndSort)
      .subscribe( data => {
        console.log(data);
        if(data) {
          this.edges = data.content;
          this.pageSize = data.numberOfElements;
          this.length = data.totalElements;
        }

      });
  }
  onActionHandler($event: any) {
    console.log('inside onActionHandler')
    console.log($event);
    this.openDialog($event);
  }
  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      edgeId: ['', Validators.required],
      description: ['', Validators.required],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      serialNumber: ['', Validators.required],
      status: ['', Validators.required],
      ipAddress: ['', Validators.required],
      locationId: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(page => {
      console.log(page);
      this.initialData(page);
    });
  }
  changeScreen(routePath) {
    this.router.navigate([routePath]);
  }


  onSubmit() {
    let edge = this.addForm.value;
    console.log(edge);

    this.edgeService.createEdge(edge)
      .subscribe(data => {
        this.router.navigate(['things']);
      });
  }

  openDialog(edge: Edge) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '900px';
    dialogConfig.data = edge;
    const dialogRef = this.dialog.open(EditEdgeDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

}
@Component({
  selector: 'edit-edge-dialog',
  templateUrl: './edit-edge.component.html',
  styleUrls: ['./edge.component.css']
})
// tslint:disable-next-line:component-class-suffix
export class EditEdgeDialog implements OnInit {
  currentEdge: Edge;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private edgeService: EdgeService,
    private router: Router,
    public dialogRef: MatDialogRef<EditPeopleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Edge) {
    this.currentEdge = data;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: ['', ''],
      edgeId: ['', Validators.required],
      description: ['', Validators.required],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      serialNumber: ['', Validators.required],
      ipAddress: ['', Validators.required],
      locationId: ['', Validators.required],
      status: ['', Validators.required]
    });

    this.form.setValue(this.currentEdge);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onUpdate() {
    const edge = this.form.value;
    this.edgeService.updateEdge(edge)
      .subscribe(data => {
        this.dialogRef.close();
        this.router.navigate(['things']);
      });
    console.log(edge);
  }
}
