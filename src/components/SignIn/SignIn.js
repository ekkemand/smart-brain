import React, {Component} from "react";
import "./SignIn.css";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            logInError: ''
        };
        this.axios = this.props.axios;
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignin = () => {
        const url = 'signin';
        const data = {
            email: this.state.signInEmail,
            password: this.state.signInPassword
        }
        this.axios.post(url, data)
            .then(response => {
                console.log(response.data)
                const user = response.data;
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <>
                                {this.state.logInError}
                            </>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange}
                                       className="pa2 b--black input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="email" name="email-address" id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange}
                                       className="b b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="password" name="password" id="password"/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                   type="submit" value="Sign in" onClick={this.onSubmitSignin}/>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default SignIn;
