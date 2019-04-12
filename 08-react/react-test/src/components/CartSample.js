import React, { Component } from 'react'
import Cart from './Cart'
export default class CartSample extends Component {
    //状态的初始化一般放在构造器中
    constructor(props){
        super(props);
        this.state = {
            text:"",
            cart:[],
            goods:[
                {id:1,'text':"react基础教程"},
                {id:2,'text':"vue入门"}
            ]
        }
    }
    //回调函数声明为箭头函数
    textChange = (e)=>{
        this.setState({
            text:e.target.value
        })
    }
    addGood = ()=>{
        //react官方希望我们传入的的返回的是同一个数组
        this.setState(prevState =>{
            return {
                goods : [...prevState.goods,{
                    id:prevState.goods.length + 1,
                    text:prevState.text
                }]
            }
        })
    }

    //加购函数
    addToCart = (good)=>{
        //创建新购物车
        const newCart = [...this.state.cart];
        const idx = newCart.findIndex(c=>c.id === good.id);
        const item = newCart[idx];
        if(item){ //存在
            newCart.splice(idx,1,{...item, count : item.count + 1})
        }else{ //不存在
            newCart.push({...good, count:1})
        }

        //更新
        this.setState({
            cart:newCart
        })
    }

    //
    add = (good)=>{
        const newCart = [...this.state.cart];
        const idx = newCart.findIndex(c=>c.id === good.id);
        const item = newCart[idx];
        newCart.splice(idx,1,{...item, count : item.count + 1})
       //更新
        this.setState({
            cart:newCart
        })
    }

    minus = (good)=>{
        const newCart = [...this.state.cart];
        const idx = newCart.findIndex(c=>c.id === good.id);
        const item = newCart[idx];
        if(item.count  <= 1){
            if(window.confirm('是否要删除')){
                newCart.splice(idx,1)
            }
        }else{
            newCart.splice(idx,1,{...item, count : item.count - 1})
        }
       //更新
        this.setState({
            cart:newCart
        })
    }
  render() {
    // const title = this.props.title ? <h1>{this.props.title}</h1> : null;
    return (
      <div>
       {/* 条件渲染 短路逻辑 */}
       { this.props.title && <h1>{this.props.title}</h1>}

       {/* 列表渲染 */}
       <div>
           <input type="text" value={this.state.text} onChange={this.textChange} />
           <button onClick={this.addGood}>添加商品</button>
       </div>
       <ul>
            {this.state.goods.map(good=>(
                <li key={good.id}>
                    {good.text}
                    <button onClick={()=>this.addToCart(good)}>加购</button>
                </li>
            ))}
       </ul>
       {/* 购物车 */}
       <Cart data={this.state.cart} add={this.add} minus={this.minus}></Cart>
      </div>
    )
  }
}
