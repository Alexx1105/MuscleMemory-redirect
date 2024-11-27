


const redirect = (url: string, asLink = false): Promise<Response> => {               //false is for an http redirect 
  try {
      if (asLink) {
        return Promise.resolve(new Response(null, { status: 301, headers: { Location: url }, }));    //server side redirect
      } else {
        window.location.replace(url);
        return Promise.resolve(new Response("Client-side redirect initiated", { status: 200 }));      //initiate redirect
      }
       } catch (error) {
          return Promise.resolve(new Response("error 500, redirect did not go through:", {status: 500}));    //failure case for redirect
      }   
};

const main = async() => {
const redir = await redirect("MuscleMemory.KimchiLabs.com://", false);
if (redir.status === 301) {
  console.log("successful redirect", {redir})
  }
};
main();