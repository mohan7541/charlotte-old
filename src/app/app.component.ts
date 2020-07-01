import {Component, EventEmitter, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./service/auth.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AppComponent implements OnInit{

  title = 'Charlotte';
  menuItems = [
    {routerLink: '/dashboard', name: 'Dashboard', class: 'fa fa-tachometer'},
    {routerLink: '/people', name: 'People', class: 'fa fa-users'},
    {routerLink: '/things', name: 'Things', class: 'fa fa-wifi'},
    {routerLink: '/places', name: 'Place', class: 'fa fa-map-marker'}
  ];
  isSideNavVisible = false;
  executeAction: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router,
              private authService: AuthService) {
    this.isSideNavVisible = authService.isUserLoggedIn();
  }

  ngOnInit(): void {
  }


  onActivate($event: any) {
    console.log('inside onActivate::emitted');
    this.isSideNavVisible = this.authService.isUserLoggedIn();
    if(this.isSideNavVisible) {
      window.location.reload();
    }
  }
}
