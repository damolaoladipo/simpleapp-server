import User from "../../models/user.model";
import usersData from "../../_data/users.json"

export const seedUsers = async () => {
    try {
        let count: number = 0;
        const users = await User.countDocuments();
        if (users === 0) {
          for (let i = 0; i < usersData.length; i++) {
            let item = usersData[i];
            let user = await User.create(item);
            if (user) {
              count += 1;
            }
            if (count > 0) {
              console.log({
                data: `data seeded successfully`,
                type: `success`,
              });
            }
          }
        }
      } catch (error) {
        console.log({ label: "ERR:", data: error, type: `error` });
      }

}