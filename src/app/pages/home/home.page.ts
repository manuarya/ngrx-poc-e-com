import {Component} from '@angular/core';
import {CartFacade} from "../../libs/cart/cart.facade";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public cartFacade: CartFacade) {}

}
