import React, { Component, Fragment } from "react";
import TeamSugiDataService from "../services/teamSugiService";
import {hasApiServiceError, urlPublicImage} from '../utils/helper'

class teamSugi extends Component {
    constructor(props) {
        super(props);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.state = {  
            currentTeamSugi: {
                id: null,
                s_subject : "",
                s_content : "",
            },
        }
    }

    componentDidMount() {
        this.getTeamSugi(this.props.match.params.id);
    }

    onChangeSubject(e){
        const s_subject = e.target.value;
    
        this.setState(prevState => ({
            currentTeamSugi: {
            ...prevState.currentTeamSugi,
            s_subject: s_subject
            }
        }));
    }

    getTeamSugi(id){
        TeamSugiDataService.get(id)
        .then(response => {
            const responseJson = response.data
            const hasError = hasApiServiceError({
                errcode: responseJson.errCode,
                errmsg: responseJson.errMsg,
            })
            console.log(responseJson);
            if (hasError.error) {
                alert("서버에서 오류가 발생되었습니다.");
            } else {
                const data = responseJson.teamsugi
                const jsonTeamSugi = {
                    s_subject : data.s_SUBJECT,
                    s_content : data.s_CONTENT
                }
                console.log(jsonTeamSugi.s_content)
                this.setState({
                    currentTeamSugi: jsonTeamSugi
                });
            }
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() { 
        const { currentTeamSugi } = this.state;
        return ( 
            <div id = "container" style ={{paddingBottom:'0px !important'}}> 
                <div id="div_cont" >
                    <div id="div_full" className="div_con taL">
                    <div><img src = {urlPublicImage('2020_team','sugi_list_topn_2.jpg')} style={{width:'1000px'}}/></div>
                        <div className="div_con3">
                            <div className="con">
                            {currentTeamSugi ? (
                                
                                    <ul className="list_wrap" id="listPage" >
                                    <li>
                                        <div className="title_wrap">
                                            <span className="team_stu"><em style={{fontStyle:"normal"}}>ㅇㅎ</em> ㄴㅇㅎ</span>
                                            <span className="team_sc"><em style={{fontStyle:"normal"}}>ㅅㅅ</em> ㄴㅇㅎㄴㅇㅎ</span>
                                            <span className="team_code">ㄴㅇㅎ</span>
                                        </div>
                                        <textarea
                                            type="textarea"
                                            className="title"
                                            id="description"
                                            value={currentTeamSugi.s_subject}
                                            onChange={this.onChangeSubject}></textarea>
                                    </li>
                                </ul>
                               
                            ) : (
                                <div>
                                    <br />
                                    <p>내용이 없습니다.</p>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default teamSugi;