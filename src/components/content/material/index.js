import React, { Component } from 'react';
import { Button } from 'antd';
import './style.scss';

class Material extends Component {
    render () {
        return (
            <section className="material-box">
                <div className="content-top">
                    <h4>素材管理</h4>
                    <div className="launch-top-button">
                        <Button type="primary" onClick={ this.switchCreateStatus }>新建素材</Button>
                    </div>
                </div>

            </section>
        )
    }
}

export default Material;