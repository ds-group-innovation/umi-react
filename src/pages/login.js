import React from 'react';
import { connect } from 'dva';
import FormValid from 'utils/FormValid';
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import intl from 'react-intl-universal';
import styles from './login.less';
const FormItem = Form.Item;

@connect(({user}) => ({
  loginErr: user.loginErr,
}))
@Form.create()
class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'user/login',
          payload: values,
        });
      }
    });
  }

  render() {
    const { loginErr, form:{ getFieldDecorator } } = this.props;
    const intlLogin = intl.get('user.login.loginBtn');
    const intlUsername = intl.get('user.login.placeholderName');
    const intlPwd = intl.get('user.login.placeholderPws');
    const intlforgetPwd = intl.get('user.login.forgetPwd');
    const intlRemember = intl.get('user.login.remember');
    return (
      <div className={styles.login}>
        { loginErr && <Alert style={{ marginBottom: '20px' }} message='用户名密码错误' type='error' showIcon />}
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <FormItem>
            {getFieldDecorator('name', {
              rules: [
                FormValid.require(intlUsername),
              ],
            })(
              <Input
                prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={intlUsername}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                FormValid.require(intlPwd),
              ],
            })(
              <Input
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                type='password'
                placeholder={intlPwd}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>{intlRemember}</Checkbox>
            )}
            <a className='login-form-forgot' href=''>{intlforgetPwd}</a>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              {intlLogin}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}


export default Login;
