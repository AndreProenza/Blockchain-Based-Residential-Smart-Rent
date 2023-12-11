/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

@Object()
export class RentalInfo {
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
    public highestProposal: number;

    @Property()
    public numberOfProposals: number;
}
