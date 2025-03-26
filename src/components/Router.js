// React Router를 사용하기 위해 필요한 모듈과 컴포넌트를 가져옵니다.
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// 애플리케이션의 각 페이지 컴포넌트를 가져옵니다.
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
// 네비게이션 컴포넌트를 가져옵니다.
import Navigation from "./Navigation";

// AppRouter 컴포넌트: 로그인 상태에 따라 라우트를 설정합니다.
const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        // HashRouter를 사용하여 라우팅을 설정합니다.
        <Router>
            {/* 사용자가 로그인한 경우 네비게이션 바를 표시합니다. */}
            {isLoggedIn && <Navigation />}
            <Routes>
                {/* 로그인 상태에 따라 다른 라우트를 렌더링합니다. */}
                {isLoggedIn ? (
                    <>
                        {/* 로그인한 사용자를 위한 라우트 */}
                        <Route path="/" element={<Home userObj={userObj} />} /> {/* 홈 화면 */}
                        <Route path="/profile" element={<Profile />} /> {/* 프로필 화면 */}
                        <Route path="*" element={<Navigate to="/" />} /> {/* 잘못된 경로는 홈으로 리다이렉트 */}
                    </>
                ) : (
                    <>
                        {/* 로그인하지 않은 사용자를 위한 라우트 */}
                        <Route path="/" element={<Auth />} /> {/* 로그인 화면 */}
                        <Route path="*" element={<Navigate to="/" />} /> {/* 잘못된 경로는 로그인 화면으로 리다이렉트 */}
                    </>
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;