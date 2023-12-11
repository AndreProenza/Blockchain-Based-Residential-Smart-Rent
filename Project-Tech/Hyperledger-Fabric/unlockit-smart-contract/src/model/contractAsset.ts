/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

@Object()
export class ContractAsset {
    @Property()
    public id: string;

    @Property()
    public propertyId: string;

    @Property()
    public term: string;

    @Property()
    public initialDate: string;

    @Property()
    public finalDate: string;

    @Property()
    public price: number;

    @Property()
    public conditions: string;

    @Property()
    public landlordId: string;

    @Property()
    public tenantId: string;

    @Property()
    public signed: boolean;

    @Property()
    public landlordSignature: string;

    @Property()
    public tenantSignature: string;
}
