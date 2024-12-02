import fetch from "npm:node-fetch";
import { serve } from "https://deno.land/std@0.182.0/http/server.ts";
import { Buffer } from "node:buffer";




interface tokenModel {
    headers:  { 'Content-Type': 'application/json' } , 
    method: "POST" ,
    grant_type: "authorization_code" ,
    redirect_uri: "https://redirect-43l94meuf-alexs-projects-78b010cd.vercel.app/callback" ,
    code: string ,  
    client_id: "138d872b-594c-8050-b985-0037723b58e0";
};

export const exchangeToken = () => {
          
          async function extractQueryParam(req: Request) {
              const u=new URL(req.url);
              return u.searchParams.get("code");

           }

           async function _swapToken(req: Request) {

                       let codeQuery: string | null = null;

                 try {
                         codeQuery = await extractQueryParam(req);
                           if (!codeQuery) {
                               console.log("extracted query param was not recieved:", {codeQuery});
                           }
                        
                        } catch {
                            console.error("code query param access was a success");
                        };
            
                        const tokenModelObject: tokenModel = {
                            headers:  { 'Content-Type': 'application/json' } , 
                            method: "POST" ,
                            grant_type: "authorization_code" ,
                            redirect_uri: "https://redirect-43l94meuf-alexs-projects-78b010cd.vercel.app/callback" ,
                            code: codeQuery || "null" , 
                            client_id: "138d872b-594c-8050-b985-0037723b58e0",
                        };
                           console.log(tokenModelObject)
                     };
                        
                         async function _sendPOST(codeQuery: string | null ) {

                            const clientId = Deno.env.get("OAUTH_CLIENT_ID");
                            const clientSecret = Deno.env.get("OAUTH_CLIENT_SECRET");
                            const redirectUri = Deno.env.get("OAUTH_REDIRECT_URI");

                            const encode = btoa(`${clientId} : ${clientSecret}`);   //btoa is base64 method for deno 

                            if (!clientId || !clientSecret || !redirectUri) {
                                throw new Error("Missing required environment variables.");
                            }
                        
                     
                    try {
                            const endpointResponse = await fetch("https://api.notion.com/v1/oauth/token.",  {   //endpoint where the access_token will be obtained from
                                method: "POST",
                                headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                Authorization: `Basic ${encode}`,
                            },
                                body: JSON.stringify({
                                    grant_type: "authorization_code",
                                    code: codeQuery ,
                                    redirect_uri: redirectUri,
                                }),
                            });
                          
                            if (!endpointResponse.ok) {
                                 console.log("did not recieve response object, ${clientId.clientSecret}");
                            }
                                const tokenData = await endpointResponse.json();    //await response from endpointResponse closure 
                                console.log("Access Token Response:", tokenData);
                                
                                await Deno.writeTextFile("./token.json", JSON.stringify(tokenData, null, 2)); 
                                console.log("access_token storage successful ${tokenData} ");                                   //handle storing the access_token from Notions API
                     
                            } catch(error) {
                                  console.error("access token could not be stored", error)
                    }

              }; 
                          
     
  };

  export default exchangeToken;
  