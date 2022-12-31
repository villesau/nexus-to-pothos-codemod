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
    e: t.exposeString('e', {
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
    })
  })
});
