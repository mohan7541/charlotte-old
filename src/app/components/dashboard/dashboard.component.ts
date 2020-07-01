import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  menuItems = [
    {routerLink: '/dashboard', name: 'Dashboard', class: 'fa fa-tachometer'},
    {routerLink: '/people', name: 'People', class: 'fa fa-users'},
    {routerLink: '/things', name: 'Things', class: 'fa fa-wifi'},
    {routerLink: '/places', name: 'Place', class: 'fa fa-map-marker'}
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  changeScreen(routePath){
    this.router.navigate([routePath]);
  }

}
