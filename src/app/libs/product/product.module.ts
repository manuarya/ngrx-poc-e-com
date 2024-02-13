import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {reducers, stateFeatureKey} from "./state/product.reducer";
import {ProductEffects} from "./state/product.effects";
import {EffectsModule} from "@ngrx/effects";

@NgModule({

  imports : [
    StoreModule.forFeature(stateFeatureKey, reducers),
    EffectsModule.forFeature([ProductEffects])
  ]
})
export class ProductModule {
}
