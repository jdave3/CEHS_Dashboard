var tblrows = document.getElementsByTagName('tr');

for(i=0;i<tblrows.length;i++){
    if(i%2==0) tblrows[i].style.backgroundColor = '#f22000';
    else tblrows[i].style.backgroundColor = '#a02141';
}