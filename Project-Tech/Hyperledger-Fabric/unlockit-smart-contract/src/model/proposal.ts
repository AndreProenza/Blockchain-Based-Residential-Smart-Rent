/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

@Object()
export class Proposal {
    @Property()
    public id: string;

    @Property()
    public tenantId: string;

    @Property()
    public tenantSignature: string;

    @Property()
    public contractId: string;

    @Property()
    public originalPrice: number;

    @Property()
    public proposalPrice: number;

    @Property()
    public active: boolean;

    @Property()
    public status: string;
}
