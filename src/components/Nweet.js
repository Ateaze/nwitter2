import { dbService } from "fbase";
import {doc, deleteDoc} from "firebase/firestore";

const Nweet = ({nweetObj, isOwner }) => {
    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        console.log(ok);
        if (ok) {
            try {
                const nweetDocRef = doc(dbService, `nweets/${nweetObj.id}`);
                await deleteDoc(nweetDocRef);
                console.log("Nweet deleted successfully!");
            } catch (error) {
                console.error("Error deleting document: ", error);
        }
    }
};

    return (
        <div>
            <h4>
                <span>{nweetObj.text}</span>
                <span style={{margin: "60px"}}>By: {nweetObj.creatorName}</span>
            </h4>
            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete Nweet</button>
                    <button>Edit Nweet</button>
                </>
            )}

        </div>
    );
};

export default Nweet;