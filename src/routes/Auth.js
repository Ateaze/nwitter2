import { authService, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider} from "fbase";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { getAuth } from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (Event) => {
        const {
            target: { name,value },
        } = Event;
        if (name === "email"){
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const auth = getAuth();

    const onSubmit = async (Event) => {
        Event.preventDefault();
        try {
            let data;
        if (newAccount) {
            //create newAccount
            data = await createUserWithEmailAndPassword(authService, email, password);
        } else {
            // log in
            data = await signInWithEmailAndPassword(authService, email, password);
        }
        console.log("Success", data);
    } catch (error) {
        setError(error.message);
    }
    };
const toggleAccount = () => setNewAccount((prev) => !prev);

        const onSocialClick = async (Event) => {
            const {
                target: { name },
            } = Event;
            let provider;
            if (name === "google") {
                provider = new GoogleAuthProvider();
            } else if (name === "github"){
                provider = new GithubAuthProvider();
            }

            if(provider) {
                try {
                    const result = await signInWithPopup(auth, provider);
                    console.log("Social login success", result);
                } catch (error) {
                    console.error("Social login error", error);
                }
            }
        };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                name="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={onChange}
                />
                <input
                name="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;