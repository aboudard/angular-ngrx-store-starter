import { importProvidersFrom } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { StorageModule } from "@ngx-pwa/local-storage";
import { AppComponent } from "./app/app.component";
import { CounterEffects } from "./app/effects/counter.effects";
import { metaReducers, reducers } from "./app/reducers";
import { environment } from "./environments/environment";

bootstrapApplication(AppComponent, {
  providers: [
    provideStore(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    provideEffects([CounterEffects]),
    !environment.production ? provideStoreDevtools() : [],
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      StorageModule.forRoot({ IDBNoWrap: true })
    ),
  ],
})
  .then((ref) => {
    // Ensure Angular destroys itself on hot reloads.
    if (window["ngRef"]) {
      window["ngRef"].destroy();
    }
    window["ngRef"] = ref;

    // Otherwise, log the boot error
  })
  .catch((err) => console.error(err));
