import { Component, OnInit } from '@angular/core';
import {Edge} from "../../model/Edge";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NavigationEnd, Router} from "@angular/router";
import {EdgeService} from "../../service/edge.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EditEdgeDialog} from "../edge/edge.component";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  edges: Edge[];
  addForm: FormGroup;
  mySubscription: any;

  menuItems = [
    {routerLink: '/dashboard', name: 'Dashboard', class: 'fa fa-tachometer'},
    {routerLink: '/people', name: 'People', class: 'fa fa-users'},
    {routerLink: '/things', name: 'Things', class: 'fa fa-wifi'},
    {routerLink: '/places', name: 'Place', class: 'fa fa-map-marker'}
  ];
  peopleHeaders = ['Edge ID', 'Description', 'Manufacturer', 'Model', 'Serial Number', 'IP Address', 'Location ID', 'Status', 'Edit'];

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
    this.edgeService.getAllEdges()
      .subscribe(data => {
        console.log(data);
        this.edges = data;
      });
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
