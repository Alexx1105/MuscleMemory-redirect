


const redirect = (url: string, asLink = false) => {               //false is for an http redirect 
 
  try {
      if (asLink) {
        return({ status: 301, headers: { Location: url },});    //server side redirect
    
      } else {
        globalThis.location.replace(url);
        return new Response("Client-side redirect initiated", { status: 200 });      //initiate redirect succes
      }
        } catch {
          return new Response("error 500, redirect did not go through:", {status: 500});    //failure case for redirect
      }   
};

const main = async() => {
const redir = await redirect("MuscleMemory.KimchiLabs.com://", false);
if (redir.status === 301) {
  console.log("successful redirect", {redir})
  }
};
main();