import React, {useEffect, useState} from 'react'; 
import axios from 'axios';
const Interview = (props) => {   
//const가 있기때문에 실행문으로 사용할수 있음
    let [ interviewId, interviewIdUpdate ] = useState([]);  
    const [typeData,insertDB] = useState(0);   
   
    const interviewDataSetting = async () => {                      
                             await axios.get(`/prointerview?type=${props.botable}`)
                                        .then(
                                            (result) => {  //test형 array
                                                try{  
                                                    interviewIdUpdate([...result.data]); //[...result.data]이때는 object
                                                    insertDB(result.data[result.data.length -1].no);                                                 
                                                }
                                                catch(err){ console.log(err.message) }
                                            }
                                        )
                                        .catch ( e => { console.log(e +'이유로 통신이 불안전함') }
                                        ) 
    } 
    useEffect( () => {  interviewDataSetting(); } , [typeData]  )  //typeData의 값이 변할 때 재랜더링 해라.      
        return (  
            <div> <h2>{ interviewId.length > 0 ? "사전인터뷰" : "데이터전송중..." }</h2>
             {
                 interviewId.map(( contant, i ) => {
                     return(
                         <li>
                             <h3>{i+1} {contant.subject}</h3><div>{contant.content}</div>
                         </li>
                     )
                 })
             }
            </div>
        );   
}
export default Interview;