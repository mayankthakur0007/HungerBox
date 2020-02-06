/**
 * 
 * Copyright (c) 2020 The meal box project Authors. All rights reserved.
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class AboutPage extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
        <h1>Yummy Tummy</h1>
        <p>Food App</p>
        <p>Stops Craving on one tap</p>
      </div>
    `;
  }
}

window.customElements.define('about-page', AboutPage);
