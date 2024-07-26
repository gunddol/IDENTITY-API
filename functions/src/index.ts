// import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { ReqIdentity, ReqDriverLicense } from "./models/identity.type";
import { identity, driverLicense } from "./controllers/codefController";

// Express 앱 초기화
const IdentityAPI = express();

IdentityAPI.use(cors());
IdentityAPI.use(express.json());

IdentityAPI.post(
  "/Identity",
  async (req: express.Request<ReqIdentity>, res: express.Response) => {
    logger.info(
      ">>>>>>>>>>>>>>>>> Identity-API 인증서 신원 조회 시작 >>>>>>>>>>>>>>>>>",
      {
        structuredData: true,
      }
    );
    await identity(req, res);
  }
);

IdentityAPI.post(
  "/DriverLicense",
  async (req: express.Request<ReqDriverLicense>, res: express.Response) => {
    logger.info(
      ">>>>>>>>>>>>>>>>> Identity-API 운전면허 조회 시작 >>>>>>>>>>>>>>>>>",
      {
        structuredData: true,
      }
    );
    await driverLicense(req, res);
  }
);

exports.IdentityAPI = functions.https.onRequest(IdentityAPI);
