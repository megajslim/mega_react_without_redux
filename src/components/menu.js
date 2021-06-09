import React, { Component, Fragment } from 'react';
import {urlPublicImage} from '../utils/helper';
import { Link } from "react-router-dom";

class TopMenu extends Component {
    render() { 
        return ( 
            <Fragment>
            <div><img src = {urlPublicImage('2020_team','sugi_list_topn_2.jpg')} style={{width:'1000px'}}/></div>
            <div style={{width:'1000px', background:'#4d4d4d', height : '50px', margin:'auto'}}>
                <ul style= {{listStyleType:'none', padding:'0', margin:'0'}}>
                    {/* <li style={{display:'block', float: 'left', padding: '15px', color : '#ffffff'}}>
                        Add
                    </li> */}
                    <Link to={"/teamsugi"}>
                        <li style={{display:'block', float: 'left',  padding: '15px', color : '#ffffff'}}>
                            List
                        </li>
                    </Link>
                </ul>
            </div>
            </Fragment>
         );
    }
}
    
export default TopMenu;