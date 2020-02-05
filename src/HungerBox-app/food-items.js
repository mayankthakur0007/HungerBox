import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer/paper-card/paper-card.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer/iron-icon/iron-icon.js';
import '../../node_modules/@polymer/iron-icons/iron-icons.js';
import '../../node_modules/@polymer/paper-button/paper-button.js';
import '../../node_modules/@polymer/iron-ajax/iron-ajax.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer//polymer/lib/elements/dom-repeat.js';
class FoodItems extends PolymerElement {
  static get template() {
    return html`
<style include="shared-styles">
  :host {
    display: block;
    padding: 10px;
  }
  h1{
    padding:3px;
    color:black;
    font-family: Comic Sans, Comic Sans MS, cursive;
    background-color:white;
  }
  span{
    float:right;
  }
  paper-card {
    width: 500px;
    margin: 10px;
    border: 2px solid black;
    border-radius: 10px;
    padding: 5px;
  }

  paper-button {
    background-color: orange;
  }

  #workingLocation {
    background-color: white;
    border-radius: 10px;
    padding: 5px;
  }

  h2 {
    margin-left: 8px;
  }
</style>
<iron-ajax id="ajax" on-response="_handleResponse" handle-as="json" content-type='application/json'></iron-ajax>
<app-location route="{{route}}">
      </app-location>
<template is="dom-repeat" items={{order}}>
<h1>{{item.categoryName}}</h1>
<template is="dom-repeat" items={{item.itemList}} as="food">
<paper-card heading=""
  image="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  alt="Go Nature">
  <h2>{{food.foodName}}<span>Price: {{food.price}}</span></h2>
  
  <div class="card-actions">
    <paper-button raised on-click="_handleAddToCart">Add To Cart</paper-button>
  </div>
</paper-card>>
</template>
</template>
<paper-button raised on-click="_handleCart">Proceed To CheckOut</paper-button>
`;
  }
  static get properties() {
    return {

      action: {
        type: String,
        value: 'List'
      },
      order:
      {
        type: Array,
        value: []
      },
      cart:
      {
        type: Array,
        value: []
      },
      vendorId: {
        type: Number,
        value: this.vendorId
      }
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this._getData();
  }
  /** getdata function for fetching the data from the database and showing it. Ajax request is done in pets
  
  for the data with sell property value "yes" only. This function is also called when any new pet is added
  
  so that the list got again refreshed **/
  _handleCart(){
    this.set('route.path', '/payment');
  }
  _getData() {
    this._makeAjax(`http://10.117.189.175:8080/mealbox/vendors/${this.vendorId}`, "get", null);
  }
  // ajax call method
  _makeAjax(url, method, postObj) {
    const ajax = this.$.ajax;
    ajax.method = method;
    ajax.url = url;
    ajax.body = postObj ? JSON.stringify(postObj) : undefined;
    ajax.generateRequest();
  }
  _handleAddToCart(event) {
    console.log(event.model.__data.food)
    this.push('cart', event.model.__data.food)
   
  }
  // handle response of ajax call
  _handleResponse(event) {

    switch (this.action) {

      case 'List':
        this.order = event.detail.response.itemcategoryList;
        console.log(this.order)
        break;


    }
  }
}
window.customElements.define('food-items', FoodItems);