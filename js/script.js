var newZoom =200;
var myPoint=new Array();
var OriginNum=0;
var Clicked = ["clean","house"];
function temp()
{
  document.getElementById("main").style.display = "none";
}
function getPosi(){
  alert("aa");
}
function zooms(){
  document.getElementById("grid").style.zoom = newZoom+'%';
}
function makeTable(cr){
  var col =0;
  var row = 0;
  var id=0;
  cr="red";
  document.write('<table id = "tb" border="1" cellspacing="0">');
  while(col<70)
  {
    myPoint[0]=1;
    myPoint[71]=1;
    document.write('<tr height="30">');
      while(row<70)
      {
        id=70*col+row;
        if(myPoint[id]=="1")
        document.write('<td  id = "'+Number(col*100+row)+'" bgcolor = "'+cr+'"class="first" width ="30">'+Number(col*100+row)+'</td>');
        else
        document.write('<td  id = "'+Number(col*100+row)+'" class="first" width ="30">'+Number(col*100+row)+'</td>');
        row=row+1;
      }
    row=0;
    col=col+1;
    document.write('</tr>');
  }
  document.write('</table>');
}
function ClickCell(num){
  console.log("called");
  Clicked="house";
  if(Clicked=="house")
    {
      for(var i=-1;i<2;i++)
      {
        for(var j=-1;j<2;j++)
        ChangeColor((Number(num.id)+Number(i)+Number(j*100)));
      }
      OriginNum++;
    }
    else if(Clicked=="clean"){

    }
}
function ChangeColor(num)
{
  $('#'+num).css('background-color','red')
  myPoint[num]=OriginNum;
  console.log(myPoint[num]);
}
function FindID(func){
  for(var i=0;i<70;i++)
  {
    for(var j=0;j<70;j++)
    {
      func([Number(i)+Number(j*100)]);
    }
  }
}
function CleanMap(ori){
  FindID(
    function(pa){
      if(myPoint[pa]==ori)
      {
        $('#'+pa).css('background-color','white')
        console.log(pa);
      }
    }
  );
}
