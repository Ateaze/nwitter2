// Firestore 데이터베이스를 사용하기 위해 필요한 모듈과 함수들을 가져옵니다.
import { dbService } from 'fbase';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Nweet from 'components/Nweet';

const Home = ({ userObj }) => {
    // 사용자가 입력한 트윗 내용을 저장하는 상태
    const [nweet, setNweet] = useState("");
    // Firestore에서 가져온 트윗 목록을 저장하는 상태
    const [nweets, setNweets] = useState([]);

    // Firestore에서 트윗 데이터를 가져오는 함수
    useEffect(() => {
        // Firestore 쿼리: "nweets" 컬렉션에서 데이터를 가져오고, createdAt 필드를 기준으로 내림차순 정렬
        const q = query(collection(dbService, "nweets"), orderBy("createdAt", "desc"));
        // Firestore의 실시간 데이터 구독
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newArray = querySnapshot.docs.map((doc) => ({
                id: doc.id, // Firestore 문서 ID
                ...doc.data(), // Firestore 데이터
            }));
            setNweets(newArray); // 상태 업데이트
        });
        return () => unsubscribe(); // 컴포넌트가 언마운트될 때 구독 해제
    }, []);

    // 사용자가 트윗을 제출했을 때 호출되는 함수
    const onSubmit = async (Event) => {
        Event.preventDefault(); // 기본 폼 제출 동작을 막음
        if (nweet.trim() === "") { // 입력값이 공백일 경우 경고를 표시
            alert("Nweet is empty");
            return;
        }
        try {
            // Firestore의 "nweets" 컬렉션에 새 트윗을 추가
            await addDoc(collection(dbService, "nweets"), {
                text: nweet, // 트윗 내용
                createdAt: Date.now(), // 현재 시간
                creatorID: userObj.uid, // 작성자 ID
                creatorName: userObj.email || "Anonymous", // 작성자 이메일
            });
            setNweet(""); // 입력 필드를 초기화
        } catch (error) {
            console.error("Error adding document: ", error); // 오류가 발생하면 콘솔에 출력
        }
    };

    // 입력 필드의 값이 변경될 때 호출되는 함수
    const onChange = (Event) => {
        const { target: { value } } = Event; // 입력된 값을 가져옴
        setNweet(value); // 상태를 업데이트
    };

    return (
        <>
            {/* 사용자가 트윗을 입력하고 제출할 수 있는 폼 */}
            <form onSubmit={onSubmit}>
                <input
                    value={nweet} // 입력 필드의 값은 nweet 상태와 연결
                    onChange={onChange} // 입력값이 변경될 때 onChange 호출
                    type="text"
                    placeholder="자신의 생각을 적어보세요" // 입력 필드의 플레이스홀더
                    maxLength={120} // 최대 입력 길이 제한
                />
                <input type="submit" value="Nweet" /> {/* 제출 버튼 */}
            </form>
            <div>
                {/* Firestore에서 가져온 트윗 목록을 화면에 렌더링 */}
                {nweets.map((nweet) => (
                    <Nweet 
                        key={nweet.id} // 각 트윗의 고유 ID를 key로 사용
                        nweetObj={nweet} // 트윗 데이터 객체 전달
                        isOwner={nweet.creatorID === userObj.uid} // 작성자 ID와 사용자 ID가 일치하는 경우
                    />
                ))}
            </div>
        </>
    );
};

export default Home;