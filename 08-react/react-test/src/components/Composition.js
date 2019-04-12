import React, { Component } from 'react'

function Dialog(props) {
    return(
        <div style={{ border: `4px solid ${props.color || "blue" }` }}>
            {props.children}
            <div className="footer">{props.footer}</div>
        </div>
    )
}

function WelcomeDialog(props) {
    return(
        <Dialog {...props}>
            <h1>欢迎光临</h1>
            <h1>感谢使用React</h1>
        </Dialog>
    )
}

const Api = {
  getUser() {
    return { name: "jerry", age: 20 };
  }
};
function Fetcher(props){
    const user = Api[props.name]();
    return props.children(user)
}

function Filter({children,type}){
    return (
        <div>
            {React.Children.map( children,child => {
                if(child.type !== type){
                    return;
                }
                return child;
            })}
        </div>
    )
}

//修改childern
function RadioGroup(props){
    return (
        <div>
            {React.Children.map(props.children,child => {
                //   vdom不可更改，克隆一个新的去改才行
                return React.cloneElement(child,{name:props.name})
            })}
        </div>
    )
}

function Radio({children, ...rest}) {
    return (
        <div>
            <label>
                <input type="radio" {...rest}/>
                {children}
            </label>
        </div>
    )
}


export default class Composition extends Component {
  render() {
      const footer = 'footer'
      //return <WelcomeDialog color="green" footer={footer}></WelcomeDialog>

    //   return <Fetcher name="getUser">  //组件的复合
    //     {({ name, age }) => (
    //       <p>
    //         {name}-{age}
    //       </p>
    //     )}
    //   </Fetcher>

    // return <Filter type="p">   //过渡器 过滤出指定的标签
    //     <h1>react</h1>
    //     <p>react挺不错</p>
    //     <h1>vue</h1>
    //     <p>vue挺不错</p>
    // </Filter>

    return <RadioGroup name="mvvm">
        <Radio value="vue">vue</Radio>
        <Radio value="react">react</Radio>
        <Radio value="react">angular</Radio>
      </RadioGroup>
  }
}

