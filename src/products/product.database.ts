import {Product, Products, UnitProduct} from "./product.interface"
import {v4 as random} from "uuid"
import fs from "fs"

let products: Products = loadProducts();

function loadProducts(): Products{
    try{
        const data = fs.readFileSync(".products.json", "utf-8")
        return JSON.parse(data)
    } catch (error){
        console.log(`Error ${error}`)
        return {}
    }
}

function saveProducts () {
    try {
        fs.writeFileSync("./users.json", JSON.stringify(products), "utf-8")
        console.log(`Products saved successfully!`)
    } catch (error) {
        console.log(`Error ${error}`)
    }
}

export const findAll = async (): Promise<UnitProduct[]> => Object.values(products);

export const findOne = async (id:string): Promise<UnitProduct> => products[id];

export const create = async (userData: UnitProduct): Promise<UnitProduct | null> => {
    let id = random()

    let product = await findOne(id);

    while (product){
        id = random()
        check_user = await findOne(id)
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(userData.password, salt)

    const user : UnitUser = {
        id: id,
        username : userData.username,
        email : userData.email,
        password : hashedPassword
    };

    users[id] = user;
    saveUsers()

    return user;
}

export const findByEmail = async (user_email: string): Promise<null | UnitUser> => {

    const allUsers = await findAll();

    const getUser = allUsers.find(result => user_email === result.email);

    if (!getUser){
        return null;
    }

    return getUser;
};

export const comparePassword = async (email : string, supplied_password : string): Promise<null | UnitUser> => {

    const user = await findByEmail(email)

    const decryptPassword = await bcrypt.compare(supplied_password,user!.password)

    if (!decryptPassword){
        return null
    }
    
    return user
};

export const update = async (id : string, updateValues : User) : Promise<UnitUser | null> =>{

    const userExists = await findOne(id)

    if (!userExists) {
        return null
    }

    if (updateValues.password){
        const salt = await bcrypt.genSalt(10)
        const newPass = await bcrypt.hash(updateValues.password,salt)

        updateValues.password = newPass
    }

    users[id] = {
        ...userExists,
        ...updateValues,
    }

    saveUsers()

    return users[id]
};

export const remove = async (id : string) : Promise<null | void> =>{
    
    const user = await findOne(id)

    if (!user) {
        return null
    }

    delete users[id]

    saveUsers()
}