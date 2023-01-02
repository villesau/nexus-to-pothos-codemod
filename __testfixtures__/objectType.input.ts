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
    t.float('g', {
      resolve: () => 1,
    });
    t.field('h', {
      type: list(Type),
      resolve: (somthng) => smthng.a()
    });
  }
});

export const Interface = interfaceType({
  name: 'SomeType1',
  definition(t) {
    t.id('id');
    t.string('stringField');
    t.field({
      name: 'resolvableField',
      type: SomeType2,
      async resolve(rootObject, args, ctx) {
        return 123;
      }
    });
  },
  resolveType(item) {
    return item.__typename;
  }
});

export const Input = inputObjectType({
  name: 'Input',
  definition(t) {
    t.string('a');
    t.int('b');
    t.int('c');
    t.int('d');
  }
});