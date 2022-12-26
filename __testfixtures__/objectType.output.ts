export const SomeObjectType = builder.objectRef<any>('SomeObjectType')
  .implement({
    fields: (t) => ({
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
      })
    })
  });
