import { OrdersDB } from './../../models';
import { Item, Order } from '../../models';
import { Component, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { stringify } from 'uuid';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.orderForm = this.createForm();
  }

  orderForm!: FormGroup;
  itemArrayCtrl!: FormArray;

  order!: Order;

  itemKey:string = "";

  // @Output()
  // onSave = new Subject<Order>();

  // processForm() {
  //   const order: Order = this.orderForm.value as Order;
  //   this.onSave.next(order);
  //   console.info('Order form submitted >>>> ', order);
  // }

  private createForm(): FormGroup {
    this.itemArrayCtrl = this.fb.array([]);
    return this.fb.group({
      name: this.fb.control<string>(this.order?.name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      mobile: this.fb.control<string>(this.order?.mobile, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('[0-9]*'),
      ]),
      items: this.itemArrayCtrl,
    });
  }

  delete(idx: number) {
    this.itemArrayCtrl.removeAt(idx);
  }

  hasError(ctrlName: string) {
    return this.orderForm.get(ctrlName)?.hasError('required');
  }

  addItem() {
    const item = this.fb.group({
      itemName: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      quantity: this.fb.control<number>(1, [Validators.min(1)]),
    });
    this.itemArrayCtrl.push(item);
  }

  getValues() {
    return this.orderForm.value;
  }

  get invalid(): boolean {
    return this.orderForm.invalid;
  }

  getItemKey() {
    return this.itemKey;
  }

  resetItemKey(){
    this.itemKey='';
  }

  populateFields(key: string) {
    this.itemKey = key;
    let order = OrdersDB.get(key);
    console.info('Orderform >>>>> attempting update for order id:', key);

    console.info("Form updates >>>>> ", order)
    // let newListItems: FormArray = this.fb.array([]);

    this.itemArrayCtrl = this.fb.array([]);

    const newForm: FormGroup = this.fb.group({
      name: this.fb.control<string>(order.name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      mobile: this.fb.control<string>(order.mobile, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('[0-9]*'),
      ]),
      items: this.itemArrayCtrl,
    });
    this.orderForm = newForm;

    for (let item of order.items) {
      // console.info("item of items in update>> ", item)
      const newItem = this.fb.group({
        itemName: this.fb.control(item.itemName,[
          Validators.required,
          Validators.minLength(3),
        ]),
        quantity: this.fb.control<number>(item.quantity,[Validators.min(1)]),
      });

      this.itemArrayCtrl.push(newItem);
      // console.info("print new list >>>> ", this.itemArrayCtrl)
    }
    // console.info("New form >>>>>>>> ", this.orderForm);
  }
}
