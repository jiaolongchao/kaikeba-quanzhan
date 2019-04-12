import React from 'react'

export default function Cart({data,add,minus}) {
  return (
    <div>
      <table>
        <tbody>
        {data.map(d=>(
            <tr key={d.id}>
                <td>{d.text}</td>
                <td>
                <button onClick={()=> minus(d)}>-</button>
                {d.count}
                <button onClick={()=> add(d)}>+</button>
                </td>
            </tr>
        ))}
        </tbody>
      </table> 
    </div>
  )
}
