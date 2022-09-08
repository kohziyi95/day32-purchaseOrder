import { OrderFormComponent } from './components/order-form/order-form.component';
import { Order, OrdersDB, SavedOrder } from './models';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'day32-purchaseOrder';

  newOrder(order:Order){
    let uuid = uuidv4();
    OrdersDB.set(uuid, order);
    console.info("App component >>> new order: ", order)
    console.info("Updated OrdersDB>>> ", OrdersDB)
  }

  @ViewChild('orderform')
  orderForm!: OrderFormComponent;

  ngAfterViewInit(): void {
    console.info("afterViewInit >>>>>>>>> ", this.orderForm)
  }

  saveOrder(){
    const order = this.orderForm.getValues();
    let itemKey = this.orderForm.getItemKey();
    if (itemKey == ""){
      this.newOrder(order);
    } else {
      this.updateOrder(itemKey,order);
      this.orderForm.resetItemKey;
      console.info("Update successful for order id: ", itemKey )
    }
    console.info("saved order >>>>>>>> ", order);

  }

  updateOrder(key:string, order: Order){
    OrdersDB.set(key, order);
  }

  update(key:string){
    this.orderForm.populateFields(key);
    console.info("App component >>>> Updating order id: ", key);
  }

}
