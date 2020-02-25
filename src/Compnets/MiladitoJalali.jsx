import React from 'react'

export default function MiladitoJalali({yers,mont,day}) {

    function gregorian_to_jalali(gy,gm,gd){
        var g_d_m,jy,jm,jd,gy2,days;
        g_d_m=[0,31,59,90,120,151,181,212,243,273,304,334];
        if(gy > 1600){
         jy=979;
         gy-=1600;
        }else{
         jy=0;
         gy-=621;
        }
        gy2=(gm > 2)?(gy+1):gy;
        days=(365*gy) +(parseInt((gy2+3)/4)) -(parseInt((gy2+99)/100)) +(parseInt((gy2+399)/400)) -80 +gd +g_d_m[gm-1];
        jy+=33*(parseInt(days/12053)); 
        days%=12053;
        jy+=4*(parseInt(days/1461));
        days%=1461;
        if(days > 365){
         jy+=parseInt((days-1)/365);
         days=(days-1)%365;
        }
        jm=(days < 186)?1+parseInt(days/31):7+parseInt((days-186)/30);
        jd=1+((days < 186)?(days%31):((days-186)%30));
        return [jy,jm,jd];
       }
       

let finalDate= gregorian_to_jalali(yers,mont,day)

    return (<span>{finalDate[0] +'/'+ finalDate[1] + '/'+ finalDate[2]}</span> )
}
