"use client"
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

function GoogleLogin() {

    const redirecte = useRouter()
    
    const googleSignin = async () => {
        const req = await fetch("/serveur/google", {
            headers: {"Content-type": "application/json"},
            method: "GET"
        })
        const res = await req.json()
        if(res) {
            const app = initializeApp(res);
            const auth = getAuth(app)
            const provider = new GoogleAuthProvider()
            const info = await signInWithPopup(auth, provider)
            //On stocke les info recupèrées de google
            localStorage.setItem("user", JSON.stringify({
              id: info.user.uid,
              nom: info.user.displayName,
              photo: info.user.photoURL
            }))
            redirecte.push('/dashboard')
        } 
    }

  return (
    <span onClick={googleSignin} className="text-gray-700 font-medium cursor-pointer">
    se connecter avec Google
</span>
  )
}

export default GoogleLogin




