// import prisma from "../lib/prisma";

// async function main() {
//   const response = await Promise.all([
//     // await prisma.contact.create({
//     //   data: {
//     //     userId: "clhqs85xz0000mfh078rv8ssu",
//     //     name: "Test User 2",
//     //     email: "rauchg@vercel.com",
//     //     category: "Med Tech",
//     //   },
//     // }),
//     await prisma.activity.create({
//       data: {
//         note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         contactId: "clhrmf5el0001mfuarngs2uyj",
//       },
//     }),
//   ]);
//   console.log(response);
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
