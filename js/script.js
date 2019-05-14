var newZoom =200;
var myPoint=[];  //mypoint는 타일의 정보를 담고있는 객체이다.
var tempTile;
var OriginNum=1;
var Clicked;
var Building=[
  [
  "A7_Street",
  "A7_House",
  "A7_Marketplace",
  "A7_Townhall",
  "A7_Church",
  "A7_Firestation",
  "A7_Policestation",
  "A7_Hospital",
  "A7_Oilpowerplant",
  "A7_Pub",
  "A7_School",
  "A7_Theater",
  "A7_University",
  "A7_Bank",
  "A7_Membersclub"
  ],
  []
];
function MouseChange(cdt)
{
  Clicked=cdt;
}
function zooms(){
  document.getElementById("grid").style.zoom = newZoom+'%';
}
function makeTable(cr){
  var col =0;
  var row = 0;
  var id=0;
  cr="red";
  document.write('<table id = "tb" border="1" cellspacing="0" >  ');
  while(col<70)
  {
    document.write('<tr height="30">');
      while(row<70)
      {
        id=70*col+row;
        document.write('<td  id = "'+Number(col*100+row)+'" class="first" width ="30" onclick="ClickCell(this.id);" onMouseover="MouseInCell(id);" onMouseout="MouseOutCell(id);" >'+Number(col*100+row)+'</td>');
        var temp={"IsAvailable":0,"index":"","color":"white","excolor":""};
        myPoint[id]=temp;
        row=row+1;
      }
    row=0;
    col=col+1;
    document.write('</tr>');
  }
  document.write('</table>');
}
function MouseInCell(num) //마우스가 셀 안에 들어왔을 때
{
  if(Clicked=="A7_House")
    {
      for(var i=0;i<3;i++)
      {
        for(var j=0;j<3;j++)
        {
          var id = Number(num)+Number(i)+Number(j*100);
          if(!IsOut(id))
              {
              document.getElementById(id).style.backgroundColor='red';
              }
        }
      }
    }
}
function MouseOutCell(num)
{
  if(Clicked=="A7_House")
    {
      for(var i=0;i<3;i++)
        for(var j=0;j<3;j++)
        {
          var id = Number(num)+Number(i)+Number(j*100);
          if(!IsOut(id))
              {
               document.getElementById(id).style.backgroundColor=myPoint[id].color;
              }
        }
    }
}
function DeleteCell(num,index)  //셀을 삭제할 때 사용
{
  if(myPoint[num].index != index)
    return;
  console.log("i'm num = "+num+"   index = "+index);
  myPoint[num].index=0;
  document.getElementById(num).style.backgroundColor='white';
  document.getElementById(num).style.color='black';
  for(var i=-1;i<=1;i++)
  {
    for(var j=-1;j<=1;j++)
    {
      if(!IsOut((Number(num)+Number(i)+Number(j*100))))
      {

          DeleteCell((Number(num)+Number(i)+Number(j*100)),index);
      }
    }
  }
}
function ClickCell(num) //셀을 클릭했을 때 나타나는 결과이다.
{
  if(Clicked=="A7_House")
    {
      CheckAndChange(num,3,3,"'red'");
    }
  else if(Clicked=="Delete")
   {
     if(myPoint[num].index!=0)
      DeleteCell(num,myPoint[num].index);
   }
  else if(Clicked=="clean"){
    }
}
function CheckAndChange(num,sizeX,sizeY,color)  //유효범위를 검사하고 색을 바꿔준다.
{
  for(var i=0;i<sizeX;i++)
  {
    for(var j=0;j<sizeY;j++)
    {
      if(IsOut((Number(num)+Number(i)+Number(j*100))))
          return;
      if(myPoint[(Number(num)+Number(i)+Number(j*100))].IsAvailable==1)
          return;
    }
  }
  for(var i=0;i<sizeX;i++)
  {
    for(var j=0;j<sizeY;j++)
    ChangeCellColor((Number(num)+Number(i)+Number(j*100)),color);
  }
  OriginNum++;
}
function IsOut(num) //셀의 유효범위를 체크한다.
{
    if(num<0||num%100>=70||num/100>=70)
    {
        return true;
    }
    else {
      return false;
    }
}
function ChangeCellColor(num,color) //셀의 색을 바꾼다.
{
   console.log(color);
   document.getElementById(num).style.backgroundColor=color;
   document.getElementById(num).style.color='white';
   myPoint[num].IsAvailable=1;
   myPoint[num].color=color;
   myPoint[num].index=OriginNum;
}
function ClickBuildingButton(num,id)
{
  console.log(Building[num][id]);
  MouseChange(Building[num][id]);
}
function DrawImage(num,size) //이미지를 그려줌
{
  var id;
  for(var i=0;i<size;i++)
  {
    id=Number(i+num*10);
    document.write('<div class="BuildingBackImg" >');
    document.write('<img id="'+id+'back"> ');
    document.write('<img id="'+id+'button" class="BuildingImg" onClick="ClickBuildingButton('+num+','+id+')" ></div>');
    document.getElementById(id+'back').src="./data/image/basic.png";
    document.getElementById(id+'button').src=String("./data/icon/"+Building[num][id]+".png");
  }
}
