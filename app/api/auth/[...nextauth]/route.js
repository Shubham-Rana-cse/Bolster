import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/Models/User";
import connectDB from "@/DB/connectDB";

const handler = NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // I have used a third party redirection provider, because google o auth was not accepting localhost domain, hence i used http://redirectmeto.com/http://localhost:3000
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    /* AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    // Passwordless / email sign in
    EmailProvider({
      server: process.env.MAIL_SERVER,
      from: 'NextAuth.js <no-reply@example.com>'
    }), */
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
        //conncet to database
        //const client = await mongoose.connect("mongodb://localhost:27017/bolster"); 	//now imported from connectDB

		    await connectDB();

        //check if user already exist in database
        let currentUser = await User.findOne({ email: user.email });

        if (!currentUser) {
          //create a new user
          currentUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0],
            phonenumber: null,

            x: "",
            instagram: "",
            linkedin: "",

            profilepic: {
                url: "",
                public_id: ""
            },

            bannerpic: {
                url: "",
                public_id: ""
            },

            document: {
                url: "",
                public_id: ""
            },

            razorpayid: "",
            razorpaysecret: "",
          });

		      //console.log(currentUser);
        }

			  user.name = currentUser.username;

		    return true;	// Always return true from signIn, so that we can login, this is mere syntax
    },

    async session({ session }) {
      // Send properties to the client, like an access_token and user id from a provider.

      await connectDB();
    
      const dbUser = await User.findOne({email: session.user.email});

      if(dbUser)
        session.user.name = dbUser.username;		
      
      return session
    },
  },
});

export { handler as GET, handler as POST };
