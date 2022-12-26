export const doThings = builder.mutationField("doThings", t => t.field({
  type: SomeType,
  nullable: true,
  args: {
    id: t.arg.id({
      nullable: false
    }),
    randomType: t.arg({
      type: RandomType,
      nullable: false
    })
  },
  async resolve() {
    return null;
  }
}));

export const otherStuff = builder.mutationField("otherStuff", t => t.field({
  type: OtherType,
  nullable: true,
  args: {
    id: t.arg.id({
      nullable: false
    }),
    str: t.arg.string()
  },
  async resolve() {
    return 123;
  }
}));

export const otherStuff2 = builder.queryField("someQuery", t => t.field({
  type: OtherType,
  nullable: true,
  args: {
    id: t.arg.id({
      nullable: false
    }),
    str: t.arg.string()
  },
  authScopes: (source, args, ctx) => !!ctx.user,
  async resolve() {
    return 123;
  }
}));
