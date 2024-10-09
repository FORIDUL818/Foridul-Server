 ### It sounds like the password reset system you're working on was quite challenging, but it's great that you did extensive research using various sources like Google, ChatGPT, freeCodeCamp, MDN, Medium, and dev.to to finally solve the problem. When you say you're writing it in a "standard way," do you mean you're implementing best practices for security, user experience, or code structure?

# Here are a few best practices for a secure and user-friendly password reset system:
     
     Ragistration: use mongoose use  in mongoose schima,mongoose model and password bcrypt packege making a password hash  
     
     Login:use in bcrypt compare password and user password varify than login

     emailVarification:use in nodemailer 
     my privete data manege in .env

    Token-Based Reset: Use a unique, time-limited token that is sent to the user's email. This token should expire after a set amount of time (e.g.,  1 hour) for security purposes.
    
    Hashing: Never store the actual token in your database. Instead, hash the token using a strong hashing algorithm (e.g., bcrypt or SHA-256), and store the hash. When the user clicks the link and submits a new password, compare the hash of the token they provide with the hash stored in your database.

    Password Hashing: When resetting the password, make sure to hash the new password as well before storing it in the database. You can use bcrypt for this to ensure passwords are stored securely.

    Rate Limiting: Limit the number of password reset requests that can be made in a short period to prevent abuse.
    every 15 minutes password request max requiest is 100 times
    Email Verification: Always verify that the email entered exists in your system, but don't reveal whether a particular email is registered or not in error messages (e.g., "If this email exists, we have sent a reset link"). This prevents exposing users' email addresses.

    Confirmation Messages: After a user successfully resets their password, send a confirmation email letting them know the password was changed. This alerts them if any suspicious activity occurs on their account.
