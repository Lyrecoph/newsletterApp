import mailchimp from "@mailchimp/mailchimp_marketing";
import { NextResponse } from "next/server";

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY!,
    server: process.env.MAILCHIMP_API_SERVER!
})

export async function POST(request: Request){
    try {
        const {email} = await request.json();

        if(!email){
            return NextResponse.json(
                {error: "L'email est obligatoire"},
                {status: 400}
            )
        }

        const resp = await mailchimp.lists.addListMember(
            process.env.MAILCHIMP_AUDIENCE_ID!,
            {email_address: email, status: "subscribed"}
        )

        return NextResponse.json(
            {message: "L'email a été inscrite avec succès", data: resp},
            {status: 201}
        )
        
    } catch (error) {
        return NextResponse.json(
            {error: "Cet email existe ou n'existe pas"},
            {status: 500}
        )
    }   
}
