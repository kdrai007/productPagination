import './App.css'
import { useEffect,useState } from 'react';
export default function App() {
  const [product,setProduct]=useState<Array<any>>([])
  const [page,setPage]=useState(0);
 useEffect(()=>{
 async  function getData (){
   const res= await fetch('https://dummyjson.com/products?limit=100');
   const data= await res.json();
   setProduct(data.products);
 }
   getData();
   console.log(product.slice(0,10));
 },[])
    const numberList = [];
  for (let i = 0; i < (product.length/10)-1; i++) {
    numberList.push(<div className={ page===i+1?"active":""} role="button" onClick={()=>{setPage(i+1)}} key={i}>{i+1}</div>);
  }
  function handlePrev(){
    if(page>0){
      setPage(page-1);
    }
  }
  function handleNext(){
    if(page!==(product.length)-1)
      setPage(page+1);
  }
  return (
    <main>
      <div className="images">
      {
        product.length>0 && product.slice(page*10,page*10+10).map((item:any,index:number)=>{
         return <img src={item.thumbnail} key={index} alt ={item.title} /> 
        })
      }  
        </div>
      <div className="pagination">
        {page >0 && <div role="button" onClick={handlePrev}>prev</div>}
        { numberList}
        {page!==(product.length/10)-1 && <div role="button" onClick={handleNext}>next</div>}
      </div>
    </main>
  )
}