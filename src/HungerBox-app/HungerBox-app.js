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
    <app-toolbar>Menu</app-toolbar>
    <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
      <a name="login" href="[[rootPath]]login">Login</a>
      <a name="view2" href="[[rootPath]]view2">My Profie</a>
      <a name="view5" href="[[rootPath]]view5">My Orders</a>
      <a name="view3" href="[[rootPath]]view3">About Us</a>
      <a name="login" href="[[rootPath]]login">Logout</a>
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
      <my-view1 name="view1"></my-view1>
      <my-view404 name="view404"></my-view404>
    </iron-pages>
  </app-header-layout>
</app-drawer-layout>
`;
}

static get properties() {
return {
page: {
type: String,
reflectToAttribute: true,
observer: '_pageChanged'
},
routeData: Object,
subroute: Object
};
}

static get observers() {
return [
'_routePageChanged(routeData.page)'
];
}

_routePageChanged(page) {
// Show the corresponding page according to the route.
//
// If no page was found in the route data, page will be an empty string.
// Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
this.page = page || 'view1';

}

_pageChanged(page) {
// Import the page component on demand.
//
// Note: `polymer build` doesn't like string concatenation in the import
// statement, so break it up.
switch (page) {
case 'login':
import('./login-form.js');
break;
case 'view1':
import('./my-view1.js');
break;
case 'view3':
import('./my-view3.js');
break;
case 'view404':
import('./my-view404.js');
break;
}
}
}

window.customElements.define('hunger-app', HungerBoxApp);