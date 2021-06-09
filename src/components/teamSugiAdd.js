import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import TopMenu from './menu';
import Button from '@material-ui/core/Button'
import TeamSugiDataService from "../services/teamSugiService";
import {hasApiServiceError} from '../utils/helper'

class teamSugiAdd  extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.saveTeamSugi = this.saveTeamSugi.bind(this);
        this.state = { 
            dept_type : "인문계열",
            type : "정시",
            main_yn : "Y",
            year : "2020",
            name : "",
            univ: "",
            major:"", 
            code_name: "", 
            title: "",
            content : ""
         }
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveTeamSugi(){
        const {name, univ, major, code_name, title, content, dept_type, type, main_yn, year} = this.state
        var data = {
            s_CODENAME: code_name,
            s_NAME : name, 
            s_UNIV : univ,
            s_MAJOR : major,
            s_DEPT_TYPE : dept_type,
            s_TYPE : type,
            s_SUBJECT : title,
            s_CONTENT : content,
            s_MAINYN : main_yn,
            s_YEAR : year
        };

        TeamSugiDataService.create(data)
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
                alert("등록되었습니다!");
                this.props.history.push('/')
            }
        })
        .catch(e => {
            console.log(e);
        });

    }

    render() { 
        const {name, univ, major, code_name, title, content} = this.state
        const {handleChange, saveTeamSugi} = this
        return (  
            <div id = "container" style ={{paddingBottom:'0px !important'}}> 
                <div id="div_cont" >
                    <div id="div_full" className="div_con taL">
                    <TopMenu></TopMenu>
                        <div className="div_con3">
                            <div className="con">
                                <Card  variant="outlined" style={{minHeight:'200px', backgroundColor:'#f5f5f5', paddingBottom:'10px'}}>
                                    <CardContent>
                                        <TextField id="name" label="이름"  style={{width:'25ch', margin: '5px'}} name="name" value={name} onChange={handleChange}  />
                                        <TextField id="univ" label="대학교"  style={{width:'25ch', margin: '5px'}}  name="univ"  value={univ} onChange={handleChange} />
                                        <TextField id="major" label="전공"  style={{width:'25ch', margin: '5px'}} name="major"  value={major} onChange={handleChange} />
                                        <TextField id="code_name" label="소속(ex. 강남팀플)" style={{width:'25ch', margin: '5px'}} name="code_name" value={code_name} 
                                            onChange={handleChange} required/>
                                    </CardContent>
                                    < CardContent>
                                    <TextField id="title" label="title" style={{width:'100ch', margin: '5px'}}  value={title} name="title" onChange={handleChange}  />
                                    <TextField
                                        id="content"
                                        label="후기 내용"
                                        multiline
                                        rows={6}
                                        variant="outlined"
                                        value={content}
                                        name ="content" 
                                        onChange={handleChange}
                                        style={{width:'100ch', margin: '5px'}}
                                        required/>
                                    </CardContent>
                                    <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={saveTeamSugi}
                                        >
                                            Save
                                    </Button>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default teamSugiAdd;