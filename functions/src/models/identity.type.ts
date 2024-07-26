// 인증서 파라미터 설정
export type ReqIdentity = {
  organization: string;
  loginType: string;
  certType: string;
  identity: string;
  userName: string;
  issueDate: string;
};

// 운전면허 파라미터 설정
export type ReqDriverLicense = {
  organization: string;
  loginType: string;
  certType: string;
  loginUserName: string;
  identity: string;
  birthDate: string;
  serialNo: string;
  userName: string;
  licenseNumber: string;
};


// 주민등록 진위확인 기본 파라미터 설정
// export type ReqIdentity = {
//   organization: string;
//   loginType: string;
//   loginTypeLevel: string;
//   phoneNo: string;
//   loginUserName: string;
//   loginIdentity: string;
//   identity: string;
//   userName: string;
//   issueDate: string;
// };

// 추가 인증 파라미터 설정
// export type ReqAddIdentity = ReqIdentity & {
//   simpleAuth: string;
//   is2Way: string;
//   twoWayInfo: string; // 객체를 문자열로 수정
// };

// 보안문자 파라미터 설정
// export type ReqSecureIdentity = {
//   simpleAuth: string;
//   secureNo: string;
//   secureNoRefresh: string;
//   is2Way: boolean;
//   twoWayInfo: {
//     jobIndex: number;
//     threadIndex: number;
//     jti: string;
//     twoWayTimestamp: number;
//   };
// };
