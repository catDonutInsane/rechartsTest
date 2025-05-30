
import './App.css'
import { PureComponent} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface IData{
  name: string,
    uv: number,
    pv: number,
    amt: number,
}
type AVG = ReturnType<typeof avg>
type KeyTupe = "pv" | "uv"

const data:IData[] = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]; 
// Получаем среднее значение для одного из полей
function avg(data:IData[], key:KeyTupe):number{  
  let res = data.reduce((prev, next) =>{        
    return {[key]:prev[key]+next[key]}
  },{[key]:0}) 
  return res[key] / data.length  
}


// Получаем дисперсию и сразу вычисляем отклонение для одного из полей
function dispertion(avg:AVG,field:KeyTupe){
  
  return Math.sqrt(data.map(i=>Math.pow(i[field]-avg,2)).reduce((prev, next)=>{
    return prev + next
  },0) / data.length)
}

// Рисуем линии по частям для одного из полей
function drawLine(field:KeyTupe){
  let res =data.map((_, index,arr)=>{
          let array
          let average = avg(data,field)
          if(arr[index+1]){
              array =[arr[index],arr[index+1]]
          }else{
            array =[arr[index]]
          }
           
          return <Line type="monotone" 
              data={array} 
              dataKey={field} 
              stroke={Math.abs((arr[index][field]-average)/dispertion(avg(data,field),field))>1?"red":"blue"} 
              activeDot={{ r: 8 }} 
              name={`${field}${index}`}          
              />
         })
         return res
}

export default class Example extends PureComponent {

  render() {
    return (
      <div style={{width:'100%',height:"100vh"}}>
      <ResponsiveContainer width="100%" height="100%"  maxHeight={700}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 15,
            right: 30,
            left: 20,
            bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" allowDuplicatedCategory={false} />
          <YAxis />
          <Tooltip />
          <Legend />
        {drawLine("uv")}
       {drawLine("pv")}
        </LineChart>
      </ResponsiveContainer> 
      </div>
    );
  }
}
