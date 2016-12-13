import { Component, OnInit, Input } from '@angular/core';
import { IProduct }                     from '../../models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
    @Input() product: IProduct;
  constructor() { }

  ngOnInit() {
  }

  addToCart(event: Event) {
      event.preventDefault()
      
  }

}
