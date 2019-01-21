{
    const legends = ["SQL Injection", "Spectre"];
    const input = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {
        "SQL Injection": {
            "count": 23,
            "dataFilter": "severity=ATTACK&appid=5a703de62f30d831d44afb96,5a703fb72f30d803e025372a,5a7040352f30d803e025372b,5a70404c2f30d803e025372c,5a7040612f30d803e025372d,5a7040842f30d803e025372e&from=1532066976099&to=1532071296111&type=SQLi"
        },  "Spectre": {
            "count": 29,
            "dataFilter": "severity=ATTACK&appid=5a703de62f30d831d44afb96,5a703fb72f30d803e025372a,5a7040352f30d803e025372b,5a70404c2f30d803e025372c,5a7040612f30d803e025372d,5a7040842f30d803e025372e&from=1532066976099&to=1532071296111&type=Spectre"
        }
    }, {
       
    }];

    const dop = [{
        "label": "SQL Injection",
        "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0],
        "filterData": []
    }, {
        "label": "Spectre",
        "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 29, 0],
        "filterData": []
    }];

    legends.reduce((p,n)=>{
        let point = {
            label: n,
            data: [],
            filterData: []
        };
        input.map((_p, _i) => {
            let keys = Object.keys(_p);
            if(keys.includes(n)) {
                console.log('it is there', _p[n]);
                const {count: data, dataFilter: filterData} = _p[n];
                console.log(data, filterData);
//                 Object.assign(point, data, dataFilter)
                point.data[_i] = _p[n].count;
                point.filterData[_i] = _p[n].dataFilter;  
            } else {
               point.data[_i] = 0;
               point.filterData[_i] = null;
            }
           
        }
        );
        return p.concat(point);
    }
    , [])

}
