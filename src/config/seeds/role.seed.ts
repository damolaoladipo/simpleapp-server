import Role from "../../models/role.model";
import rolesData from "../../_data/roles.json";


export const seedRoles = async () => {
    try {
        const roles = await Role.countDocuments();
        if (roles === 0) {
          const seed = await Role.insertMany(rolesData);
          if (seed) {
            console.log({ data: `roles seeded successfully`, type: `info` });
          }
        }
      } catch (error) {
        console.log({ label: "ERR:", data: error, type: `error` });
      }

}