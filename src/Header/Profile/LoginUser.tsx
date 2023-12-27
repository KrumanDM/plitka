import react from 'react';
import { Header } from '../Header';
import s from './LoginUser.module.css'

const LoginUser = () => {
    return (<>
<Header/>
        <div className={s.loginBox}>
      <h2>login</h2>
      <form>
        <div className={s.userBox}>
          <input type='text' name='' required/>
          <label>Username</label>
        </div>
        <div className={s.userBox}>
          <input type='password' name='' required/>
          <label>Password</label>
        </div>

        <div className={s.buttonForm}>

          <a id='submit' href='/plitka'>Submit</a>

          <div id='register'>
            Don't have an account ?
            <a href='/plitka'>Register</a>
          </div>
        </div>
      </form>
    </div>
    </>
    )
}