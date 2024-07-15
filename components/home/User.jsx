export function User({Data}){
    let {id, name, roll, age}=Data;
    return (<div style={{color: "blue"}} >User1
        <h3>Id: {id} and his name is :{name}, his roll is: {roll} and his age is: {age}</h3>
    </div>)
}