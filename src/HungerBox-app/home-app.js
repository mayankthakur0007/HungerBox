import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class HomeApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>

      <paper-dropdown-menu label="Travel Type" id="travelType" required>
      <paper-listbox slot="dropdown-content" selected="0">
       <paper-item>Economy</paper-item>
       <paper-item>Business</paper-item>
       </paper-listbox>
     </paper-dropdown-menu>



    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'here you will see vendor list based on location'
      }
    };
  }
}

window.customElements.define('home-app', HomeApp);
