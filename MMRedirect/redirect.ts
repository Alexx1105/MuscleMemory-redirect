 
 
 
 let redirect = (url, asLink = false) => {          //false is for an http redirect 
  asLink ? (window.location.href) : window.location.replace(url);
  redirect("MuscleMemory.KimchiLabs.com://");

  if (window.location.replace !== url) {
    console.error("redirect link not not work");
    return("error");
  };
 };


