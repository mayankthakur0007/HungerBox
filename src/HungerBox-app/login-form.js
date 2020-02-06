import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/paper-button/paper-button.js';
import '../../node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../node_modules/@polymer/paper-listbox/paper-listbox.js';
import '../../node_modules/@polymer/paper-item/paper-item.js';
import '../../node_modules/@polymer/paper-input/paper-input.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer/iron-ajax/iron-ajax.js';
import '../../node_modules/@polymer/iron-form/iron-form.js';

/**
 * @customElement
 * @polymer
 */

class LoginForm extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
          display: block;
        }
        #btn{
          margin:10px 10px 10px 160px;
         background-color:  #ff7a22;
         color: white;
        }
        
        #input{
          display:flex;
          flex-direction:column;
          flex-wrap:wrap;
        }
        .items{
          margin:10px;
         
        }

        #start{
          margin-top:-18px;
        }
       form{
          padding:2px;
        }
        #loginLayout{
            border-radius:20px;
            background-color: white;
            width:450px;
            padding: 20px;
            margin:100px 250px 150px 250px;
        }
      </style>
      <app-location route="{{route}}">
      </app-location>
      <iron-form id="loginForm">
        <form>
            <div id="loginLayout">
                 <div id="input">
                <div class="items"> <paper-input type="number" label="SapId" id="sapId" required error-message="Enter the SapId"></paper-input></div>
                <div class="items"> <paper-input type="password" label="Password"required error-message="Enter the password" id="password"></paper-input></div>
            </div>
                <div class="items"><paper-button type="submit" id="btn" class="btn btn-success" on-click="handleLogin">Login</paper-button></div>
                </div>
        </form>
      </iron-form>

      <iron-ajax id="ajax" on-response="_handleResponse" handle-as="json" content-type='application/json'></iron-ajax>
    `;
    }

    static get properties() {
        return {

            selected: {
                type: Number,
                value: 0
            },
            action: {
                type: String,
                value: 'List'
            },
            users: {
                type: Array,
                value: []
            },
            login: {
                type: Boolean,
                value: false
            }
        };
    }



    connectedCallback() {
        super.connectedCallback();

    }
    /** getdata function for fetching the data from the database and showing it. Ajax request is done in pets
    
    for the data with sell property value "yes" only. This function is also called when any new pet is added 
    
    so that the list got again refreshed **/


    handleLogin() {
        if (this.$.loginForm.validate()) {
            let obj = {
                employeeId: parseInt(this.$.sapId.value),
                password: this.$.password.value
            }
          
            this._makeAjax(`http://10.117.189.181:8080/mealbox/employees`, "post", obj);
        }

    }

    _makeAjax(url, method, postObj) {
        const ajax = this.$.ajax;
        ajax.method = method;
        ajax.url = url;
        ajax.body = postObj ? JSON.stringify(postObj) : undefined;
        ajax.generateRequest();
    }
    _handleResponse(event) {

        switch (this.action) {

            case 'List':
                this.users = event.detail.response;
                if (this.users.role == "ADMIN") {
                    sessionStorage.setItem('name',this.users.employeeName)
                    this.login = true;
                    this.dispatchEvent(new CustomEvent('refresh-list', {detail: { isLoggedIn: true} ,bubbles: true, composed: true}));
                    this.set('route.path', '/admin');
                }
                if (this.users.role == "vendor") {
                    sessionStorage.setItem('name',this.users.employeeName)
                    this.dispatchEvent(new CustomEvent('refresh-list', {detail: {isLoggedIn: true} ,bubbles: true, composed: true}));
                    this.set('route.path', '/vendor');
                }
                if (this.users.role == "EMPLOYEE") {
                    sessionStorage.setItem('name',this.users.employeeName)
                    sessionStorage.setItem('customer',true)
                    this.dispatchEvent(new CustomEvent('refresh-list', {detail: {isLoggedIn: true} ,bubbles: true, composed: true}));
                    this.set('route.path', '/home');
                }
                break;
        }
  

    }

}
window.customElements.define('login-form', LoginForm);
