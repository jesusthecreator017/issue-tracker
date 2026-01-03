import { signUp } from "./auth-client";

const { data, error } = await signUp.email({
        email: 'jesus.r.gonzalez107@gmail.com', // user email address
        password: 'TempPassword', // user password -> min 8 characters by default
        name: 'jesus', // user display name
        callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
    }, {
        onRequest: (ctx) => {
            //show loading
            console.log(ctx);
        },
        onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
            console.log(ctx);
        },
        onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
        },
});