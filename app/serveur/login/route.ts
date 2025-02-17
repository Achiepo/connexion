import { auth, database } from "@/db/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    const {email, password} = await req.json()
   try {
    const info = await signInWithEmailAndPassword(auth, email, password)
    const id = info.user.uid
    //Pour recupérer un seul document d'une collection
    const snap = await getDoc(doc(database, "users", id))
    if (snap.exists()) {
        const data = snap.data()
        return NextResponse.json({data})
    } else {
        return NextResponse.json("Email ou mot passe non valide")
    }
   } catch (error) {
    console.log(error)
    return NextResponse.json("Une ereur s'est produite")
   }
}