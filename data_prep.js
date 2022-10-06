var fs=require('fs');
let students=[]
module.exports.prep= () => {
    return new Promise((resolve, reject) =>{   
            fs.readFile('./students.json', (err, data) => {
                if (err) reject("unable to read file");;
                students=JSON.parse(data);
                resolve();
        });
    });
}

module.exports.cpa=()=>{
    return new Promise((resolve, reject) => {
        let CPAs = [];
        for (i in students) {
            if (students[i]["program"] == "CPA")
                CPAs.push(students[i]);
        }
        if (CPAs.length == 0) {
            reject("no results returned");
        }
        resolve(CPAs);
    })
}

module.exports.highGPA=()=>{
    return new Promise((resolve, reject) => {
        let highest=-1;
        marks=0.0;
        for (i in students) {
            if (students[i]["gpa"] >marks)
                highest=i;
                marks=students[i]["gpa"];
        }
        if (highest==-1) {
            reject("Failed finding the student with the highest GPAno results returned");
        }
        resolve(students[highest]);
    })
}

