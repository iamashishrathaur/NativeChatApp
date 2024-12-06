import { useAuthStore } from "@/store/useAuthStore";
import { Slot } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
 const {checkAuth} =useAuthStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  return <Slot/>;
}
