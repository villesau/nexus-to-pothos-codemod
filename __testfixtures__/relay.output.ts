export const relayList = builder.queryField("relayList", t => t.connection({
  type: SomeType,
  args: {
    id: nonNull(idArg())
  },
  resolve(_, args, ctx) {
    return resolveOffsetConnection({
      args
    }, async (
      {
        limit,
        offset
      }
    ) => {
      return [1,2,3]
    });
  }
}));