

export function prettyClrType(typeName) {

    try {
        var parsedType = parseClrTypeName(typeName);

        return formatClrType(parsedType);
    } catch (e) {
        return typeName;
    }
}

function formatClrType(parsedType) {
    var output = formatClrTypeName(parsedType.name);

    if (parsedType.genericTypes.length) {
        output += "<";

        output += parsedType.genericTypes.map(function(typeArg) {
            return formatClrType(typeArg)
        }).join(", ");

        output += ">";
    }

    return output;
}

function formatClrTypeName(typeFullName) {
    var result = /^(\w+(?:\.\w+)*)\.(\w+)$/.exec(typeFullName);
    var namespace = result[1];
    var name = result[2];

    // Instrinsic types
    switch(typeFullName) {
        case "System.String": return "string";
        case "System.Byte": return "byte";
        case "System.Single": return "float";
        case "System.Double": return "double";
        case "System.Decimal": return "decimal";
        case "System.Int16": return "short";
        case "System.Int32": return "int";
        case "System.Int64": return "long";
        case "System.Int16": return "short";
        case "System.Int32": return "int";
        case "System.Int64": return "long";
        case "System.UInt16": return "ushort";
        case "System.UInt32": return "uint";
        case "System.UInt64": return "ulong";
    }

    // Well Known Types
    switch(typeFullName) {
        case "System.Threading.Tasks.Task": return "Task";
    }

    // Generic enumerables
    if (namespace === "System.Collections.Generic") {
        return name;
    } if (namespace === "System") {
        return name;
    }

    return typeFullName;
}

export function parseClrTypeName(typeName) {

  var STATE_QUALIFIED_TYPE = 0;
  var STATE_SIMPLE_TYPE = 1;

  var STATE_TYPE_NAME = 2;
  var STATE_TYPE_ASSEMBLY = 3;
  var STATE_TYPE_ATTRIBUTE_KEY = 4;
  var STATE_TYPE_ATTRIBUTE_VALUE = 5;
  var STATE_GENERIC_TYPES = 6;

  // 
  var states = [STATE_QUALIFIED_TYPE, STATE_TYPE_NAME];
  var currentState = states[1];
  
  var types = [{name: '', assembly: '', attributes: {}, genericTypes: []}];
  var currentType = types[0];
  var currentTypeKey = '';
  
  for (var index = 0; index < typeName.length; index++) {
    var char = typeName[index];
  	
    if (currentState >= STATE_TYPE_NAME && currentState <= STATE_TYPE_ATTRIBUTE_VALUE) {
        if (char === '`') {
            while (/\d/.test(typeName[index+1])) {
                index++
            }
        } else if (/[a-zA-Z\d_\.]/.test(char)) {
            switch(currentState) {
                case STATE_TYPE_NAME:
                    currentType.name += char;
                    break;
                case STATE_TYPE_ASSEMBLY:
                    currentType.assembly += char;
                    break;
                case STATE_TYPE_ATTRIBUTE_KEY:
                    currentTypeKey += char;
                    break;
                case STATE_TYPE_ATTRIBUTE_VALUE:
                    currentType.attributes[currentTypeKey] += char;
                    break;
            }
            
        } else if (char === ',') {

            if (currentState == STATE_TYPE_ATTRIBUTE_VALUE) {
                currentState = STATE_TYPE_ATTRIBUTE_KEY;
            } else if (states.length > 1 && states[states.length - 2] === STATE_QUALIFIED_TYPE) {
                currentState++;
            } else if (states.length > 1 && states[states.length - 2] === STATE_SIMPLE_TYPE) {
                states.pop();
                states.pop();
                currentState = states[states.length - 1];
                types.pop();
                currentType = types[types.length - 1];
            }

            if (currentState === STATE_TYPE_ATTRIBUTE_KEY) {
                currentTypeKey = '';
            }
        } else if (/\w/.test(char) || char === ' ') {
            // ignore
        } else if (char === ']') {
            states.pop();
            states.pop();
            currentState = states[states.length - 1];
            types.pop();
            currentType = types[types.length - 1];
        } else if (char === '[') {
            if (currentType.name !== '') {
                currentState = STATE_GENERIC_TYPES;
                states[states.length-1] = STATE_GENERIC_TYPES;
            }
        } else if (char === '=' && currentState === STATE_TYPE_ATTRIBUTE_KEY) {
            currentState = STATE_TYPE_ATTRIBUTE_VALUE;

            currentType.attributes[currentTypeKey] = '';
        } else {
            throw "Unexpected type name char '" + char + "' at position " + index;
        }
    } else if (currentState === STATE_GENERIC_TYPES) {
        if (/[a-zA-Z\d_\[]/.test(char)) {
            states.push(char === '[' ? STATE_QUALIFIED_TYPE : STATE_SIMPLE_TYPE);
            states.push(currentState = STATE_TYPE_NAME);

            var newType = {name: '', assembly: '', attributes: {}, genericTypes: []};

            currentType.genericTypes.push(newType);

            types.push(currentType = newType)

            if (char !== '[') {
                currentType.name += char;
            }
        } else if (char === ']') {
            states.pop();
            currentState = states[states.length - 1];
        }
      }

    }
    
    return types[0];
  }
