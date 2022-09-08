import { Order, OrdersDB } from '../../models';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor() {}

  orderList!:Order[];

  ordersDB = OrdersDB;


  ngOnInit(): void {
    this.ordersDB = OrdersDB;
  }

  delete(key:string){
    OrdersDB.delete(key);
  }

  @Output()
  onUpdate = new Subject<string>;

  update(key:string){
    this.onUpdate.next(key);
    console.info("Order-list >>>> Updating order id: ", key);
  }






}
