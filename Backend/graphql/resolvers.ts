import User from "../src/models/User";

export const resolvers = {
  Query: {
    therapists: async () => {
      const data = await User.find();

      return data.map((t) => ({
        id: t._id.toString(),
        name: t.fullName,
        image: t.profilePicUrl || "/default-doc.png",
        experience: `${t.experienceYears}+ years of experience`,
        price: t.price,
        expertise: t.specializations,
        languages: t.languages,
        availableVia: t.availableVia,
        nextSlot: t.nextSlot,
      }));
    },
  },
};
