/**
* this is the main routing page of this application.
*/

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '../../node_modules/@polymer/app-layout/app-drawer/app-drawer.js';
import '../../node_modules/@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '../../node_modules/@polymer/app-layout/app-header/app-header.js';
import '../../node_modules/@polymer/app-layout/app-header-layout/app-header-layout.js';
import '../../node_modules/@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '../../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../../node_modules/@polymer/app-route/app-location.js';
import '../../node_modules/@polymer/app-route/app-route.js';
import '../../node_modules/@polymer/iron-pages/iron-pages.js';
import '../../node_modules/@polymer/iron-selector/iron-selector.js';
import '../../node_modules/@polymer/paper-icon-button/paper-icon-button.js';
import './my-icons.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);


/**
* main class that provides the core API for Polymer and main
* features including template,routing and property change observation.
*/

class HungerBoxApp extends PolymerElement {
  static get template() {
    return html`
<style>
  :host {
    --app-primary-color: #ff7a22;
    --app-secondary-color: black;

    display: block;
  }

  app-drawer-layout:not([narrow]) [drawer-toggle] {
    display: none;
  }

  app-header {
    color: #fff;
    background-color: var(--app-primary-color);
  }

  app-header paper-icon-button {
    --paper-icon-button-ink-color: white;
  }

  h3 {
    font-family: Comic Sans, Comic Sans MS, cursive;
  }

  .drawer-list {
    margin: 0 20px;
  }

  .drawer-list a {
    display: block;
    padding: 0 16px;
    text-decoration: none;
    color: var(--app-secondary-color);
    line-height: 40px;
  }

  .drawer-list a.iron-selected {
    color: black;
    font-weight: bold;
  }
</style>

<app-location route="{{route}}">
</app-location>

<app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
</app-route>

<app-drawer-layout fullbleed="" narrow="{{narrow}}">
  <!-- Drawer content -->
  <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
    <template is="dom-if" if={{!login}}>
      <app-toolbar>Login to Continue</app-toolbar>
    </template>
    <template is="dom-if" if={{login}}>
      <app-toolbar>Welcome {{name}}</app-toolbar>
    </template>
    <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
      <template is="dom-if" if={{!login}}>
        <a name="login" href="[[rootPath]]login">
          <paper-button>Login</paper-button>
        </a>
      </template>
      <a name="about" href="[[rootPath]]about">
        <paper-button>About Us</paper-button>
      </a>
      <template is="dom-if" if={{customer}}>
        <a name="orders" href="[[rootPath]]orders">
          <paper-button>My Orders</paper-button>
        </a>
      </template>
      <template is="dom-if" if={{login}}>
        <a name="view2" href="[[rootPath]]view2">
          <paper-button>My Profie</paper-button>
        </a>
        <a name="login" href="[[rootPath]]login">
          <paper-button on-click="_handleLogout">Logout</paper-button>
        </a>
      </template>
    </iron-selector>
  </app-drawer>
  <!-- Main content -->
  <app-header-layout has-scrolling-region="">
    <app-header slot="header" condenses="" reveals="" effects="waterfall">
      <app-toolbar>
        <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
        <div main-title="">
          <h3>Yummy Tummy</h3>
        </div>
      </app-toolbar>
    </app-header>
    <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
      <login-form name="login"></login-form>
      <home-page name="home"></home-page>
      <order-page name="orders"></order-page>
      <vendor-page name="vendor"></vendor-page>
      <about-page name="about"></about-page>
      <payment-app name="payment"></payment-app>
      <food-items name="food" vendor-id={{vendorId}}></food-items>
      <admin-page name="admin"></admin-page>
      <my-view404 name="view404"></my-view404>
    </iron-pages>
  </app-header-layout>
</app-drawer-layout>
`;
  }
  //properties declaration and observer declaration
  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      name: {
        type: String,
        value: sessionStorage.getItem('name')
      },
      login: {
        type: Boolean,
        value: false
      },
      isLoggedIn: {
        type: Boolean,
        value: false,
        observer: "_isLoggedInChanged"
      },
      vendorId: {
        type: Number
      },
      customer: {
        type: Boolean,
        value: false
      },
      routeData: Object,
      subroute: Object,

    };
  }

  _handleLogout() {
    sessionStorage.clear();
    this.login = false;
    this.customer = false;
  }
  // observing the page change
  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }
  connectedCallback() {
    super.connectedCallback();
  }

  _isLoggedInChanged() {
    this.addEventListener('refresh-list', () => this._handleRefresh(event))
  }
  ready() {
    super.ready();
    this.addEventListener('vendor-id', () => this._handleId(event))
  }
  // _vendorId() {
  // this.addEventListener('vendor-id', () => this._handleId(event))
  // }
  _handleId(event) {
    this.vendorId = event.detail.id;
  }
  _handleRefresh(event) {
    console.log(event.detail.isCustomer)
    this.login = event.detail.isLoggedIn;
    this.customer = sessionStorage.getItem('customer');
  }
  /**
  * Show the corresponding page according to the route.
  * If no page was found in the route data, page will be an empty string.
  * Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
  */
  _routePageChanged(page) {
    this.page = page || 'login';
  }

  /**
  * Import the page component on demand.
  * Note: `polymer build` doesn't like string concatenation in the import
  * statement, so break it up.
  */
  _pageChanged(page) {

    switch (page) {
      case 'login':
        import('./login-form.js');
        break;
      case 'home':
        import('./home-page.js');
        break;
      case 'about':
        import('./about-page.js');
        break;
      case 'admin':
        import('./admin-page.js');
        break;
      case 'orders':
        import('./orders-page.js');
        break;
      case 'payment':
        import('./payment-page.js');
        break;
      case 'vendor':
        import('./vendor-page.js');
        break;
      case 'food':
        import('./food-items.js');
        break;
      case 'view404':
        import('./my-view404.js');
        break;
    }
  }
}

window.customElements.define('hunger-app', HungerBoxApp);