// import { Webhook } from "svix";

// import User from "../models/user.js";


// //Api controller to manage clerk user with database

// export const clerkWebhooks = async (req , res) => {
//     try {
//         const whook = new Webhook(process.env.ClERK_WEBHOOKS_SECRET)
        
//         await whook.verify(JSON.stringify(req.body), {
//             'svix-id' : req.headers['svix-id'],
//             'svix-timestamp' : req.headers["svix-timestamp"],
//             'svix-signature': req.headers['svix-signature']
//         })


//       const {data, type} = req.body;

//       switch(type){
//         case 'user.created' : {
//             const userData = {
//                 _id: data.id,
//                 email: data.email_addresses[0].email_address,
//                 name : data.first_name + " " + data.last_name,
//                 imageUrl : data.image_url,
//             }

//             await User.create(userData)
//             res.json({})
//             break;
//         }

//         case 'user.updated' : {
//             const userData = {
//                 email: data.email_address[0].email_address,
//                 name : data.first_name + " " + data.last_name,
//                 imageUrl : data.image_url,
//             }

//             await User.findByIdAndUpdate(data.id, userData)
//             res.jsom({})
//             break;
//         }

//         case 'user.deleted' : {
//             await User.findByIdAndDelete(data.id)
//             res.json({})
//             break;
//         }

//         default:
//             break;
//       }
//     } catch(error){
//         res.json(error)
//     }
// }


import { Webhook } from "svix";
import User from "../models/user.js";

// Api controller to manage clerk user with database
export const clerkWebhooks = async (req, res) => {
  try {
    // Use correct env name
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Headers for verification
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Use raw body (from express.raw), not JSON.stringify
    const payload = req.body;

    // Verify and get event
    const evt = await whook.verify(payload, headers);
    const { data, type } = evt;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id, // or let Mongo create _id and store clerkId separately
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };

        await User.create(userData);
        return res.json({});
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address, // fixed
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData, { new: true });
        return res.json({}); // fixed jsom -> json
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.json({});
      }

      default:
        // Unknown event type, respond 200 so Clerk doesn't keep retrying
        return res.json({});
    }
  } catch (error) {
    console.error("Clerk webhook error:", error);
    return res.status(400).json({ error: "Webhook error" });
  }
};
