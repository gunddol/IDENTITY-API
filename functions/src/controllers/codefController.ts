import {Request, Response} from "express";
import {firestore} from "../config";

import * as logger from "firebase-functions/logger";
import {ReqIdentity, ReqDriverLicense} from "../models/identity.type";
import {codefCertService, codefDriverService} from "../services/codefService";

export const saveData = async (
  collectionName: string,
  docName: string,
  userData: any
) => {
  try {
    const userRef = firestore.collection(collectionName).doc(docName);
    logger.info(`Firestore 저장할 데이터: ${JSON.stringify(userData)}`);
    await userRef.set(userData);
    logger.info(
      `Firestore ${collectionName} ${docName} 저장 성공: ${JSON.stringify(
        userData
      )}`
    );
    return userData;
  } catch (error: any) {
    logger.error(`Firestore에 데이터 저장 실패: ${error.message}`);
    throw new Error(`Firestore에 데이터 저장 실패: ${error.message}`);
  }
};

export const identity = async (
  req: Request<ReqIdentity>,
  res: Response
) => {
  try {
    const userData = req.body; // POST 요청의 body에서 가져옴
    const docName = `${userData.userName}${userData.identity.substring(0, 6)}`;

    logger.info(`CODEF Cert Identity Service 실행, docName: ${docName}`, {
      structuredData: true,
    });

    saveData("Identity", `${docName}_req`, userData); // 요청 데이터 저장
    const response = await codefCertService(userData);
    saveData("Identity", `${docName}_res`, JSON.parse(response)); // 응답 데이터 객체로 설정 후 저장

    res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const driverLicense = async (
  req: Request<ReqDriverLicense>,
  res: Response
) => {
  try {
    const userData = req.body; // POST 요청의 body에서 가져옴
    const docName = `${userData.identity.substring(0, 6)}${userData.userName}`;

    logger.info(`CODEF Identity Service 실행, userName: ${docName}`, {
      structuredData: true,
    });

    saveData("DriverLicense", `${docName}_req`, userData); // 요청 데이터 저장
    const response = await codefDriverService(userData);
    saveData("DriverLicense", `${docName}_res`, JSON.parse(response)); // 응답 데이터 객체로 설정 후 저장

    res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
