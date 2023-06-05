import { createContext } from "react";

// export const Context = createContext({
//     userLogin: {},
//     setUserLogin: () => { },
//     user: {},
//     setUser: () => { },
//     property: {},
//     setProperty: () => { },
//     contract: {},
//     setContract: () => { },
//     advertise: {},
//     setAdvertise: () => { },
// });

/* -------- USE STATE TEMP ---------- */

/*

// All
const [id, setId] = useState("");

// User - Personal Information
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState(900000000);
const [taxId, setTaxId] = useState(100000000);
// User - Address
const [address, setAddress] = useState("");
const [country, setCountry] = useState("");
const [city, setCity] = useState("");
// User - Advertises
const [advertises, setAdvertises] = useState([]);
// User - Contracts
const [contracts, setContracts] = useState([]);

// Property
const [location, setLocation] = useState("");
const [type, setType] = useState("");
const [area, setArea] = useState(60);
const [propertyAddress, setPropertyAddress] = useState("");
const [description, setDescription] = useState("");
const [photo, setPhoto] = useState("");
const [landlordId, setLandlordId] = useState("");

// Contract
const [term, setTerm] = useState("");
const [initialDate, setInitialDate] = useState("");
const [finalDate, setFinalDate] = useState("");
const [price, setPrice] = useState(100);
const [conditions, setConditions] = useState("");
// const [landlordId, setLandlordId] = useState("");
const [tenantId, setTenantId] = useState("");

// Advertise
const [propertyId, setPropertyId] = useState("");
const [contractId, setContractId] = useState("");
const [title, setTitle] = useState("");

*/

/* ------------------------------- */


// // User Login
  // const [userLogin, setUserLogin] = useState({
  //   id: "",
  //   email: "",
  // });

  // // User
  // const [user, setUser] = useState({
  //   id: "",
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phone: 900000000,
  //   taxId: 100000000,
  //   address: "",
  //   country: "",
  //   city: "",
  //   advertises: [],
  //   contracts: [],
  // });

  // // Property
  // const [property, setProperty] = useState({
  //   id: "",
  //   location: "",
  //   type: "",
  //   area: 60,
  //   propertyAddress: "",
  //   description: "",
  //   photo: "",
  //   landlordId: "",
  // });

  // // Contract
  // const [contract, setContract] = useState({
  //   id: "",
  //   term: "",
  //   initialDate: "",
  //   finalDate: "",
  //   price: 100,
  //   conditions: "",
  //   landlordId: "",
  //   tenantId: "",
  // });

  // // Advertise
  // const [advertise, setAdvertise] = useState({
  //   id: "",
  //   propertyId: "",
  //   contractId: "",
  //   title: "",
  // });

  // useEffect(() => {
  // }, [user]);

  // const contextValue = useMemo(
  //   () => ({
  //     userLogin,
  //     setUserLogin,
  //     user,
  //     setUser,
  //     property,
  //     setProperty,
  //     contract,
  //     setContract,
  //     advertise,
  //     setAdvertise,
  //   }),
  //   [userLogin, setUserLogin, user, setUser, property, setProperty, contract, setContract, advertise, setAdvertise]
  // );