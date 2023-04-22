{
  const params_ = {
    severity: ["attack", "threat"],
    appList: null,
    state: false,
    category: null,
    seen: null,
    unseen: {
      from: null,
      to: 1545642122497,
    },
  };

  const serialize = (params) => {
    const result = [];

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const keyValue = params[key];
        if (keyValue !== undefined && keyValue !== null) {
          switch (keyValue.constructor.name) {
            case "Array":
              console.log("array", keyValue);
              if (keyValue.length > 0) {
                const joined_value = keyValue.join(",");
                result.push(
                  `${encodeURIComponent(key)}=${encodeURIComponent(
                    joined_value
                  )}`
                );
              }
              break;
            case "Object":
              console.log("object", keyValue);
              Object.entries(keyValue).map(([k, v]) => {
                if (v) {
                  result.push(
                    `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
                  );
                }
              });
              break;
            default:
              console.log("default", keyValue);
              result.push(
                `${encodeURIComponent(key)}=${encodeURIComponent(keyValue)}`
              );
          }
        }
      }
    }
    return result.join("&");
  };

  serialize(params_);
}
