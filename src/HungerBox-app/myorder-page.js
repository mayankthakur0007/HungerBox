import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/app-route/app-route.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';




/**
* @customElement
* @polymer
*/
class MyOrder extends PolymerElement {
  static get template() {
    return html`
<style>


  paper-card {
    width: 500px
  }

  p {
    width: 100%;
    padding-left: 20px;
  }

  h2 {
    text-align: center;
  }

  h3 {
    padding-left: 20px;
    color:white;
  }
</style>
<h3> Order history </h3>
<template is='dom-repeat' items={{details}}>
  <paper-card>
    <h3>Order Details</h3>
    <p>foodOrderId:{{item.foodOrderId}}</p>
    <p>orderDate:{{item.orderDate}}</p>
    <p>orderStatus:{{item.orderStatus}}</p>
    <p>paymentType:{{item.paymentType}}</p>
    <p>totalAmount:{{item.totalAmount}}</p>
    <h3>Food Details</h3>
 <template is='dom-repeat' items={{item.orderedFood}} as="food" >
      <p>foodName: {{food.foodName}}</p>
      <p>quantity: {{food.quantity}}</p>
      <p>vendorName: {{food.vendorName}}</p>
  </template>
  </paper-card>
  <hr/>
  </template>
<iron-ajax id="ajax" on-response="_handleResponse" handle-as="json" content-type='application/json'></iron-ajax>
`;
  }
  static get properties() {
    return {
      details: {
        type: Object,
        value: []
      },
      action: {
        type: String
      },

      show: {
        type: Boolean,
        value: false
      },
      passengers: {
        type: Boolean,
        value: []
      }


    };
  }
  connectedCallback() {
    super.connectedCallback();
    this._getData();
  }

  /** getdata function for fetching the data from the database and showing it. Ajax request is done in getting
  passenger detail for the data with sell property value "yes" only. This function is also called when any new pet is
  added
  
  so that the list got again refreshed **/

  _getData() {
    let id = sessionStorage.getItem('id')
    this._makeAjax(`http://10.117.189.181:8080/mealbox/employees/${id}/orders`, "GET", null);
    this.action = 'List';
  }
  _makeAjax(url, method, postObj) {
    console.log(url, method, postObj)
    const ajax = this.$.ajax;
    ajax.method = method;
    ajax.url = url;
    ajax.body = postObj ? JSON.stringify(postObj) : undefined;
    ajax.generateRequest();
  }
  _handleResponse(event) {

    switch (this.action) {

      case 'List':
        this.details = event.detail.response;


        break;
    }


  }
}

window.customElements.define('my-order', MyOrder);