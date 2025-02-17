import { auth, db } from "@/db/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    const {nom, email, password} = await req.json()
   try {
    const info = await createUserWithEmailAndPassword(auth, email, password)
    const id = info.user.uid
    const data = {nom, email, createDate: new Date(), id}
    //Créer un document dont c'est nous meme qui donnons l'id
    await setDoc(doc(db, "users", id), data, {merge: true})
    return NextResponse.json({data})
   } catch (error) {
    console.log(error)
    return NextResponse.json("Une ereur s'est produite")
   }
}