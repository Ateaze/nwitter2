// Firebase SDK에서 필요한 모듈을 가져옵니다.
import { initializeApp } from "firebase/app"; // Firebase 앱 초기화를 위한 함수
import { 
    getAuth, // Firebase 인증 객체를 가져오는 함수
    createUserWithEmailAndPassword, // 이메일과 비밀번호로 사용자 계정을 생성하는 함수
    signInWithEmailAndPassword, // 이메일과 비밀번호로 로그인하는 함수
    GoogleAuthProvider, // Google 로그인 제공자
    GithubAuthProvider // Github 로그인 제공자
} from "firebase/auth";
import "firebase/firestore"; // Firestore를 사용하기 위한 Firebase 모듈
import { getFirestore } from "firebase/firestore"; // Firestore 데이터베이스 객체를 가져오는 함수
import { getStorage } from "firebase/storage"; // Firebase Storage 객체를 가져오는 함수

// Firebase 프로젝트의 설정 정보
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY, // 환경 변수에서 API 키를 가져옵니다.
    authDomain: process.env.REACT_APP_AUTH_DOMAIN, // Firebase 인증 도메인
    projectId: process.env.REACT_APP_PROJECT_ID, // Firebase 프로젝트 ID
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET, // Firebase 스토리지 버킷
    messagingSenderId: process.env.REACT_APP__MESSAGING_SENDER_ID, // Firebase 메시징 발신자 ID
    appId: process.env.REACT_APP_APP_ID // Firebase 앱 ID
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig); // Firebase 앱을 초기화하고 설정 정보를 적용합니다.

// Firebase 인증 객체 가져오기
const authService = getAuth(app); // Firebase 인증 서비스를 초기화하고 가져옵니다.

// Firebase 인증 및 Firestore 데이터베이스 객체를 외부에서 사용할 수 있도록 내보냅니다.
export { 
    authService, // Firebase 인증 객체
    createUserWithEmailAndPassword, // 이메일과 비밀번호로 계정 생성 함수
    signInWithEmailAndPassword, // 이메일과 비밀번호로 로그인 함수
    GoogleAuthProvider, // Google 로그인 제공자
    GithubAuthProvider // Github 로그인 제공자
};
export const dbService = getFirestore(); // Firestore 데이터베이스 객체
export const storageService = getStorage(); // Firebase Storage 객체