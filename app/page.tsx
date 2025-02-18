"use client"
import GoogleLogin from "@/Components/googleLogin"
import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { auth, database } from "@/db/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()

  // Fonction de soumission de formulaire
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage("")

    if (password.length < 8) {
      setMessage("Le mot de passe doit contenir au moins 8 caractères.")
      toast.error("Le mot de passe doit contenir au moins 8 caractères.")
      return
    }

    try {
      // Vérification des informations d'identification
      if (!email || !password) {
          setMessage("Email et mot de passe requis.");
          toast.error("Email et mot de passe requis.");
          return;
      }
  
      // Connexion avec Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Vérifier l'existence de l'utilisateur dans Firestore
      const userRef = doc(database, "Users", user.uid)
      const userSnap = await getDoc(userRef);
  
      if (!userSnap.exists()) {
          setMessage("Compte introuvable. Veuillez vous inscrire.");
          toast.error("Compte introuvable. Veuillez vous inscrire.");
          return;
      }
  
      // Connexion réussie
      setMessage("Connexion réussie !");
      toast.success("Bienvenue !");
      router.push("/dashboard");
  
  } catch (error: any) {
      console.error("Erreur lors de la connexion")
  
      if (error.code === "auth/user-not-found") {
          setMessage("Aucun compte trouvé avec cet email.")
          toast.error("Aucun compte trouvé avec cet email.")
      } else if (error.code === "auth/wrong-password") {
          setMessage("Mot de passe incorrect.")
          toast.error("Mot de passe incorrect.")
      } else if (error.code === "auth/network-request-failed") {
          setMessage("Problème de connexion internet.")
          toast.error("Vérifiez votre connexion.")
      } else if (error.code === "auth/invalid-credential") {
          setMessage("Identifiants invalides. veillez vous inscire.")
          toast.error("Identifiants invalides. Vérifiez votre email et mot de passe.")
      } else {
          setMessage("Erreur lors de la connexion. Vérifiez vos identifiants.")
          toast.error("Erreur de connexion.")
      }
  }
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <div className="w-full max-w-md backdrop-blur-sm border-2 shadow-lg rounded-lg p-6 space-y-6">

        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">Connexion</h1>
          <p className="text-lg">Connectez-vous pour continuer</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={submitForm} className="space-y-4">

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="exemple@gmail.com" required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>

          {/* Mot de passe */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input onChange={(e) => setPassword(e.target.value)} id="password" type="password" required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>

          {/* Bouton de soumission */}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300" >Se connecter
          </button>
        </form>

        {/* Separator */}
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Ou continuez avec</span>
        </div>

        {/* Bouton Google */}
        <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition-all">
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M24 22v6h10.7c-.5 2.8-2 5.2-4.1 6.7v5.5h6.6c3.8-3.5 6-8.7 6-14.8 0-1.4-.1-2.8-.4-4H24z" />
            <path fill="#34A853" d="M11.8 28.1c-.6-1.4-1-3-1-4.6s.3-3.2 1-4.6V13H5.2c-1.6 3.2-2.5 6.7-2.5 10.5s.9 7.3 2.5 10.5l6.6-5.9z" />
            <path fill="#FBBC05" d="M24 9.5c3.6 0 6.6 1.2 9.1 3.5l6.7-6.7C35.9 2.4 30.5 0 24 0 14.8 0 6.8 5.5 2.7 13.5l6.6 5.9c1.7-5 6.6-9.9 14.7-9.9z" />
            <path fill="#EA4335" d="M24 46c6.5 0 11.9-2.1 16-5.7l-6.6-5.5c-2.5 1.8-5.6 3-9.3 3-8 0-13-5-14.7-9.8l-6.6 5.8C6.8 40.5 14.8 46 24 46z" />
          </svg>
          <GoogleLogin />
        </button>

        {/* Lien d'inscription */}
        <div className="text-center text-sm">
            <p>Pas encore de compte ? <Link href="/inscription" className="text-blue-600 hover:underline">S'inscrire</Link>
            </p>       
        </div>

        {/* Message d'état */}
        {message && (
          <div className={`text-center text-sm mt-4 ${message.includes("incorrect") ?  "text-green-500" : "text-red-500"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}
























