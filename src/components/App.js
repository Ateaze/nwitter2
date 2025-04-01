import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false); // 초기화 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [userObj, setUserObj] = useState(null); // 사용자 정보

  useEffect (() => {
    //Firebase 인증 상태 변경을 감지
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true); // 사용자가 로그인한 경우
        setUserObj(user); // 사용자 정보
      } else {
        setIsLoggedIn(false); // 사용자가 로그아웃한 경우
      }
      setInit(true); // 초기화 완료
    });
  }, []);
  return (
    <>
      {/* 초기화가 완료되면 AppRouter를 렌더링 */}
      {init ? ( <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> ) : ( "initializing...")}
    </>
  );
}

export default App;
