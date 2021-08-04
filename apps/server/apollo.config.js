module.exports = {
  client: {
    service: {
      name: "postgraphile",
      localSchemaFile: `${__dirname}/../../data/schema.graphql`,
    },
  },
};
