export const doThings = mutationField('doThings', {
  type: SomeType,
  args: {
    id: nonNull(idArg()),
    randomType: nonNull(RandomType)
  },
  async resolve() {
    return null;
  }
});

export const otherStuff = mutationField('otherStuff', {
  type: OtherType,
  args: {
    id: nonNull(idArg()),
    str: stringArg(),
  },
  async resolve() {
    return 123;
  }
});

export const otherStuff2 = queryField('someQuery', {
  type: list(OtherType),
  args: {
    id: nonNull(idArg()),
    str: stringArg(),
  },
  authorize: (source, args, ctx) => !!ctx.user,
  async resolve() {
    return 123;
  }
});

export const otherStuff3 = queryField('someQuery', {
  type: nullable(list(OtherType)),
  args: {
    id: nonNull(idArg()),
    str: stringArg(),
  },
  async resolve() {
    return 123;
  }
});

export const otherStuff4 = queryField('someQuery', {
  type: nullable(OtherType),
  args: {},
  async resolve() {
    return 123;
  }
});
