import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable, interval, Subscription } from 'rxjs';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import {ItemService} from '../../service/item.service';
import Item from '../../model/Item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]

})
export class DashboardComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  currentUser: any;

  columnsToDisplay = ['Item ID', 'Manufacturer', 'Model', 'Color', 'Status'];
  columnKeys = ['itemId', 'manufacturer', 'model', 'color',  'status'];
  fillerNav = ['Dashboard', 'Sales Dashboard', 'QR Codes'];
  headers = {

    itemId: 'tem ID',
    manufacturer: 'Manufacturer',
    model: 'Model',
    color: 'Color',
    epc: 'EPC',
    status: 'Status'
  };
  expandedElement: Item | null;
  private mobileQueryListener: () => void;




  private updateSubscription: Subscription;

  processing: boolean;
  currentStep: number;
  statuses = { Shipped: 1, Delivered: 2, ReturnedAtRC: 4, Approved: 8, approved: 8, Rejected: 8,
    rejected: 8, Rewarded: 16 };

  dataSource: any[];
  constructor(
    private itemService: ItemService) {

  }

  ngOnInit(): void {




    this.processing = true;



    this.updateSubscription = interval(10000).subscribe(
      (val) => {
        this.updateItemStatuses();
      }
    );

    this.updateItemStatuses();

  }
  updateItemStatuses() {

    this.itemService.sendGetRequest('dashboarditems').subscribe((data: any[]) => {
      console.log('after ajax:::' + data);
      this.dataSource = data;
    });
  }



  stepClick(ev) { console.log(ev); }



  ngOnDestroy() {
    console.log('ngOnDestroy: cleaning up...');
    if(this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }

  }

}
