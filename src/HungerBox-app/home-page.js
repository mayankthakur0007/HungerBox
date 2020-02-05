import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';

class MyView1 extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
         padding: 10px;
        }
        paper-card{
          width:500px;
          margin:10px;
          border: 2px solid black;
          border-radius: 10px;
          padding: 5px;
        }
        paper-button{
          background-color:orange; 
        }
        #workingLocation{
          background-color: white;
          border-radius: 10px;
          padding: 5px;
        }
        h2{
          margin-left: 8px;
        }
      </style>

      

      <paper-dropdown-menu label="Working Location" id="workingLocation" required>
      <paper-listbox slot="dropdown-content" selected="">
       <paper-item>Surya Sapphire</paper-item>
       <paper-item>Jigni</paper-item>
       </paper-listbox>
     </paper-dropdown-menu> <br>

     
<paper-card heading="" image="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Snack It">

<h2>Snack It</h2>
  
<div class="card-actions">
  
  <paper-button raised>Order Here </paper-button>
</div>
</paper-card>

<paper-card heading="" image="https://media.gettyimages.com/photos/authentic-indian-food-picture-id639389404?s=612x612" alt="Give Me 5">

<h2>Give Me 5</h2>

<div class="card-actions">
<paper-button raised>Order Here </paper-button>

</div>
</paper-card>


<paper-card heading="" image="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Dosa Talks">

<h2>Dosa Talks</h2>
 

<div class="card-actions">
<paper-button raised>Order Here </paper-button>

</div>
</paper-card>

<paper-card heading="" image="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Go Nature">

<h2>Go Nature</h2>
 

<div class="card-actions">
<paper-button raised>Order Here </paper-button>
 
</div>
</paper-card>


     
    `;
  }
}

window.customElements.define('home-page', MyView1);
