import { authService, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../fabse";
import { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);

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
        console.log("Error", error);
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
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;