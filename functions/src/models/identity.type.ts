// 인증서 파라미터 설정
export type ReqIdentity = {
  identity: string;
  userName: string;
  issueDate: string;
};

// 운전면허 파라미터 설정
export type ReqDriverLicense = {
  birthDate: string;
  serialNo: string;
  userName: string;
  licenseNumber: string;
};
