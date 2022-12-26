import {JSCodeshift, Transform} from "jscodeshift/src/core";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const nullableObject = (nullable: boolean, j: JSCodeshift) => j.objectExpression([
  j.property('init', j.identifier('nullable'), j.booleanLiteral(nullable))
])

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const {statement} = j.template;
  const root = j(file.source);
  const objects = root
    .find(j.CallExpression).filter(p => {
      const callee = p.value.callee;
      return callee.type === 'Identifier' && callee.name === 'objectType';
    });
  const queriesMutations = root
    .find(j.CallExpression).filter(p => {
      const callee = p.value.callee;
      const functionNames = ['mutationField', 'queryField'];
      return callee.type === 'Identifier' && functionNames.includes(callee.name) && p.value.arguments[0].type === 'StringLiteral';
    });
  queriesMutations.replaceWith(p => {
    const functionName = p.value.callee.name;
    const args = p.value.arguments;
    if (args.length === 0) {
      return p.value;
    }
    const name = args[0].value;
    const config = args[1];
    const auth = config.properties.find(p => p.key.name === 'authorize');
    if (auth) {
      auth.key.name = "authScopes";
    }
    const newArgs = config.properties.find(p => p.key.name === 'args');
    if (newArgs) {
      newArgs.value.properties = newArgs.value.properties.map(p => {
        const name = p.key.name;
        const nonNullable = p.value.callee.name === 'nonNull';
        const params = []
        if(nonNullable) {
          params.push( j.property('init', j.identifier('nullable'), j.booleanLiteral(false)))
        }
        const val = p.value.arguments[0] ?? p.value;
        let newArg;
        if(val.type === 'Identifier') {
          params.unshift( j.property('init', j.identifier('type'), val))
          newArg = j.callExpression(
            j.memberExpression(j.identifier('t'), j.identifier('arg')),
            [j.objectExpression(params)]
          );
        } else {
          const type = val.callee.name.match(/[a-z]+/g)[0];
          newArg = j.callExpression(
            j.memberExpression(j.memberExpression(j.identifier('t'), j.identifier('arg')), j.identifier(type)),
            params.length ? [j.objectExpression(params)] : []
          );
        }
        return j.property('init', j.identifier(name), newArg);
      });
    }
    return statement`builder.${functionName}(${j.stringLiteral(name)}, t => t.field(${j.objectExpression([
      config.properties.find(p => p.key.name === 'type'),
      j.property('init', j.identifier('nullable'), j.booleanLiteral(true)),
      config.properties.find(p => p.key.name === 'args'),
      auth,
      config.properties.find(p => p.key.name === 'resolve')].filter(Boolean))}))`;
  })

  objects.replaceWith(p => {
    const object = p.value.arguments[0];
    const type = object.properties.find(p => p.key.name === 'name').value;
    const definitions = object.properties.find(p => p.key.name === 'definition').body.body;
    const fields = definitions.map(node => {
      const functionName = node.expression.callee.property.name;
      const isNullable = node.expression.callee.object.property?.name === 'nullable'
      let propertyName;
      let type;
      let resolve;
      if(functionName === 'field' && node.expression.arguments[0].type === 'ObjectExpression') {
         propertyName = node.expression.arguments[0].properties.find(p => p.key.name === 'name').value;
         type = node.expression.arguments[0].properties.find(p => p.key.name === 'type').value;
         resolve = node.expression.arguments[0].properties.find(p => p.key.name === 'resolve');
      } else if(functionName === 'field') {
         propertyName = node.expression.arguments[0];
         type = node.expression.arguments[1].properties.find(p => p.key.name === 'type').value;
         resolve = node.expression.arguments[1].properties.find(p => p.key.name === 'resolve')
      } else {
         propertyName = node.expression.arguments[0];
         type = functionName;
         resolve = node.expression.arguments[1]?.properties.find(p => p.key.name === 'resolve')
      }
      const exposeName = functionName === 'field' ? 'expose' : `expose${capitalizeFirstLetter(type === 'id' ? 'ID' : type)}`;
      const objectProps = [];
      if (functionName === 'field') {
        objectProps.push(j.property('init', j.identifier('type'), type))
      }
      if (isNullable) {
        objectProps.push(j.property('init', j.identifier('nullable'), j.booleanLiteral(true)))
      }
      if (resolve) {
        objectProps.push(resolve)
      }
      return j.property('init', j.identifier(propertyName.value), j.callExpression(
        j.memberExpression(j.identifier('t'), j.identifier(exposeName)),
        objectProps.length ? [propertyName, j.objectExpression(objectProps)] : [propertyName]
      ));
    })
    return statement`builder.objectRef<any>(${type})
  .implement({
    fields: (t) => ${j.objectExpression(fields)}
  })`;
  });
  return root.toSource();
};

export default transform;