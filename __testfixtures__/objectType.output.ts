export const SomeObjectType = builder.objectRef<any>('SomeObjectType')
  .implement({
  interfaces: [SomeType1],
  fields: t => ({
    a: t.exposeID('a'),
    b: t.exposeFloat('b'),
    c: t.exposeFloat('c', {
      nullable: true
    }),
    d: t.expose('d', {
      type: SomeEnum,
      nullable: true
    }),
    e: t.string({
      nullable: true,
      resolve(value: any) {
        return value.doSmthng();
      }
    }),
    f: t.expose('f', {
      type: SomeType,
      async resolve(rootObject: any, args, ctx) {
        return ctx.smthng();
      }
    }),
    g: t.float({
      resolve: () => 1
    })
  })
});

export const Interface = builder.interfaceRef<any>('SomeType1')
  .implement({
  fields: t => ({
    id: t.id(),
    stringField: t.string(),
    resolvableField: t.field({
      type: SomeType2,
      async resolve(rootObject, args, ctx) {
        return 123;
      }
    })
  }),
  resolveType(item) {
    return item.__typename;
  }
});
