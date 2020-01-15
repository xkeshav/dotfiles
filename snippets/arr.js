{
const remakeChartData = (input) => {
        console.log('input', input);
        const output = {};
        input.map((item) => {
            for (let key in item) {
                if (!(key in output)) {
                    output[key] = [];
                }
                output[key].push(item[key]);
            }
        });
        const entries = Object.entries(output);
        return entries.map((e) => {
            let label = e[0];
            label = `${label.charAt(0).toUpperCase()}${label.substring(1)}`;
            const data = e[1];
            return { label, data };
        });
    }

let input = [
                {
                    "timestamp": 1515736726014,
                    "detail": {
                        "DLL Injection": 0
                    }
                },
                {
                    "timestamp": 1517032726118,
                    "detail": {
                        "DLL Injection": 0
                    }
                },
                {
                    "timestamp": 1518328726222,
                    "detail": {
                        "DLL Injection": 0
                    }
                },
                {
                    "timestamp": 1519624726326,
                    "detail": {
                        "DLL Injection": 0
                    }
                },
                {
                    "timestamp": 1520920726430,
                    "detail": {
                        "DLL Injection": 0
                    }
                },
                {
                    "timestamp": 1522216726534,
                    "detail": {
                        "DLL Injection": 0
                    }
                },
                {
                    "timestamp": 1523512726638,
                    "detail": {
                        "DLL Injection": 100
                    }
                }
            ];


let output = remakeChartData(input.map(i => i.detail));
console.log('op', output);
}