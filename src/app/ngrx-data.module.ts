import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultDataServiceConfig, EntityMetadataMap } from '@ngrx/data';
// import {
//   EntityMetadataMap,
//   NgrxDataModule,
//   DefaultDataServiceConfig
// } from '@ngrx-data';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'crud'
};

export const entityMetadata: EntityMetadataMap = {
  Hero: {},
  User: {}
};

export const pluralNames = { Hero: 'heroes' };

@NgModule({
  imports: [
    CommonModule
    // NgrxDataModule.forRoot({ entityMetadata, pluralNames })
  ],
  declarations: [],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
  ]
})
export class EntityStoreModule {}
