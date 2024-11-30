import fetch from "npm:node-fetch";
import { serve } from "https://deno.land/std@0.182.0/http/server.ts";


interface tokenModel {
    headers:  { 'Content-Type': 'application/json' } , 
    method: "POST" ,
    grant_type: "authorization_code" ,
    redirect_uri: "https://redirect-43l94meuf-alexs-projects-78b010cd.vercel.app/callback" ,
    code: string ,  
    client_id: "138d872b-594c-8050-b985-0037723b58e0";
};

const exchangeToken = () => {
          
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
                        
                          
   
  };

  