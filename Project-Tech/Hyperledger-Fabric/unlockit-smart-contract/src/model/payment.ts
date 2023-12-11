/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

@Object()
export class Payment {
    @Property()
    public id: string;

    @Property()
    public contractId: string;

    @Property()
    public amount: number;

    @Property()
    public landlordAccount: string;

    @Property()
    public tenantAccount: string;

    @Property()
    public expirationTime: string;

    @Property()
    public firstPaymentStatus: string;

    @Property()
    public nextPaymentStatus: string[];

    @Property()
    public finalPaymentDate: string;
}
