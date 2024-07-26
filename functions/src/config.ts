import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
// import {config} from "dotenv";
import serviceAccount from "../pickomeapi-firebase-adminsdk-qixzp-f33982f6b4.json";

// config(); // .env 파일
// const serviceAccount = require("../pickomeapi-firebase-adminsdk-qixzp-f33982f6b4.json");

// Firebase Admin SDK 초기화
const firebaseConfig = {
  credential: cert(serviceAccount as ServiceAccount),
};

// const firebaseConfig = {
//   credential: cert(serviceAccount),
// };

const firebaseApp = initializeApp(firebaseConfig);

// 초기화 성공 로그 추가
console.log("Firebase Admin SDK initialized successfully");

// const db = getFirestore(firebaseApp);
const firestore = getFirestore(firebaseApp, "testdb");

// const firestore = admin.firestore();
export { firestore };
