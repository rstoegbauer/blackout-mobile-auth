<div id="authentication">
    <?php
    if (get_option("users_can_register")) :
    ?>
    <div id="register" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <div class="modal-card-head">
                <p class="modal-card-title">Create Your Account</p>
                <button class="delete" aria-label="close" data-action="close"></button>
            </div>
            <div class="modal-card-body">
                <form id="register-form">
                    <fieldset>
                        <div class="field">
                            <label for="" class="bko-label">Username</label>
                            <div class="control">
                                <input id="register-username" name="username" type="text" class="input bko-input"
                                    required data-pristine-check-username data-pristine-length="3,20">
                            </div>
                        </div>
                        <div class="field">
                            <label for="" class="bko-label">Email</label>

                            <div class="control">
                                <input id="register-email" name="email" type="email" class="input bko-input" required>
                            </div>
                        </div>
                        <div class="field">
                            <label for="" class="bko-label">Password</label>
                            <div class="control has-icons-right">
                                <input id="register-password" name="password" type="password" class="input bko-input"
                                    data-pristine-check-password data-pristine-length="8,50">
                                <span class="clickable icon is-small is-right" data-action="reveal-password">
                                    <i class="fas fa-eye-slash"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field">
                            <label for="" class="bko-label">Re-type Password</label>
                            <div class="control has-icons-right">
                                <input id="retype-password" type="password" class="input bko-input">
                                <span class="clickable icon is-small is-right" data-action="reveal-password">
                                    <i class="fas fa-eye"></i>
                                </span>
                            </div>
                        </div>
                        <div id="register-recaptcha" class="field">
                            <div class="control"></div>
                        </div>
                        <div class="field">
                            <div class="buttons">
                                <input type="submit" class="button is-dark" role="button" value="Submit">
                                <button class="button is-dark">Reset</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div class="modal-card-foot">
                <div class="content">
                    <p>Already have an account? <a data-action="register">Sign In.</a></p>
                    <p>Forgot your password? <a data-action="reset">Click here.</a></p>
                </div>
            </div>
        </div>
    </div>
    <?php endif; ?>
    <div id="login" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <div class="modal-card-head">
                <p class="modal-card-title">Sign In</p>
                <button class="delete" aria-label="close" data-action="close"></button>
            </div>
            <div class="modal-card-body">
                <form id="login-form">
                    <fieldset>
                        <div class="field">
                            <label for="" class="bko-label">Username</label>
                            <div class="control">
                                <input name="username" id="login-username" type="text" class="input bko-input"
                                    data-pristine-check-username data-pristine-length="3, 20">
                            </div>
                        </div>
                        <div class="field">
                            <label for="" class="bko-label">Password</label>
                            <div class="control has-icons-right">
                                <input name="password" id="login-password" type="password" class="input bko-input"
                                    data-pristine-check-password data-pristine-length="8, 50">
                                <span class="clickable icon is-small is-right" data-action="reveal-password">
                                    <i class="fas fa-eye"></i>
                                </span>
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <label for="" class="bko-checkbox" data-action="remember">
                                    <input id="remember" type="checkbox">
                                    <span class="checkmark"></span>
                                    <span>Remember Me</span>
                                </label>
                            </div>
                        </div>
                        <div id="login-recaptcha" class="field">
                            <div class="control"></div>
                        </div>
                        <div class="field">
                            <div class="buttons">
                                <input type="submit" class="button is-dark" value="Submit" role="button">
                            </div>
                        </div>

                    </fieldset>
                </form>
            </div>
            <div class="modal-card-foot">
                <div class="content">
                    <?php if (get_option("users_can_register")) : ?>
                    <p>Don't have an account? <a data-action="register">Join up</a></p>
                    <?php endif; ?>
                    <p>Forgot your password? <a data-action="reset">Click here.</a></p>
                </div>
            </div>
        </div>
    </div>
    <div id="reset-password" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <div class="modal-card-head">
                <p class="modal-card-title">Reset Password</p>
                <button class="delete" aria-label="close" data-action="close"></button>
            </div>
            <div class="modal-card-body">
                <form id="rp-form">
                    <fieldset>
                        <div class="field">
                            <div class="control">
                                <label for="">Email Address</label>
                                <input type="email" id="pr-email" name="email" class="input bko-input" required>
                            </div>
                        </div>
                        <div id="reset-recaptcha" class="field">
                            <div class="control">

                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <input type="submit" class="button is-dark" value="Submit" role="button">
                                <button class="button is-dark is-outlined">Reset</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</div>