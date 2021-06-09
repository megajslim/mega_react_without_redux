import React, { Component, Fragment } from "react";
import TeamSugiDataService from "../services/teamSugiService";
import {hasApiServiceError} from '../utils/helper'
import TopMenu from './menu';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class teamSugi extends Component {
    constructor(props) {
        super(props);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.confirmUpdate = this.confirmUpdate.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);

        this.state = {  
            currentTeamSugi: {
                SEQ : null,
                s_SUBJECT : "",
                s_CONTENT : "",
                s_CODENAME : "",
                s_NAME: "",
                s_UNIV: "",
                s_DEPT_TYPE: "",
                s_MAJOR: ""
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
            s_SUBJECT: s_subject
            }
        }));
    }

    onChangeContent(e){
        const s_content = e.target.value;
    
        this.setState(prevState => ({
            currentTeamSugi: {
            ...prevState.currentTeamSugi,
            s_CONTENT: s_content
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
                    SEQ : data.seq,
                    s_SUBJECT : data.s_SUBJECT,
                    s_CONTENT : data.s_CONTENT,
                    s_CODENAME : data.s_CODENAME,
                    s_NAME : data.s_NAME,
                    s_UNIV :data.s_UNIV,
                    s_DEPT_TYPE : data.s_DEPT_TYPE,
                    s_MAJOR : data.s_MAJOR
                }
                console.log(jsonTeamSugi.s_CONTENT)
                this.setState({
                    currentTeamSugi: jsonTeamSugi
                });
            }
        })
        .catch(e => {
            console.log(e);
        });
    }

    updateTeamSugi(){
        TeamSugiDataService.update(
            this.state.currentTeamSugi
        )
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
                alert("수정되었습니다!");
            }
        })
        .catch(e => {
            console.log(e);
        });
    }

    deleteTeamSugi(){
        TeamSugiDataService.delete(this.state.currentTeamSugi.SEQ)
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
                alert("삭제되었습니다!");
                this.props.history.push('/')
            }
        })
        .catch(e => {
            console.log(e);
        });
    }

    confirmUpdate(){
        if(window.confirm("수정하시겠습니까?")){
            this.updateTeamSugi();
         }
    }

    confirmDelete(){
        if(window.confirm("삭제하시겠습니까?")){
            this.deleteTeamSugi();
         }
    }

    render() { 
        const { currentTeamSugi } = this.state;
        return ( 
            <div id = "container" style ={{paddingBottom:'0px !important'}}> 
                <div id="div_cont" >
                    <div id="div_full" className="div_con taL">
                    <TopMenu></TopMenu>
                        <div className="div_con3">
                            <div className="con">
                                <TextField
                                    id="s_subject"
                                    multiline
                                    rows={3}
                                    value ={currentTeamSugi.s_SUBJECT} 
                                    onChange={this.onChangeSubject}
                                    variant="outlined"
                                    style={{width:'100%'}}
                                />
                                <TextField
                                    id="s_content"
                                    multiline
                                    rows={10}
                                    value ={currentTeamSugi.s_CONTENT} 
                                    onChange={this.onChangeContent}
                                    variant="outlined"
                                    style={{width:'100%', paddingTop:'10px', paddingBottom:'10px' }}
                                />
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={this.confirmUpdate}
                                    style={{margin:'10px'}}
                                > 수정 
                                </Button> 
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    style={{margin:'10px'}}
                                    onClick={this.confirmDelete}
                                > 삭제 
                                </Button>      
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default teamSugi;