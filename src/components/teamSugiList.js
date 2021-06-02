import React, { Component, Fragment } from "react";
import TeamSugiDataService from "../services/teamSugiService";
import { isUndefined, isEqual } from 'lodash/lang'
import {hasApiServiceError} from '../utils/helper'

class teamSugiList extends Component {
    constructor(props) {
        super(props);
       //this.renderList = this.renderList.bind(this);
        this.state = {  
            sugiList : [],
            isMod : false,
        }
    }
    componentDidMount(){
        this.renderList();
    }
    renderList = () => {
        TeamSugiDataService.getAll()
        .then( response => {
            const responseJson = response.data
            const hasError = hasApiServiceError({
                errcode: responseJson.errCode,
                errmsg: responseJson.errMsg,
            })
            console.log(responseJson.errCode);
            if (hasError.error) {
                alert("서버에서 오류가 발생되었습니다.");
            } else {
                const jsonResult =  responseJson.sugiList.reverse().map((sugiItem, index) => {
                   
                    const code_name = sugiItem.s_CODENAME;
                    const s_name = sugiItem.s_NAME;
                    const s_univ = sugiItem.s_UNIV;
                    const s_dept_type = sugiItem.s_DEPT_TYPE;
                    const s_major = sugiItem.s_MAJOR;
                    const s_type = sugiItem.s_TYPE;
                    const s_content = sugiItem.s_CONTENT;
                    const s_seq = sugiItem.seq;
                    const s_subject = sugiItem.s_SUBJECT
                    const classType =  index % 2 === 0  ? 'c' : 'c_even';

                    console.log(index % 2);

                    return { 
                        code_name : code_name, 
                        s_name : s_name, 
                        s_univ : s_univ, 
                        s_dept_type : s_dept_type, 
                        s_major : s_major,
                        s_type : s_type,
                        s_content : s_content,
                        s_seq : s_seq,
                        s_subject: s_subject,
                        classType : classType
                    }
                })
                this.setState({
                    sugiList : jsonResult
                })
            }
        })
        .catch(e=>{
            console.log(e);
            alert("데이터를 정상적으로 조회하지 못했습니다.");
        })
    }
    render() { 
        const { sugiList } = this.state;
        return (  
            <div className = "container"> 
                <div id="div_cont" >
                    <div id="div_full" className="div_con taL">
                        <div className="div_con5">
                            <div className="con">
                            {
                                sugiList.map((item, index) => (
                                <ul className="list_wrap" id="listPage">
                                    <li id="liNm" className={item.classType}>
                                        <div className="title_wrap">
                                            <span className="team_stu"><em style={{fontStyle:"normal"}}>{item.s_name}</em> {item.s_univ} {item.s_major}</span>
                                            <span className="team_sc"><em style={{fontStyle:"normal"}}>노량진</em> 인문계열 {item.classType}</span>
                                            <span className="team_code">정시</span>
                                        </div>
                                        <p className="title">{item.s_subject}</p>
                                        <p className="team_contents">{item.s_content}</p>
                                    </li>
                                </ul>
                                ))
                            }       
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default teamSugiList;