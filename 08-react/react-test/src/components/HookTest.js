import React,{useState , useEffect} from 'react'

//自定义的hook是一个函数，名称以use开头，函数内部还可以调用 其他够细
function useAge() {
  const [age ,setAge] = useState(0);
  useEffect(() => {
    setTimeout(()=>{
      setAge(20)
    },2000)
  }, []);
  return age;
}


export default function HookTest() {
  const [count,setCount] = useState(0);  //解构出一个函数有两个参数 状态 和更改状态

  //副作用钩子会在每次渲染的时候都会执行
  useEffect(() => {
    console.log('api调用');
    document.title = `您点击了${count}次`
  })  //在这里我们要注意，useEffect会在函数持载 函数更新 函数卸载的生命周期中都会执行，因为我们是否要把每一个状态更新都这样写呢

  //如果仅打算执行一次，传递第二个参数为空数组
  //这样的写法特别像compoientDidMount周期
  useEffect(() => { 
    console.log('api调用');
    document.title = `您点击了${count}次`
  },[])

  //还可以明确的指定依赖 就是在空数组的指定状态

  //多个状态的情况 
  const age = useAge();
  const [fruit, setFruit] = useState('banana');
  const [fruits, setFruits] = useState(['apple','orange']);
  const [input, setInput] = useState('');

  return (
    <div>
      <p>点击了{count}次</p>
      <button onClick={()=>setCount(count + 1)}>点击</button>


      <p>年龄{age ? age : 'loading...'}</p>
      <p>水果{fruit}</p>

      <input type="text" value={input} onChange={e=>setInput(e.target.value)}/>
      <button onClick={()=>setFruits([...fruits,input])}>新增水果</button>

      <ul>
      {fruits.map(f => (<li key={f} onClick={()=>setFruit(f)}>{f}</li>)) }
      </ul>
    </div>
  )
}
