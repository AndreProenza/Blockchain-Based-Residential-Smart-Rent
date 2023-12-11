/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

@Object()
export class PropertyAsset {
    @Property()
    public id: string;

    @Property()
    public landlordId: string;

    @Property()
    public address: string;

    @Property()
    public location: string;

    @Property()
    public type: string;

    @Property()
    public area: number;

    @Property()
    public description: string;
}
