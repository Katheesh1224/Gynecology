import './Login.css';

export const Login = () => {
    return (
        // <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M81,73.5Q65,97,43,84Q21,71,16.5,47Q12,23,38.5,13Q65,3,81,26.5Q97,50,81,73.5Z" stroke="none" stroke-width="0" fill="#4F46E5"></path>
        // </svg>



        <div class="containerL" id="containerL">
            <div class="form-container sign-in">
                <form>
                    <h1>Sign In</h1>
                    <div class="social-icons">
                        <a href="#" class="icon"><i class="fa-brands fa-google-plus-g"></i></a>
                        <a href="#" class="icon"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#" class="icon"><i class="fa-brands fa-github"></i></a>
                        <a href="#" class="icon"><i class="fa-brands fa-linkedin-in"></i></a>
                    </div>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <a href="#">Forget Your Password?</a>
                    <button>Sign In</button>
                </form>
            </div>
            <div class="toggle-container">
                <div class="toggle">
                    <div class="toggle-panel toggle-right">
                        <h1>Hello!</h1>
                        <p>############################</p>
                    </div>
                </div>
            </div>
        </div>
    )
}