import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import HttpRequest from 'utils/fetch';
import { Redirect } from 'react-router-dom';
import { setCookie } from '../common/methods';
import "./style.scss";

const FormItem = Form.Item;

/**
 * canvas - start
*/
var WINDOW_WIDTH = document.body.offsetWidth;
var WINDOW_HEIGHT = document.body.offsetHeight;
var canvas,context;
var num = 500;
var stars = [];
// var mouseX = WINDOW_WIDTH/2;
// var mouseY = WINDOW_HEIGHT/2;
var rnd;

function liuxing(){
  var time = Math.round(Math.random()*3000+33);
  setTimeout(function(){
    rnd = Math.ceil(Math.random()*stars.length)
    liuxing();
  },time)
}

function mouseMove(e){
  //因为是整屏背景，这里不做坐标转换
  // mouseX = e.clientX;
  // mouseY = e.clientY;
}

function render(){
  context.fillStyle = '#031428';
  context.fillRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
  // context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT)
  for(var i = 0; i < num ; i++){
    var star = stars[i];
    if(i === Number(rnd)){
      star.vx = -5;
      star.vy = 20;
      context.beginPath();
      context.strokeStyle = 'rgba(255,255,255,'+star.alpha+')';
      context.lineWidth = star.r;
      context.moveTo(star.x,star.y);
      context.lineTo(star.x+star.vx,star.y+star.vy);
      context.stroke();
      context.closePath();
    }
    star.alpha += star.ra;
    if(star.alpha<=0){
      star.alpha = 0;
      star.ra = -star.ra;
      star.vx = Math.random()*0.2-0.1;
      star.vy = Math.random()*0.2-0.1;
    }else if(star.alpha>1){
      star.alpha = 1;
      star.ra = -star.ra
    }
    star.x += star.vx;
    if(star.x>=WINDOW_WIDTH){
      star.x = 0;
    }else if(star.x<0){
      star.x = WINDOW_WIDTH;
      star.vx = Math.random()*0.2-0.1;
      star.vy = Math.random()*0.2-0.1;
    }
    star.y += star.vy;
    if(star.y>=WINDOW_HEIGHT){
      star.y = 0;
      star.vy = Math.random()*0.2-0.1;
      star.vx = Math.random()*0.2-0.1;
    }else if(star.y<0){
      star.y = WINDOW_HEIGHT;
    }
    context.beginPath();
    var bg = context.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r);
    bg.addColorStop(0,'rgba(255,255,255,'+star.alpha+')')
    bg.addColorStop(1,'rgba(255,255,255,0)')
    context.fillStyle  = bg;
    context.arc(star.x,star.y, star.r, 0, Math.PI*2, true);
    context.fill();
    context.closePath();
  }
}

function addStar(){
  for(var i = 0; i<num ; i++){
    var aStar = {
      x:Math.round(Math.random()*WINDOW_WIDTH),
      y:Math.round(Math.random()*WINDOW_HEIGHT),
      r:Math.random()*3,
      ra:Math.random()*0.05,
      alpha:Math.random(),
      vx:Math.random()*0.2-0.1,
      vy:Math.random()*0.2-0.1
    }
    stars.push(aStar);
  }
}
/**
 * canvas - end
*/

class Login extends Component {
  state = {
    isLogin: false, // 跳转页面状态
  }

  componentDidMount () {
    canvas = document.getElementById('canvas');
		canvas.width = WINDOW_WIDTH;
		canvas.height = WINDOW_HEIGHT;

		context = canvas.getContext('2d');

		addStar();
		setInterval(render,33);
		liuxing();

		// render();
    document.body.addEventListener('mousemove',mouseMove);
  }

  // 登录提交
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { account, password } = values;
        HttpRequest("/auth/login", "GET", {
          username: account,
          password: password
        }, res => {
          message.success("登陆成功！");
          setCookie("userInfo", JSON.stringify(res.data)); // 存取用户信息
          this.setState({ isLogin: true }); // 跳转页面
        })
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { isLogin } = this.state;

    if (isLogin) {
      return <Redirect push to="/content" />
    }

    return (
      <section className="login-box">
        <div className="canvas-box">
          <canvas id="canvas">你的浏览器不支持canvas</canvas>
        </div>

        <div className="login-content">
          <div className="login-input-box">
            <figure className="login-title">
              <figcaption>广告投放系统</figcaption>
            </figure>

            <div className="border-top"></div>
            <div className="input-group">
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  {getFieldDecorator('account', {
                    rules: [{ required: true, message: '请输入帐号！' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: "white", fontSize: "18px" }} />} placeholder="请输入帐号" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码！' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: "white", fontSize: "18px" }} />} type="password" placeholder="请输入密码" />
                  )}
                </FormItem>

                {/* <FormItem className="prompt-group">
                  {getFieldDecorator('code', {
                    rules: [{ required: true, message: '请输入验证码！' }],
                  })(
                    <Input className="pull-left code-input" style={{ width: 255 }} type="text" placeholder="请输入验证码" />
                  )}
                  <div className="pull-right" style={{width: 130, height: 46, border: "1px solid #cfd2e5", borderRadius: "5px", overflow: "hidden"}} onClick={ this.getGenerateCode }>
                    <img src={ codeImg } alt="" style={{ width: 130, height: 46, cursor: "pointer" }}/>
                  </div>
                  <div className="clear"></div>
                </FormItem> */}

                <FormItem>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                  </Button>
                </FormItem>
              </Form>
            </div>
            <div className="border-bottom"></div>
          </div>
        </div>
      </section>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(Login);

export default WrappedNormalLoginForm;