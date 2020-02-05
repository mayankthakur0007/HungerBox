import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-card/paper-card.js';
import '../../node_modules/@polymer/iron-icon/iron-icon.js';
import '../../node_modules/@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';
import '../../node_modules/@polymer/iron-ajax/iron-ajax.js';
import '../../node_modules/@polymer//polymer/lib/elements/dom-repeat.js';
class FoodItems extends PolymerElement {
  static get template() {
    return html`
<style include="shared-styles">
  :host {
    display: block;
    padding: 10px;
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
<template is="dom-repeat" items={{order}}>
<paper-card heading=""
  image="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  alt="Go Nature">
  <h2>{{item.vendorName}}<span>Ratings: {{item.rating}} <iron-icon icon="star"></iron-icon></span></h2>
  
  <div class="card-actions">
    <paper-button raised>Order Here</paper-button>
  </div>
</paper-card>
</template>

<iron-ajax id="ajax" on-response="_handleResponse" handle-as="json" content-type='application/json'></iron-ajax>


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
      vendorId: {
        type: Number,
        value: this.vendorId
      }
    }
  }
  _handleAdd() {
    this.$.form.reset();
    this.$.edit.style.display = "none";
    this.$.save1.style.display = "block";
    this.$.collapse.toggle();

  }
  connectedCallback() {
    super.connectedCallback();

    this._getData();
  }
  /** getdata function for fetching the data from the database and showing it. Ajax request is done in pets
  
  for the data with sell property value "yes" only. This function is also called when any new pet is added
  
  so that the list got again refreshed **/

  _getData() {
console.log(this.vendorId)
    // this._makeAjax(`http://10.117.189.175:8080/mealbox/vendors/${this.vendorId}`, "get", null);
  }


  _handleEdit(event) {
    this.$.collapse.toggle();
    this.$.save1.style.display = "none";
    this.$.edit.style.display = "block";
    this.$.name.value = event.model.item.name;
    this.$.job.value = event.model.item.job;
    this.id = event.model.item.id;

  }

  // this method is used the edit vendor detail in database
  // _handleEditSubmit(event) {
  // let name = this.$.name.value;
  // let job = this.$.job.value;
  // let obj = { name: name, job: job };
  // this._makeAjax(`http://localhost:3000/users/${this.id}`, "put", obj);
  // this.$.form.reset();
  // this.action = 'Edit';
  // this.$.collapse.toggle();
  // }

  //adding vendor details in the database
  // _handleSubmit() {
  // let name = this.$.name.value;
  // let job = this.$.job.value;
  // let obj = { name: name, job: job };
  // console.log(obj);
  // this._makeAjax(`http://localhost:3000/users`, "post", obj);
  // this.$.form.reset();
  // this.action = 'Add';
  // this.$.collapse.toggle();
  // }

  //ajax call delete method which will delete item based on id
  // _handleDelete(event) {
  // let id = event.model.item.id;
  // this._makeAjax(`http://localhost:3000/users/${id}`, "delete");
  // this.action = 'Delete';
  // }

  // ajax call method
  _makeAjax(url, method, postObj) {
    const ajax = this.$.ajax;
    ajax.method = method;
    ajax.url = url;
    ajax.body = postObj ? JSON.stringify(postObj) : undefined;
    ajax.generateRequest();
  }

  // handle response of ajax call
  _handleResponse(event) {

    switch (this.action) {

      case 'List':
        this.order = event.detail.response.itemcategoryList;

        break;


    }
  }
}
window.customElements.define('food-items', FoodItems);