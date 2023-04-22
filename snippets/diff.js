function diff(st, et) {
  console.log("st", st);
  console.log("et", et);
  let diff_ms = et - st;
  console.log("diff_ms", diff_ms);
  diff_ms = diff_ms / 1000;
  console.log("diff_ms", diff_ms);
  let diff_s = Math.abs(Math.round(diff_ms % 60));
  diff_ms = diff_ms / 60;
  let diff_m = Math.abs(Math.round(diff_ms % 60));
  diff_ms = diff_ms / 60;
  let diff_h = Math.abs(Math.round(diff_ms % 24));
  let diff_d = Math.abs(Math.round(diff_ms / 24));
  let diffString = `${diff_d ? `${diff_d} Days` : ``} 
                       ${diff_h ? `${diff_h} Hours` : ``} 
                       ${diff_m ? `${diff_m} Minutes` : ``}
                       ${diff_s ? `${diff_s} Seconds` : `0s`}
                       `;
  return diffString;
}
console.log(temp1);
diff(temp1[temp1.length - 1].startTime, temp1[0].endTime);
