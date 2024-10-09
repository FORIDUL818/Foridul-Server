import { app } from "../App.js";
const Port=process.env.PORT || 6000
app.listen(Port,()=>console.log(`surver is running ${Port}`))

