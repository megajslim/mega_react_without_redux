import React, { Component } from "react";
import TeamSugiDataService from "../services/teamSugiService";
import {hasApiServiceError} from '../utils/helper'
import Button from '@material-ui/core/Button';
import TopMenu from "./menu";
import BottomMore from "./bottomMore";

class teamSugiList extends Component {
    constructor(props) {
        super(props);
        this.showMore = this.showMore.bind(this);
        this.goTop = this.goTop.bind(this);
        this.state = {  
            sugiList : [],
            countItem : 2,
            moreMode : true,
            countInterVal : 2
        }
    }
    
    componentDidMount(){
        this.renderList();
    }

    showMore() {
        const {sugiList, countItem, countInterVal } = this.state
         sugiList.length  <= countItem + countInterVal ? (
             this.setState({ 
                moreMode : false,
                countItem: countItem + countInterVal
             })
         ) : (
             this.setState({ 
                 countItem: countItem + countInterVal
             })
         )
    }

    goTop(){
        window.scroll({ top: 0, behavior: 'smooth'})
    }

    renderList = () => {
        TeamSugiDataService.getAll()
        .then( response => {
            const responseJson = response.data
            const hasError = hasApiServiceError({
                errcode: responseJson.errCode,
                errmsg: responseJson.errMsg,
            })
            console.log(responseJson);
            if (hasError.error) {
                alert("서버에서 오류가 발생되었습니다.");
            } else {
                const jsonResult =  responseJson.sugiList.reverse().map((sugiItem, index) => {
                   
                    const s_code_name = sugiItem.s_CODENAME;
                    const s_name = sugiItem.s_NAME;
                    const s_univ = sugiItem.s_UNIV;
                    const s_dept_type = sugiItem.s_DEPT_TYPE;
                    const s_major = sugiItem.s_MAJOR;
                    const s_type = sugiItem.s_TYPE;
                    const s_content = sugiItem.s_CONTENT;
                    const s_seq = sugiItem.seq;
                    const s_subject = sugiItem.s_SUBJECT
                    const classType =  index % 2 === 0  ? 'c_odd' : 'c_even';
                    return { 
                        s_code_name : s_code_name, 
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
        const { sugiList, countItem, moreMode } = this.state;
        return (  
            <div id = "container" style ={{paddingBottom:'0px !important'}}> 
                <div id="div_cont" >
                    <div id="div_full" className="div_con taL">
                        <TopMenu></TopMenu>
                        <div className="div_con3">
                            <div className="con">
                            {
                                sugiList.slice(0, countItem).map((item, index) => (
                                <ul className="list_wrap" id="listPage" key={index}>
                                    <li id={item.seq} className={item.classType}>
                                        <div className="title_wrap">
                                            <span className="team_stu"><em style={{fontStyle:"normal"}}>{item.s_name}</em> {item.s_univ} {item.s_major}</span>
                                            <span className="team_sc"><em style={{fontStyle:"normal"}}>{item.s_code_name}</em> {item.s_dept_type}</span>
                                            <span className="team_code">{item.s_type}</span>
                                        </div>
                                        <p className="title">{item.s_subject}</p>
                                        <p className="team_contents">{item.s_content}</p>
                                        <Button variant="contained" color="primary" href={"/teamsugi/" + item.s_seq}>수정 </Button>
                                    </li>
                                </ul>
                                ))
                            }   
                            </div> 
                        </div>
                        <BottomMore 
                            showMore = {this.showMore} 
                            goTop = {this.goTop}
                            moreMode = {moreMode}>
                        </BottomMore>
                    </div>
                </div>
            </div>
        );
    }
}
export default teamSugiList;