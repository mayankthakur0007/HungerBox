import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/paper-button/paper-button.js';
import '../../node_modules/@polymer/iron-ajax/iron-ajax.js';
import '../../node_modules/@polymer//polymer/lib/elements/dom-repeat.js';
import '../../node_modules/@polymer/iron-collapse/iron-collapse.js';
import '../../node_modules/@polymer/iron-form/iron-form.js';
import '../../node_modules/@polymer/paper-input/paper-input.js';
/**
* @customElement
* @polymer
*/
class AdminPage extends PolymerElement {
  static get template() {
    return html`
<style>
  #form {
    width: 600px;
    border: 2px dotted black;
    border-radius: 10px;
    padding: 30px;
    margin: 70px 100px 0px 100px;
    background-color: gold;
  }

  #add {
    margin-bottom: 30px;
  }

  h1 {
    color: white;
    font-family: Comic Sans, Comic Sans MS, cursive;
  }

  .head {
    text-align: center;
  }

  .data {
    text-align: center;
  }
</style>
<link rel="stylesheet" href="../../node_modules/bootstrap/dist/css/bootstrap.min.css">
<h1>Admin Portal</h1>
<paper-button raised on-click="_handleAdd" class="btn btn-primary" id="add">Add</paper-button>
<div>
  <table class="table table-dark table-hover">
    <tr>
      <th class="head">Vendor Id</th>
      <th class="head">Vendor Name</th>
      <th class="head">Vendor Ratings</th>
      <th class="head">Action</th>
    </tr>
    <template is="dom-repeat" items={{order}}>
      <tr>
        <td class="data">{{item.vendorId}}</td>
        <td class="data">{{item.vendorName}}</td>
        <td class="data">
{{item.rating}}
        </td>
        <td class="data">
          <paper-button raised on-click="_handleDelete" class="btn btn-primary">Delete</paper-button>
        </td>
      </tr>
    </template>
  </table>

  <iron-collapse id="collapse">
    <iron-form id="form">
      <form>
        <paper-input label="Name" id="name"></paper-input>
        <paper-input label="Job" id="job"></paper-input>
        <paper-button raised on-click="_handleSubmit" class="btn btn-primary" id="save1">Save</paper-button>
        <paper-button raised on-click="_handleEditSubmit" class="btn btn-primary" id="edit">Edit</paper-button>
      </form>
    </iron-form>
    </iron collapse>
</div>


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
      id:
      {
        type: String

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

    this._makeAjax(`http://10.117.189.175:8080/mealbox/vendors`, "get", null);
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
  //   _handleEditSubmit(event) {
  // let name = this.$.name.value;
  //     let job = this.$.job.value;
  //     let obj = { name: name, job: job };
  //     this._makeAjax(`http://localhost:3000/users/${this.id}`, "put", obj);
  //     this.$.form.reset();
  //     this.action = 'Edit';
  //     this.$.collapse.toggle();
  //   }

  //adding vendor details in the database
  // _handleSubmit() {
  //   let name = this.$.name.value;
  //   let job = this.$.job.value;
  //   let obj = { name: name, job: job };
  //   console.log(obj);
  //   this._makeAjax(`http://localhost:3000/users`, "post", obj);
  //   this.$.form.reset();
  //   this.action = 'Add';
  //   this.$.collapse.toggle();
  // }

  //ajax call delete method which will delete item based on id
  // _handleDelete(event) {
  //   let id = event.model.item.id;
  //   this._makeAjax(`http://localhost:3000/users/${id}`, "delete");
  //   this.action = 'Delete';
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
        this.order = event.detail.response;
        console.log(this.order);
        break;


    }
  }
}

window.customElements.define('admin-page', AdminPage);