import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/.+\@.+\..+/, "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        role: {
            type: String,
            enum: ["customer", "admin"],
            default: "customer",
        },
    },
    { timestamps: true }
);

// Password Hash middleware (Here is where password is hashed before sending to DB)
userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next;
});

// Check user entered password if within the DB saved hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
