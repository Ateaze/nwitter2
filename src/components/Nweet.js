import { dbService } from "fbase"; // Firebase 서비스에서 Firestore를 가져옴
import { doc, deleteDoc, updateDoc } from "firebase/firestore"; // Firestore 문서 조작 함수들
import { useState } from "react"; // React의 useState 훅

// Nweet 컴포넌트: 개별 트윗(nweet)을 표시하고, 소유자가 삭제 및 편집할 수 있도록 함
const Nweet = ({ nweetObj, isOwner }) => {
    // 상태 관리: 편집 모드 여부와 새로운 트윗 텍스트
    const [editing, setEditing] = useState(false); // 편집 모드 상태
    const [newNweet, setNewNweet] = useState(nweetObj.text); // 새로운 트윗 텍스트 상태

    // 트윗 삭제 함수
    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?"); // 삭제 확인 메시지
        console.log(ok);
        if (ok) {
            try {
                // Firestore에서 해당 트윗 문서 참조 생성
                const nweetDocRef = doc(dbService, `nweets/${nweetObj.id}`);
                await deleteDoc(nweetDocRef); // 문서 삭제
                console.log("Nweet deleted successfully!");
            } catch (error) {
                console.error("Error deleting document: ", error); // 삭제 중 에러 처리
            }
        }
    };

    // 편집 모드 토글 함수
    const toggleEditing = () => setEditing((prev) => !prev);

    // 입력 필드 값 변경 시 호출되는 함수
    const onChange = (Event) => {
        const { target: { value } } = Event; // 이벤트에서 입력 값 추출
        setNewNweet(value); // 새로운 트윗 텍스트 상태 업데이트
    };

    // 트윗 업데이트 함수
    const onSubmit = async (Event) => {
        Event.preventDefault(); // 기본 폼 제출 동작 방지
        try {
            // Firestore에서 해당 트윗 문서 참조 생성
            const nweetDocRef = doc(dbService, `nweets/${nweetObj.id}`);
            await updateDoc(nweetDocRef, { text: newNweet }); // 문서 업데이트
            setEditing(false); // 편집 모드 종료
        } catch (error) {
            console.error("Error updating document: ", error); // 업데이트 중 에러 처리
        }
    };

    // 컴포넌트 렌더링
    return (
        <div>
            {editing ? ( // 편집 모드일 때
                <>
                    <form onSubmit={onSubmit}>
                        {/* 새로운 트윗 텍스트 입력 필드 */}
                        <input onChange={onChange} value={newNweet} required />
                        <br />
                        {/* 업데이트 버튼 */}
                        <input type="submit" value="Update Nweet" />
                        <button onClick={toggleEditing}>Cancel</button>
                    </form>
                    {/* 편집 취소 버튼 */}
                    
                </>
            ) : ( // 일반 모드일 때
                <>
                    <h4>
                        {/* 트윗 텍스트와 작성자 표시 */}
                        <span>{nweetObj.text}</span>
                        <span style={{ margin: "60px" }}>By: {nweetObj.creatorName}</span>
                    </h4>
                    {isOwner && ( // 소유자인 경우에만 삭제 및 편집 버튼 표시
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet; // Nweet 컴포넌트 내보내기