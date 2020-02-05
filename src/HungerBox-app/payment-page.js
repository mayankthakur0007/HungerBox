import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/paper-button/paper-button.js';
import '../../node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../node_modules/@polymer/paper-listbox/paper-listbox.js';
import '../../node_modules/@polymer/paper-item/paper-item.js';
import '../../node_modules/@polymer/paper-input/paper-input.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer/iron-ajax/iron-ajax.js';
import '../../node_modules/@polymer/iron-form/iron-form.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';

/**
* @customElement
* @polymer
*/

class PaymentPage extends PolymerElement {
    static get template() {
        return html`
<style>
    :host {
        display: block;
    }
    paper-card{
        padding: 10px;
    }

    .pay{
        background-color:white;
    }
</style>

<div class="pay">

<h2>Payment Page</h2>
<div>

    <h3>Cart</h3>
    <template is="dom-repeat" items={{cartItems}}>
        <paper-card heading="">
          
            <h4>Name : {{item.foodName}}</h4>
            <h4>Price : ₹{{item.price}}</h4>
            <h4>Quantity : <iron-icon icon="remove" id="remove" on-click="_less"></iron-icon> {{quantity}}
                <iron-icon icon="add" id="add" on-click="add"></iron-icon>
            </h4>
        </paper-card>
    </template>


</div>

<div>

    <h4>Mode of Payment</h4>


<paper-radio-group id="mod" selected="" aria-labelledby="label1">
    <paper-radio-button name="PayTm">Paytm</paper-radio-button> <br>
    <paper-radio-button name="PhonePe">Phone Pe</paper-radio-button>
</paper-radio-group> <br>

<paper-button raised class="custom indigo" on-click="_handlePlaceOrder">Place Order</paper-button>

</div>

</div>

`;
    }

    static get properties() {
        return {
            action: {
                type: String,
                value: 'List'
            },
            cartItems: {
                type: Array,
                value: this.cartItems
            },
            quantity: {
                type: Number,
                value: 1
            }
        };
    }

    add() {
        this.quantity += 1;
    }
    _handlePlaceOrder(){
        
    }
    _less() {
        if (this.quantity != 0) {
            this.quantity = this.quantity - 1;
        }
    }
    ready() {
        super.ready();
        console.log(this.cartItems)
    }

_getData() {
    this._makeAjax(``, "get", null);
}
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
window.customElements.define('payment-app', PaymentPage);