export const SomeObjectType = objectType({
  name: 'SomeObjectType',
  definition(t) {
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
  }
});
