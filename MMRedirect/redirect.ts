 
 
 
 const redirect = (url, asLink = false) => {          //false is for an http redirect 
  try {
      if (asLink) {
        window.location.href = url;
      } else {
        window.location.replace(url);
      }
      } catch (error) {
          console.error("error 404", error);
      }   
};

const main = () => {
redirect("MuscleMemory.KimchiLabs.com://", false);
};
main();