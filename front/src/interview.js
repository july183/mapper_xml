import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Interview = (props) => {
    let [interviewId, interviewIdUpdate ] = useState([]);
    const [typeData, insertDB] = useState(0);
    const interviewDataSetting = async () => {                      
                            await axios
                                        .get(
                                        `/sqsend?botable=${props.botable}`
                                        )
                                        .then(
                                            (result) => {        
                                                try{
                                                    console.log(interviewId);
                                                    console.log(typeData);
                                                    interviewIdUpdate([...result.data]);
                                                    console.log(interviewId);
                                                    insertDB(result.data[0].no);
                                                }
                                                catch(err){
                                                    console.log(err.message);
                                                }    
                                            }
                                        )
                                        .catch ( e => {
                                            console.log(e +'이유로 통신이 불안전함')
                                             }
                                        ) 
    }    
    
    useEffect( () => {  
        interviewDataSetting();         
     } , [typeData]  )
        return(
            <div>
                <h2>{interviewId.length > 0 ? "사전인터뷰" : "데이터전송중..."}</h2>
                {
                    interviewId.map((contant) => {
                        return (  
                            <li>
                                <h3>{contant.subject}</h3>
                                <div>{contant.content}</div>
                            </li>
                        )
                    })
                }
            </div>
        );
}

export default Interview;