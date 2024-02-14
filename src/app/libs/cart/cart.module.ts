import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {cartFeatureKey, cartReducer} from "./state/cart.reducer";
import {CartEffects} from "./state/cart.effects";

@NgModule({

  imports : [
    StoreModule.forFeature(cartFeatureKey, cartReducer),
    EffectsModule.forFeature([CartEffects])
  ]
})
export class CartModule {
}
