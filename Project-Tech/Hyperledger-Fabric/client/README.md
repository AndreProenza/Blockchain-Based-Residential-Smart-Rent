# API

This API exposes via HTTP the operations that can be performed on the chaincode assets.

## Install libraries

```bash
npm install
```

## Launch the server for Org1

Launch the server for the Org1

```bash
npm run server:org1:dev
```

## Launch the server for Org2

Launch the server for the Org2

```bash
npm run server:org2:dev
```

## Operations

There are two APIs:

Org1: http://localhost:3003
Org2: http://localhost:3004


##### Unlockit Smart Contract Chaincode #####


#### General

### Read Asset - Org1

```bash
http POST "http://localhost:3003/test-evaluate" fcn=ReadAsset args:='["PropertyAsset-bzx0dv9cighlxk5iefvs25wq3m", "PropertyAsset"]'
```
### Read All Assets By Type - Org1

```bash
http POST "http://localhost:3003/test-evaluate" fcn=GetAllAssetsByAssetType args:='["PropertyAsset"]'

http POST "http://localhost:3003/test-evaluate" fcn=GetAllAssetsByAssetType args:='["ContractAsset"]'

http POST "http://localhost:3003/test-evaluate" fcn=GetAllAssetsByAssetType args:='["Proposal"]'

http POST "http://localhost:3003/test-evaluate" fcn=GetAllAssetsByAssetType args:='["RentalInfo"]'

http POST "http://localhost:3003/test-evaluate" fcn=GetAllAssetsByAssetType args:='["DigitalSignature"]'
```

### Verify If Asset Exists - Org1

```bash
http POST "http://localhost:3003/test-evaluate" fcn=AssetExists args:='["PropertyAsset-eon8piezi7th641n0thlwspaqz"]'
```

### Get All assets - Org1

```bash
http POST "http://localhost:3003/test-evaluate" fcn=GetAllAssets 
```

### Delete All assets - Org1

```bash
http POST "http://localhost:3003/test-submit" fcn=DeleteAllAssets
```


#### Property 


### Create Property - Org1
```bash
http POST "http://localhost:3003/test-submit" fcn=CreatePropertyAsset args:='["user1", "Rua1", "Lisbon", "T2", "85", "Description1"]'
```

### Delete property - Org1
```bash
http POST "http://localhost:3003/test-submit" fcn=DeletePropertyAsset args:='["2k5u41rfga1hi9fk6uyj9mvenn"]'
```

### Read All Properties By LandlordId - Org1
```bash
http POST "http://localhost:3003/test-evaluate" fcn=ReadAllPropertiesByLandlordId args:='["user1"]'
```


#### Contract

### Create Contract - Org1
```bash
http POST "http://localhost:3003/test-submit" fcn=CreateContractAsset args:='["propertyid", "short term", "10-02-2023", "30-04-2023", "500", "Conditions 1", "user1"]'
```

### Update Contract - Org1
```bash
http POST "http://localhost:3003/test-submit" fcn=UpdateContractAsset args:='["contractId", "proposalId"]'
```

### Delete Contract - Org1
```bash
http POST "http://localhost:3003/test-submit" fcn=DeleteContractAsset args:='["contractId"]'
```

### Read Property Active Contract - Org1
```bash
http POST "http://localhost:3003/test-evaluate" fcn=ReadPropertyActiveContract args:='["propertyId"]'
```

### Read All Contracts By Property Id - Org1
```bash
http POST "http://localhost:3003/test-evaluate" fcn=ReadAllContractsByPropertyId args:='["propertyId"]'
```


#### Proposal

### Create Proposal - Org1
```bash
http POST "http://localhost:3003/test-submit" fcn=CreateProposal args:='["tenantId", "contractId", "originalPrice", "proposalPrice"]'
```

### Update Proposal - Org1
```bash
http POST "http://localhost:3003/test-submit" fcn=UpdateProposal args:='["proposalId", "status"]'
```

### Delete Proposal - Org1
```bash
http POST "http://localhost:3003/test-submit" fcn=DeleteProposal args:='["proposalId"]'
```

### Read All Proposals By ContractId - Org1
```bash
http POST "http://localhost:3003/test-evaluate" fcn=ReadAllProposalsByContractId args:='["ContractAssetId"]'
```


#### Encrypted Id

### Create Encrypted Id - Org1
```bash
http POST "http://localhost:3003/test-submit" fcn=CreateEncryptedId args:='["107709419344541253411", "MEUCIEStAMKEZ6sgJ3gcovkZj26090zhWi/BMwH2ulqUhuciAiEAuU/1ITBy1GQW7UqFclNLizkRrDvCKXou6Wx0aOckPZ8="]'

http POST "http://localhost:3003/test-submit" fcn=CreateEncryptedId args:='["user1", "signaturetest"]'

 ```

 ### Delete Encrypted Id - Org1
```bash
http POST "http://localhost:3003/test-submit" fcn=DeleteEncryptedId args:='["107709419344541253411"]'
 ```


#### Digital Signature

### Create Digital Signature - Org1
```bash
http POST "http://localhost:3003/test-submit" fcn=CreateDigitalSignature args:='["107709419344541253411", "MEUCIEStAMKEZ6sgJ3gcovkZj26090zhWi/BMwH2ulqUhuciAiEAuU/1ITBy1GQW7UqFclNLizkRrDvCKXou6Wx0aOckPZ8="]'

http POST "http://localhost:3003/test-submit" fcn=CreateDigitalSignature args:='["user1", "signaturetest"]'

 ```

 ### Delete Digital Signature - Org1
```bash
http POST "http://localhost:3003/test-submit" fcn=DeleteDigitalSignature args:='["107709419344541253411"]'
 ```



### Asset Chaincode #####

### Get all assets - Org1

```bash
http POST "http://localhost:3003/test-evaluate" fcn=GetAllAssets 
```
### Get all assets - Org2

```bash
http POST "http://localhost:3004/test-evaluate" fcn=GetAllAssets 
```


### Create asset - Org1

```bash
http POST "http://localhost:3003/test-submit" fcn=CreateAsset args:='["asset10", "blue", "10", "4"]'

http POST "http://localhost:3003/test-evaluate" fcn=ReadAsset args:='["asset10"]'
```


### Read asset to verify owner

```bash
http POST "http://localhost:3003/test-evaluate" fcn=ReadAsset args:='["asset10"]'

```
### Org2 updates the asset

```bash
http POST "http://localhost:3004/test-submit" fcn=UpdateAsset args:='["asset10", "Red", "10", "4"]'
http POST "http://localhost:3004/test-evaluate" fcn=ReadAsset args:='["asset10"]'

```

### Read asset to verify owner again

```bash
http POST "http://localhost:3003/test-evaluate" fcn=ReadAsset args:='["asset10"]'


```