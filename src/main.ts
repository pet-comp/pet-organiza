import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AppModule } from './app/app.module';
import { register } from 'swiper/element/bundle';

register();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// Call the element loader before the bootstrapModule/bootstrapApplication call
defineCustomElements(window);


