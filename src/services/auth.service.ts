import User from '../models/user.model';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUserService = async (data: any) => {
    const { email, password } = data;

    // Check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
        email,
        password: hashedPassword
    });

    return await user.save();
};

export const loginUserService = async (email: string, password: string) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        { userId: user._id },
        "SECRET_KEY",
        { expiresIn: "1d" }
    );

    return { token, user };
};