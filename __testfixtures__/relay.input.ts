export const relayList = queryField(t => {
  t.connectionField('relayList', {
    type: SomeType,
    additionalArgs: {
      id: nonNull(idArg())
    },
    async nodes(_, args, ctx) {
      return [1,2,3]
    }
  });
});
