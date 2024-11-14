import fs from "fs";
import Role from "../../models/role.model";
import colors from "colors";
import { IRoleDoc } from "../../utils/interface.util";

const rolesData = JSON.parse(
  fs.readFileSync(`${__dirname.split("config")[0]}_data/roles.json`, "utf-8")
);


export const seedRoles = async () => {
    try {
        const roles: IRoleDoc[] = await Role.find({});
        if (roles.length === 0) {
          const seed = await Role.insertMany(rolesData);

          if (seed) {
            console.log({ data: `roles seeded successfully`, type: `info` });
          }

            for (let item of rolesData) {

              let role = await Role.findOne({ name: item.name})

              if (!role) {
                role = await Role.create(item);
                console.log(`role ${role.name} seeded succesfully`);
              }
            }
                    
    }
      } catch (error: any) {
        console.error(colors.cyan.bold.underline(`Error seeding roles data: ${error}`));
        return []; 
      }
}