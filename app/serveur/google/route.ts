import {firebaseConfig } from "@/db/firebase"
import { NextResponse } from "next/server"

export const GET = async () => {
    return NextResponse.json(firebaseConfig)
}