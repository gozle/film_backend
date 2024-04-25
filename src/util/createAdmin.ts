import { Admin } from "src/models/admin.model";
import * as bcrypt from 'bcrypt'

export async function createAdmin() {
    const admin = await Admin.findOne({ where: { degree: "super" } });
    if (admin) {
        return
    }
    const hashed = await bcrypt.hash("123456", 12);

    await Admin.create({
        name: "Bayram",
        email: "babakulyyewbayram8@gmail.com",
        username: 'bayram',
        password: hashed,
        degree: "super"
    })
}