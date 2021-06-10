import React, { Component, Fragment } from 'react';

class BottomMore extends Component {
    render() { 
        const {showMore, goTop, moreMode} = this.props
        return ( 
            <Fragment>
            <div className="div_con3">
                <div className="con">
                    <div className="more_btn" id="divMoreBtn">
                        { moreMode ? (
                            <span id="spanMoreTxt" onClick={showMore}><font>더보기</font></span>
                        ) : (
                            <span id="spanMoreTxt" onClick={goTop}><font>맨위로</font></span>
                        )}
                    </div>
                </div>
            </div>
            </Fragment>
         );
    }
}
export default BottomMore;