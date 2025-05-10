import User from "../src/models/User";

export const resolvers = {
  Query: {
    getTherapists: async (_:any, args: {role?: String}) => {

      const filter: any = {};
      if (args.role) filter.role = args.role;

      const data = await User.find(filter);
      return data.map((t) => ({
        id: t._id.toString(),
        name: t.fullName,
        profilePic: t.profilePicUrl || "/default-doc.png",
        experience: `${t.experienceYears}+ years of experience`,
        price: t.price,
        specializations: t.specializations || [],
        languages: t.languages || [],
        availableVia: t.availableVia || [],
        nextSlot: t.nextSlot || "",
        role:t.role,
      }));
    },
  },
};
