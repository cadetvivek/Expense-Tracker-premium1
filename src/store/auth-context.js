import React,{useState, createContext} from 'react'


const AuthContext = createContext({
    token : "",
    isLoggedIn: false,
    userEmail: "",
    login: (token)=>{},
    logout: ()=>{}
});

export const AuthContextProvider =(props)=>{
    const [token, setToken]= useState(localStorage.getItem('token'));
    const [userMail, setUserMail] = useState("");

    let userIsLoggedIn= !!token; //returns true or false deoending on if token is a string or null... if token is not emoty, return true and vice versa
    

    const loginHandler =(token,email)=>{
        let userEmail= email.replace(/[@.]/g, "");
        setToken(token)        
        setUserMail(userEmail);
        console.log(userEmail)
    }
    const logoutHandler=()=>{
        setToken(null); 
        setUserMail("");
        localStorage.removeItem('token')
        localStorage.removeItem('email')
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        userEmail: userMail,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}
//export default AuthContext;