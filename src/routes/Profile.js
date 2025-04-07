import { authService, dbService } from "fbase";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import Nweet from "components/Nweet";

const Profile = ({ userObj }) => {
    const [myNweets, setMyNweets] = useState([]);
    const onLogOutClick = () => authService.signOut();

    const getMyNweets = async () => {
        const q = query(collection(dbService, "nweets"), where("creatorID", "==", userObj.uid),
         orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const nweetArray = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setMyNweets(nweetArray);
    };

    useEffect(() => {
        getMyNweets();
    }, []);

    return (
        <>
            <form>
                <button onClick={onLogOutClick}>Log Out</button>
            </form>
        <div>
            {myNweets.map((nweet) => (
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={true} />
            ))}
        </div>
        </>
    );
}
export default Profile;