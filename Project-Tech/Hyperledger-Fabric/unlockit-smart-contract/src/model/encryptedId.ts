/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

@Object()
export class EncryptedId {
    @Property()
    public userId: string;

    @Property()
    public encryptedId: string;
}
