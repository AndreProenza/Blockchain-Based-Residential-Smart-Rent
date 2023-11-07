## Prerequisites

- Setup [Hyperledger Fabric](https://github.com/AndreProenza/Blockchain-Based-Residential-Smart-Rent/edit/main/Project-Tech/README-HLF.md)

## Getting Started

The following instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

- Run the Backend
```bash
cd Backend/unlockit/
mvn spring-boot:run
```

- Run the Frontend
```bash
cd Frontend/unlockit/
npm start
```

- Launch the Blockchain Interface Server for Org1
```bash
cd Blockchain/client/
npm run server:org1:dev
```

- Launch the Blockchain Interface Server for Org2
```bash
cd Blockchain/client/
npm run server:org2:dev
```
