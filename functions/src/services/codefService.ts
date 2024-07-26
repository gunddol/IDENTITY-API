import { config } from "dotenv";

config(); // .env 파일

import { ReqIdentity, ReqDriverLicense } from "../models/identity.type";
import NodeRSA = require("node-rsa");
import * as logger from "firebase-functions/logger";
import { EasyCodef, EasyCodefConstant } from "easycodef-node";

// 비밀번호는 발급된 publicKey로 RSA 암호화
const encryptPassword = (password: string) => {
  const keyDER = Buffer.from(PUBLIC_KEY, "base64");
  const key = new NodeRSA();
  key.importKey(keyDER, "pkcs8-public-der");
  key.setOptions({ encryptionScheme: "pkcs1" });
  return key.encrypt(password, "base64");
};

// 코드에프 가입을 통해 발급 받은 RSA 공개키 정보
const PUBLIC_KEY = process.env.PUBLIC_KEY as string;

// 코드에프 가입을 통해 발급 받은 클라이언트 정보 - 데모
const DEMO_CLIENT_ID = process.env.DEMO_CLIENT_ID as string;
const DEMO_CLIENT_SECRET = process.env.DEMO_CLIENT_SECRET as string;

const CERT_FILE = process.env.CERT_FILE as string;
const KEY_FILE = process.env.KEY_FILE as string;

// 1.쉬운 코드에프 객체 생성
const codef = new EasyCodef();

// 2.RSA암호화를 위한 퍼블릭키 설정
codef.setPublicKey(PUBLIC_KEY);

// 3.데모 클라이언트 정보 설정
codef.setClientInfoForDemo(DEMO_CLIENT_ID, DEMO_CLIENT_SECRET);

const identityBaseURL = "/v1/kr/public/mw/identity-card/check-status";

export const codefCertService = async (userData: ReqIdentity) => {
  try {
    logger.info(" >>> 주민등록 진위확인 시작 <<< ");
    logger.info(
      `userName: ${userData.userName}, userData: ${JSON.stringify(userData)}`,
      {
        structuredData: true,
      }
    );
    const certPassword = encryptPassword("nomadicpeace96!");
    const data = {
      ...userData,
      certFile: CERT_FILE,
      keyFile: KEY_FILE,
      certPassword: certPassword,
    };

    logger.info(`인증서 요청 파라미터 확인: ${JSON.stringify(data)}`);

    const response = await codef.requestProduct(
      identityBaseURL,
      EasyCodefConstant.SERVICE_TYPE_DEMO,
      data
    );

    return response;
  } catch (error: any) {
    throw new Error(`codef 호출 실패: ${error.message}`);
  }
};

const driverBaseURL = "/v1/kr/public/ef/driver-license/status";

export const codefDriverService = async (userData: ReqDriverLicense) => {
  try {
    logger.info(" >>> 운전면허 진위확인 시작 <<< ");

    const certPassword = encryptPassword("nomadicpeace96!");
    const licenseNumber = encryptPassword(userData.licenseNumber);
    const data = {
      ...userData,
      certFile: CERT_FILE,
      keyFile: KEY_FILE,
      certPassword: certPassword,
      licenseNumber: licenseNumber,
    };

    logger.info(
      `userName: ${userData.userName}, certFile: ${data.certFile}, keyFile: ${data.keyFile}`,
      {
        structuredData: true,
      }
    );

    const response = await codef.requestProduct(
      driverBaseURL,
      EasyCodefConstant.SERVICE_TYPE_DEMO,
      data
    );

    return response;
  } catch (error: any) {
    throw new Error(`codef 호출 실패: ${error.message}`);
  }
};
