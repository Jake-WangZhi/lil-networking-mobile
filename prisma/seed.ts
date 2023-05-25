import prisma from "../lib/prisma";

async function main() {
  const response = await Promise.all([
    // await prisma.contact.create({
    //   data: {
    //     userId: "clhqs85xz0000mfh078rv8ssu",
    //     name: "Test User 2",
    //     email: "rauchg@vercel.com",
    //     category: "Med Tech",
    //   },
    // }),
    await prisma.activity.create({
      data: {
        date: new Date(),
        title: "Update",
        description:
          "Sarah and I had a really great catchup last week and I we talked about collaborating on a project together. Will follow up in a month.",
        contactId: "cli1cjo5y0001mfyen6770h6q",
      },
    }),
  ]);
  console.log(response);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
