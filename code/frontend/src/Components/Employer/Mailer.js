import emailjs from "emailjs-com";
import React from 'react';

//npm install emailjs-com --save

export default function ContactUs() {
//     console.log("reaching");

//     function sendEmail(e) {
        // e.preventDefault();
    let e= {user_name: 'shrutihegde98@gmail.com',user_email:'shurtihegde98@gmail.com',message:null};
    console.log('6')
    let templateParams = {reply_to: "shrutihegde98@gmail.com"};
    // };
     
    emailjs.init('x-ACW4Rx4bA7XkkgG')
    emailjs.send("gmail","template_hbzac76",{reply_to:'venkatmukthineni@gmail.com'})
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        // e.target.reset()
    // }
    
    console.log("retun")
    return(
        <div>
            <div className="container">
            <button />
            {/* </form> */}
            </div>
        </div>
    )
}


