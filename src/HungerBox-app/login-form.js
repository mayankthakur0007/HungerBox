import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/paper-button/paper-button.js';
import '../../node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../node_modules/@polymer/paper-listbox/paper-listbox.js';
import '../../node_modules/@polymer/paper-item/paper-item.js';
import '../../node_modules/@polymer/paper-input/paper-input.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer/iron-ajax/iron-ajax.js';

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
      <form><div id="loginLayout">
      <div id="input">
        <div class="items"> <paper-input type="email" label="Email ID" id="email"></paper-input></div>
        <div class="items"> <paper-input type="password" label="Password" id="password"></paper-input></div>
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
            page: {
                type: String,
                reflectToAttribute: true,
                observer: '_pageChanged'
            },
            selected: {
                type: Number,
                value: 0
            },
            routeData: Object,
            subroute: Object,
            action: {
                type: String,
                value: 'List'
            },
            users: {
                type: Array,
                value: []
            },
            valid: {
                type: String,
                value: "no"
            }
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this._getData();
    }
    /** getdata function for fetching the data from the database and showing it. Ajax request is done in pets
    
    for the data with sell property value "yes" only. This function is also called when any new pet is added 
    
    so that the list got again refreshed **/

    _getData() {
        // this._makeAjax(`http://localhost:3000/users`, "get", null);
    }
    handleLogin(event) {
        event.preventDefault();
        let email = this.$.email.value;
        let password = this.$.password.value;
        let users = this.users;
        if (email == '' || password == '') {
            alert("enter details");
            return false;
        } else {
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == email && users[i].password == password) {
                    this.valid = "yes";
                  
                    let userdata =  users[i];
                    let phone = users[i].mobile;
                    sessionStorage.setItem('phone', phone);
                    userdata = JSON.stringify(userdata);
                    sessionStorage.setItem('userdata', userdata);
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('login', 'true');
                    this.$.loginForm.reset();
                    this.dispatchEvent(new CustomEvent('refresh-login', { detail: { item: true, email: email }, bubbles: true, composed: true }));
                    this.set('route.path', 'home');
                }
            } if (this.valid == "no") {
                alert("wrong");
            }
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
                break;
        }


    }

}
window.customElements.define('login-form', LoginForm);
