export const SomeObjectType = objectType({
  name: 'SomeObjectType',
  definition(t) {
    t.implements(SomeType1);
    t.id('a');
    t.float('b');
    t.nullable.float('c');
    t.nullable.field('d', {
      type: SomeEnum
    });
    t.nullable.string('e', {
      resolve(value: any) {
        return value.doSmthng();
      }
    });
    t.field({
      name: 'f',
      type: SomeType,
      async resolve(rootObject: any, args, ctx) {
        return ctx.smthng();
      }
    });
  }
});
