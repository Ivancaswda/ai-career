"use client"
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {useAuth} from "@/context/useAuth";


function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { user } = useAuth();
    console.log(user)


    return (
        <div>
            {children}
        </div>
    )
}
export default Provider

