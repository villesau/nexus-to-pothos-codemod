export const doThings = builder.mutationField("doThings", t => t.field({
  type: SomeType,
  args: {
    id: t.arg.id({
      required: true
    }),
    randomType: t.arg({
      type: RandomType,
      required: true
    })
  },
  async resolve() {
    return null;
  }
}));

export const otherStuff = builder.mutationField("otherStuff", t => t.field({
  type: OtherType,
  args: {
    id: t.arg.id({
      required: true
    }),
    str: t.arg.string()
  },
  async resolve() {
    return 123;
  }
}));

export const otherStuff2 = builder.queryField("someQuery", t => t.field({
  type: [OtherType],
  args: {
    id: t.arg.id({
      required: true
    }),
    str: t.arg.string()
  },
  authScopes: (source, args, ctx) => !!ctx.user,
  async resolve() {
    return 123;
  }
}));

export const otherStuff3 = builder.queryField("someQuery", t => t.field({
  type: [OtherType],
  nullable: true,
  args: {
    id: t.arg.id({
      required: true
    }),
    str: t.arg.string()
  },
  authScopes: (source, args, ctx) => !!ctx.user,
  async resolve() {
    return 123;
  }
}));
