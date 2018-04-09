import React, { Component } from 'react';
import { connect } from 'dva'; // 容器组件;
import LoadImg from '../../imgs/loading.png';

@connect((state) => {
    return {
        loadState: state.app.loadState 
    }
})
class Loading extends Component {
    render () {
        const { loadState } = this.props;

        return (
            <section className={ loadState ? "load-box" : "load-box active" }>
                <img className="move-img" src={ LoadImg } alt=""/>
            </section>
        )
    }
}

export default Loading;