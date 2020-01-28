!function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=1)}([function(e,n,t){var r,i,a;function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}a=function(){"use strict";var e={required:"This field is required",email:"This field requires a valid e-mail address",number:"This field requires a number",url:"This field requires a valid website URL",tel:"This field requires a valid telephone number",maxlength:"This fields length must be < ${1}",minlength:"This fields length must be > ${1}",min:"Minimum value for this field is ${1}",max:"Maximum value for this field is ${1}",pattern:"Input must match the pattern ${1}"};function n(e){var n=arguments;return this.replace(/\${([^{}]*)}/g,(function(e,t){return n[t]}))}function t(e){return e.pristine.self.form.querySelectorAll('input[name="'+e.getAttribute("name")+'"]:checked').length}var r={classTo:"form-group",errorClass:"has-danger",successClass:"has-success",errorTextParent:"form-group",errorTextTag:"div",errorTextClass:"text-help"},i=["required","min","max","minlength","maxlength","pattern"],a={},o=function(n,t){t.name=n,t.msg||(t.msg=e[n]),void 0===t.priority&&(t.priority=1),a[n]=t};function s(e,t,o){var s=this;function l(e,n,t,r){var i=a[t];if(i&&(e.push(i),r)){var o=r.split(",");o.unshift(null),n[t]=o}}function c(e){var t=[],r=!0;for(var i in e.validators){var a=e.validators[i],o=e.params[a.name]?e.params[a.name]:[];if(o[0]=e.input.value,!a.fn.apply(e.input,o)){r=!1;var s=e.messages[a.name]||a.msg;if(t.push(n.apply(s,o)),!0===a.halt)break}}return e.errors=t,r}function d(e){if(e.errorElements)return e.errorElements;var n=function(e,n){for(;(e=e.parentElement)&&!e.classList.contains(n););return e}(e.input,s.config.classTo),t=null,r=null;return(t=s.config.classTo===s.config.errorTextParent?n:n.querySelector(s.errorTextParent))&&((r=t.querySelector(".pristine-error"))||((r=document.createElement(s.config.errorTextTag)).className="pristine-error "+s.config.errorTextClass,t.appendChild(r),r.pristineDisplay=r.style.display)),e.errorElements=[n,r]}function u(e){var n=d(e),t=n[0],r=n[1];t&&(t.classList.remove(s.config.successClass),t.classList.add(s.config.errorClass)),r&&(r.innerHTML=e.errors.join("<br/>"),r.style.display=r.pristineDisplay||"")}function f(e){var n=function(e){var n=d(e),t=n[0],r=n[1];return t&&(t.classList.remove(s.config.errorClass),t.classList.remove(s.config.successClass)),r&&(r.innerHTML="",r.style.display="none"),n}(e)[0];n&&n.classList.add(s.config.successClass)}return function(e,n,t){e.setAttribute("novalidate","true"),s.form=e,s.config=function(e,n){for(var t in n)t in e||(e[t]=n[t]);return e}(n||{},r),s.live=!(!1===t),s.fields=Array.from(e.querySelectorAll("input:not([type^=hidden]):not([type^=submit]), select, textarea")).map(function(e){var n=[],t={},r={};return[].forEach.call(e.attributes,(function(e){if(/^data-pristine-/.test(e.name)){var a=e.name.substr(14);if(a.endsWith("-message"))return void(r[a.slice(0,a.length-8)]=e.value);"type"===a&&(a=e.value),l(n,t,a,e.value)}else~i.indexOf(e.name)?l(n,t,e.name,e.value):"type"===e.name&&l(n,t,e.value)})),n.sort((function(e,n){return n.priority-e.priority})),s.live&&e.addEventListener(~["radio","checkbox"].indexOf(e.getAttribute("type"))?"change":"input",function(e){s.validate(e.target)}.bind(s)),e.pristine={input:e,validators:n,params:t,messages:r,self:s}}.bind(s))}(e,t,o),s.validate=function(e,n){n=e&&!0===n||!0===e;var t=s.fields;!0!==e&&!1!==e&&(e instanceof HTMLElement?t=[e.pristine]:(e instanceof NodeList||e instanceof(window.$||Array)||e instanceof Array)&&(t=Array.from(e).map((function(e){return e.pristine}))));var r=!0;for(var i in t){var a=t[i];c(a)?!n&&f(a):(r=!1,!n&&u(a))}return r},s.getErrors=function(e){if(!e){for(var n=[],t=0;t<s.fields.length;t++){var r=s.fields[t];r.errors.length&&n.push({input:r.input,errors:r.errors})}return n}return e.length?e[0].pristine.errors:e.pristine.errors},s.addValidator=function(e,n,t,r,i){e instanceof HTMLElement?(e.pristine.validators.push({fn:n,msg:t,priority:r,halt:i}),e.pristine.validators.sort((function(e,n){return n.priority-e.priority}))):console.warn("The parameter elem must be a dom element")},s.addError=function(e,n){(e=e.length?e[0]:e).pristine.errors.push(n),u(e.pristine)},s.reset=function(){for(var e in s.fields)s.fields[e].errorElements=null;Array.from(s.form.querySelectorAll(".pristine-error")).map((function(e){e.parentNode.removeChild(e)})),Array.from(s.form.querySelectorAll("."+s.config.classTo)).map((function(e){e.classList.remove(s.config.successClass),e.classList.remove(s.config.errorClass)}))},s.destroy=function(){s.reset(),s.fields.forEach((function(e){delete e.input.pristine})),s.fields=[]},s.setGlobalConfig=function(e){r=e},s}return o("text",{fn:function(e){return!0},priority:0}),o("required",{fn:function(e){return"radio"===this.type||"checkbox"===this.type?t(this):void 0!==e&&""!==e},priority:99,halt:!0}),o("email",{fn:function(e){return!e||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}}),o("number",{fn:function(e){return!e||!isNaN(parseFloat(e))},priority:2}),o("integer",{fn:function(e){return e&&/^\d+$/.test(e)}}),o("minlength",{fn:function(e,n){return!e||e.length>=parseInt(n)}}),o("maxlength",{fn:function(e,n){return!e||e.length<=parseInt(n)}}),o("min",{fn:function(e,n){return!e||("checkbox"===this.type?t(this)>=parseInt(n):parseFloat(e)>=parseFloat(n))}}),o("max",{fn:function(e,n){return!e||("checkbox"===this.type?t(this)<=parseInt(n):parseFloat(e)<=parseFloat(n))}}),o("pattern",{fn:function(e,n){var t=n.match(new RegExp("^/(.*?)/([gimy]*)$"));return!e||new RegExp(t[1],t[2]).test(e)}}),s.addValidator=function(e,n,t,r,i){o(e,{fn:n,msg:t,priority:r,halt:i})},s},"object"===o(n)&&void 0!==e?e.exports=a():void 0===(i="function"==typeof(r=a)?r.call(n,t,n,e):r)||(e.exports=i)},function(e,n,t){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}t.r(n);var i=function(e,n,t){var i,a,o,s,l,c,d=0,u=!1,f=!1,m=!0;if("function"!=typeof e)throw new TypeError(FUNC_ERROR_TEXT);function v(n){var t=i,r=a;return i=a=void 0,d=n,s=e.apply(r,t)}function p(e){return d=e,l=setTimeout(g,n),u?v(e):s}function b(e){var t=e-c;return void 0===c||t>=n||t<0||f&&e-d>=o}function g(){var e=Date.now();if(b(e))return y(e);l=setTimeout(g,function(e){var t=e-d,r=n-(e-c);return console.log("remainingWait"),f?nativeMin(r,o-t):r}(e))}function y(e){return l=void 0,m&&i?v(e):(i=a=void 0,s)}function h(){var e=Date.now(),t=b(e);if(i=arguments,a=this,c=e,t){if(void 0===l)return p(c);if(f)return l=setTimeout(g,n),v(c)}return void 0===l&&(l=setTimeout(g,n)),s}return n=Number(n)||0,"object"===r(t)&&(u=!!t.leading,o=(f="maxWait"in t)?nativeMax(Number(t.maxWait)||0,n):o,m="trailing"in t?!!t.trailing:m),h.cancel=function(){void 0!==l&&clearTimeout(l),d=0,i=c=a=l=void 0},h.flush=function(){return void 0===l?s:y(Date.now())},h},a=t(0),o=t.n(a);function s(e){if(!blackout_auth){var n=document.location.protocol,t=window.location.split("/")[2];return"".concat(n,"//").concat(t,"/wp-admin/").concat(e)}return blackout_auth.adminRootUrl.concat(e)}function l(e,n){var t=e.indexOf(n);return t>=0&&e[t]===n}function c(e){var n="<div class='navbar-item'>\n";return e&&(n+='<div class="buttons">\n     \n      <a class="button is-outlined is-dark auth" role="button" data-action="register">\n          <span class="button-content">\n              <i class="fas fa-user-circle"></i>\n              <span class="auth-label"> Sign Up</span>\n          </span>\n      </a>'),n+='<a class="button is-outlined is-dark auth" role="button" data-action="login">\n        <span class="button-content">\n            <i class="fas fa-sign-in-alt"></i>\n            <span class="auth-label"> Sign in</span>\n        </span>\n    </a>',n+="</div>\n</div>"}function d(e,n,t){return"<a class='navbar-item' href=\"".concat(t,"\">\n        <span class='icon is-small is-left'>\n          <i class=\"").concat(n,'"></i>\n        </span>\n        <span>').concat(e,"</span>\n      </a>")}function u(e){var n=d("Create Post","fas fa-plus",s("post-new.php?post_type=post")),t=d("Edit Posts","fas fa-edit",s("edit-post.php")),r=d("Admin","fas fa-shield-alt",s("index.php")),i=d("Edit Profile","fas fa-user",s("edit-profile.php")),a="<div class='navbar-dropdown'>\n";return l(e.roles,"administrator")?a+=[n,t,i,r].join("\n"):l(e.roles,"administrator")&&l(e.roles,"subscriber")||(a+=[n,t,i].join("\n")),a+='<hr class="navbar-divider">\n      <a class=\'navbar-item\' data-action="logout">\n      <span class=\'icon is-small is-left\'>\n        <i class="fas fa-sign-out-alt"></i>\n      </span>\n      <span>Logout</span>\n    </a>',a+="</div>\n",'<div class="navbar-item has-dropdown is-hoverable user">\n        <div class="navbar-link">\n          <div class="navbar-user-details">\n            <figure class="image is-24x24">\n              <img src="'.concat(e.avatar_url,'" class="is-rounded">\n            </figure>\n            <span class="navbar-username">').concat(e.display_name,"</span>\n          </div>\n        </div>\n        ").concat(a,"\n      </div>")}function f(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function m(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?f(Object(t),!0).forEach((function(n){v(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):f(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function v(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function p(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var t=[],r=!0,i=!1,a=void 0;try{for(var o,s=e[Symbol.iterator]();!(r=(o=s.next()).done)&&(t.push(o.value),!n||t.length!==n);r=!0);}catch(e){i=!0,a=e}finally{try{r||null==s.return||s.return()}finally{if(i)throw a}}return t}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function b(e){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}window.addEventListener("DOMContentLoaded",(function(){if(!window||"undefined"===window.toastr)throw new Error("Toastr not found...");var e,n,t,r,a,s,l,d=window.toastr,f=!!(blackout_auth&&blackout_auth.hasOwnProperty("users_can_register")&&parseInt(blackout_auth.users_can_register,10)),v=blackout_auth.is_logged_in,g=document.getElementById("desktop-user"),y=document.getElementById("mobile-user"),h=document.getElementById("register"),w=document.getElementById("login"),k=document.getElementById("reset-password"),E=document.getElementById("rp-form"),S=document.getElementById("login-form"),L=document.getElementById("register-form"),x=!1,T=!1,q={classTo:"field",errorClass:"is-danger",successClass:"is-success",errorTextParent:"field",errorTextTag:"div",errorTextClass:"text-help"},A={login:null,register:null,reset:null},_={login:null,register:null,reset:null};function j(e,n){var t=document.getElementById("retype-password"),r=document.getElementById("register-password"),i=new o.a(e,n);return i.addValidator(t,(function(e){return e&&e===r.value}),"Passwords do not match.",2,!1),i}function O(){void 0!==("undefined"==typeof window?"undefined":b(window))&&void 0!==b(window.grecaptcha)&&(v||(A.register=grecaptcha.render(L.querySelector("#register-recaptcha > .control"),{sitekey:"6LdpmNMUAAAAAGObGQ8JvRYTW4qRCsKP4cDoooOg",theme:"dark",callback:function(e){return P(e,"register")},"expired-callback":function(){return C("register")},"error-callback":function(){return C("register")}}),A.login=grecaptcha.render(S.querySelector("#login-recaptcha > .control"),{sitekey:"6LdpmNMUAAAAAGObGQ8JvRYTW4qRCsKP4cDoooOg",theme:"dark",callback:function(e){return P(e,"login")},"expired-callback":function(){return C("login")},"error-callback":function(){return C("login")}})))}function P(e,n){_[n]=e,console.log(_[n])}function C(e){_[e]=null,grecaptcha.reset(A[e])}function I(e,n){switch(e.preventDefault(),n){case"login":return s.validate()?function(){var e={};S.querySelectorAll(".input").forEach((function(n){e[n.name]=n.value}));var n=$.ajax({method:"POST",url:blackout_auth.ajaxurl,beforeSend:function(){W(S)},data:m({action:"blackout_login_over_ajax",blackout_nonce:blackout_auth.login_nonce,grecaptcha:_.login},e)});n.done(F),n.fail(V),W(S)}():void z("warning","You must fill out all the required fields.");case"register":return l.validate()?function(){var e=L.querySelectorAll(".input"),n={};e.forEach((function(e){e.name&&(n[e.name]=e.value)})),console.log(_.register);var t=$.ajax({method:"POST",url:blackout_auth.ajaxurl,beforeSend:function(){W(L)},data:m({action:"blackout_create_user",blackout_nonce:blackout_auth.signup_nonce,grecaptcha:_.register},n)});t.done((function(e){z("success",e),U(L),C("register")})),t.fail(V),W(L)}():void z("warning","You must fill out all the required fields.");case"reset":return a.validate()?resetPassword():void z("warning","You must fill out all the required fields.")}}function B(e,n,t){if(e){var r=e.querySelectorAll(".input"),a=i((function(){console.log("validating..."),T!==(T=n.validate())&&(T?e.querySelector("input[type='submit']").removeAttribute("disabled"):e.querySelector("input[type='submit']").setAttribute("disabled",!0))}),300);"add"===t?(console.log("adding input validators..."),r.forEach((function(e){return e.addEventListener("input",a)}))):t&&"remove"!==t||(console.log("removing input validators..."),r.forEach((function(e){return e.removeEventListener("input",a)})))}}function M(e){var n=e.currentTarget.nextElementSibling;n.classList.contains("navbar-dropdown")&&"block"===n.style.display?n.style.display="none":n.style.display="block"}function D(e){var n=y.querySelectorAll(".navbar-link");n.length&&("add"===e?n.forEach((function(e){e.addEventListener("click",M)})):e&&"remove"!==e||n.forEach((function(e){return e.removeEventListener("click",M)})))}function R(){document.querySelectorAll("[data-action]").forEach((function(e){return e.addEventListener("click",J)})),v||(S.addEventListener("submit",(function(e){return I(e,"login")})),L.addEventListener("submit",(function(e){return I(e,"register")})),E.addEventListener("submit",(function(e){return I(e,"reset")})))}function N(){document.querySelectorAll("[data-action]").forEach((function(e){return e.removeEventListener("click",J)})),S&&S.removeEventListener("submit",(function(e){return I(e,"login")})),L&&L.removeEventListener("submit",(function(e){return I(e,"register")})),E&&E.removeEventListener("submit",(function(e){return I(e,"reset")}))}function H(){return"hidden"===document.documentElement.style.overflow}function U(e){var n=e.querySelectorAll(".input");n.length&&n.forEach((function(e){return e.value=""}))}function W(e){(x=!x)?(e.children[0].disabled=!0,e.parentElement.insertAdjacentHTML("beforeend","<div class='is-loading'>\n<div class='spinner'></div>\n</div>\n")):(e.children[0].disabled=!1,e.parentElement.querySelector(".is-loading").remove())}function F(e){v=e.is_logged_in;var n=g.getElementsByClassName("navbar-item")[0],t=y.getElementsByClassName("navbar-item")[0],r=document.getElementById("authentication");G(),B(S,s,"remove"),s.destroy(),s=null,B(E,a,"remove"),a.destroy(),a=null,f&&(B(L,l,"remove"),l.destroy(),l=null),N(),Object.entries(A).forEach((function(e){var n=p(e,2),t=n[0];n[1]&&(C(t),A[t]=null)})),n.remove(),t.remove(),r.remove(),g.insertAdjacentHTML("beforeend",u(e.user)),y.insertAdjacentHTML("beforeend",u(e.user)),R(),D("add"),z("success","You've been logged in as ".concat(e.user.display_name,"."))}function Y(e){var n;v=e.is_logged_in,N(),D("remove"),g.getElementsByClassName("navbar-item")[0].remove(),g.insertAdjacentHTML("beforeend",c(f)),y.getElementsByClassName("navbar-item")[0].remove(),y.insertAdjacentHTML("beforeend",c(f)),document.querySelector(".wrapper").insertAdjacentHTML("beforeend",(n="<div id='authentication'>\n",n+=f?['<div id="register" class="modal">\n    <div class="modal-background"></div>\n    <div class="modal-card">\n        <div class="modal-card-head">\n            <p class="modal-card-title">Create Your Account</p>\n            <button class="delete" aria-label="close" data-action="close"></button>\n        </div>\n        <div class="modal-card-body">\n            <form id="register-form">\n                <fieldset>\n                    <div class="field">\n                        <div class="control">\n                            <label for="" class="bko-label">Username</label>\n\n                            <input id="register-username" name="username" type="text" class="input bko-input"\n                                required data-pristine-check-username data-pristine-length="3,20">\n                        </div>\n                    </div>\n                    <div class="field">\n                        <div class="control">\n                            <label for="" class="bko-label">Email</label>\n                            <input id="register-email" name="email" type="email" class="input bko-input" required>\n                        </div>\n                    </div>\n                    <div class="field">\n                        <div class="control">\n                            <label for="" class="bko-label">Password</label>\n\n                            <input id="register-password" name="password" type="password" class="input bko-input" data-pristine-length="10,50" data-pristine-check-password>\n                        </div>\n                    </div>\n                    <div class="field">\n                        <div class="control">\n                            <label for="" class="bko-label">Re-type Password</label>\n\n                            <input id="retype-password" type="password" class="input bko-input">\n                        </div>\n                    </div>\n                    <div id="register-recaptcha" class="field">\n                        <div class="control"></div>\n                    </div>\n                    <div class="field">\n                        <div class="buttons">\n                            <input type="submit" class="button is-dark" role="button" value="Submit">\n                            <button class="button is-dark">Reset</button>\n                        </div>\n                    </div>\n                </fieldset>\n            </form>\n        </div>\n        <div class="modal-card-foot">\n            <div class="content">\n                <p>Don\'t have an account? <a data-action="register">Join up</a></p>\n                <p>Forgot your password? <a data-action="reset">Click here.</a></p>\n            </div>\n        </div>\n    </div>\n</div>','<div id="login" class="modal">\n    <div class="modal-background"></div>\n    <div class="modal-card">\n        <div class="modal-card-head">\n            <p class="modal-card-title">Sign In</p>\n            <button class="delete" aria-label="close" data-action="close"></button>\n        </div>\n        <div class="modal-card-body">\n            <form id="login-form">\n                <fieldset>\n                    <div class="field">\n                        <div class="control">\n                            <label for="" class="bko-label">Username</label>\n\n                            <input name="username" id="login-username" type="text" class="input bko-input" required data-pristine-check-username data-pristine-length="3,20">\n                        </div>\n                    </div>\n                    <div class="field">\n                        <div class="control">\n                            <label for="" class="bko-label">Password</label>\n\n                            <input name="password" id="login-password" type="password" class="input bko-input" required data-pristine-check-password data-pristine-length="10,50">\n                        </div>\n                    </div>\n                    <div id="login-recaptcha" class="field">\n                        <div class="control"></div>\n                    </div>\n                    <div class="field">\n                        <div class="buttons">\n                            <input type="submit" class="button is-dark" value="Submit" role="button">\n                        </div>\n                    </div>\n\n                </fieldset>\n            </form>\n        </div>\n        <div class="modal-card-foot">\n            <div class="content">\n                <p>Don\'t have an account? <a data-action="register">Join up</a></p>\n                <p>Forgot your password? <a data-action="reset">Click here.</a></p>\n            </div>\n        </div>\n    </div>\n</div>','<div id="reset-password" class="modal">\n    <div class="modal-background"></div>\n    <div class="modal-card">\n        <div class="modal-card-head">\n            <p class="modal-card-title">Reset Password</p>\n            <button class="delete" aria-label="close" data-action="close"></button>\n        </div>\n        <div class="modal-card-body">\n            <form action="" id="rp-form">\n                <fieldset>\n                    <div class="field">\n                        <div class="control">\n                            <label for="">Email</label>\n                            <input type="email" id="pr-email" name="email" class="input bko-input" required>\n                        </div>\n                    </div>\n                    <div id="rp-recaptcha" class="field">\n                        <div class="control">\n\n                        </div>\n                    </div>\n                    <div class="field">\n                        <div class="control">\n                            <input type="submit" class="button is-dark" value="Submit" role="button">\n                            <button class="button is-dark is-outlined">Reset</button>\n                        </div>\n                    </div>\n                </fieldset>\n            </form>\n        </div>\n    </div>\n</div>',"</div>"].join("\n"):['<div id="login" class="modal">\n    <div class="modal-background"></div>\n    <div class="modal-card">\n        <div class="modal-card-head">\n            <p class="modal-card-title">Sign In</p>\n            <button class="delete" aria-label="close" data-action="close"></button>\n        </div>\n        <div class="modal-card-body">\n            <form id="login-form">\n                <fieldset>\n                    <div class="field">\n                        <div class="control">\n                            <label for="" class="bko-label">Username</label>\n\n                            <input name="username" id="login-username" type="text" class="input bko-input" required data-pristine-check-username data-pristine-length="3,20">\n                        </div>\n                    </div>\n                    <div class="field">\n                        <div class="control">\n                            <label for="" class="bko-label">Password</label>\n\n                            <input name="password" id="login-password" type="password" class="input bko-input" required data-pristine-check-password data-pristine-length="10,50">\n                        </div>\n                    </div>\n                    <div id="login-recaptcha" class="field">\n                        <div class="control"></div>\n                    </div>\n                    <div class="field">\n                        <div class="buttons">\n                            <input type="submit" class="button is-dark" value="Submit" role="button">\n                        </div>\n                    </div>\n\n                </fieldset>\n            </form>\n        </div>\n        <div class="modal-card-foot">\n            <div class="content">\n                <p>Don\'t have an account? <a data-action="register">Join up</a></p>\n                <p>Forgot your password? <a data-action="reset">Click here.</a></p>\n            </div>\n        </div>\n    </div>\n</div>','<div id="reset-password" class="modal">\n    <div class="modal-background"></div>\n    <div class="modal-card">\n        <div class="modal-card-head">\n            <p class="modal-card-title">Reset Password</p>\n            <button class="delete" aria-label="close" data-action="close"></button>\n        </div>\n        <div class="modal-card-body">\n            <form action="" id="rp-form">\n                <fieldset>\n                    <div class="field">\n                        <div class="control">\n                            <label for="">Email</label>\n                            <input type="email" id="pr-email" name="email" class="input bko-input" required>\n                        </div>\n                    </div>\n                    <div id="rp-recaptcha" class="field">\n                        <div class="control">\n\n                        </div>\n                    </div>\n                    <div class="field">\n                        <div class="control">\n                            <input type="submit" class="button is-dark" value="Submit" role="button">\n                            <button class="button is-dark is-outlined">Reset</button>\n                        </div>\n                    </div>\n                </fieldset>\n            </form>\n        </div>\n    </div>\n</div>',"</div>"].join("\n"))),w=document.getElementById("login"),S=document.getElementById("login-form"),h=document.getElementById("register"),L=document.getElementById("register-form"),k=document.getElementById("reset-password"),E=document.getElementById("rp-form"),s=new o.a(S,q),B(S,s,"add"),a=new o.a(E,q),B(E,a,"add"),f&&(l=j(L,q),B(L,l,"add")),z("success","You've successfully logged out."),R(),O()}function V(e,n){console.log("jqXHR: ".concat(e)),console.log("textStatus: ".concat(n)),z("error","[".concat(n,"]: Encountered a problem."))}function z(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=["success","warning","error"].indexOf(e);-1===r&&console.warn("Invalid type...type must be success, warning or error"),d&&(Object.keys(t).length&&Object.entries(t).forEach((function(e){var n=p(e,2),t=n[0],r=n[1];d.options[t]=r})),d[-1===r?"warning":e](n))}function G(){var i;!H()||(i=document.querySelector("#bko-mobile-menu .is-active"))&&i.length||(document.documentElement.style.overflow=null),r=!1,n=!1,t=!1,T=!1,document.getElementById("".concat(e)).classList.remove("is-active"),U(document.getElementById("authentication")),e=""}function J(i){i.preventDefault();var o,c=function(e){return e.dataset.action}(i.currentTarget);switch(H()||function(e){return["close","logout","recovery"].some((function(n){return n===e}))}(c)||(document.documentElement.style.overflow="hidden"),c){case"login":return r?(h.classList.remove("is-active"),r=!1,C("register")):t&&(k.classList.remove("is-active"),t=!1,C("reset")),e="login",n=!0,(T=s.validate())?S.querySelector("input[type='submit']").removeAttribute("disabled"):S.querySelector("input[type='submit']").setAttribute("disabled",!0),void w.classList.add("is-active");case"register":return n?(w.classList.remove("is-active"),n=!1,C("login")):t&&(k.classList.remove("is-active"),t=!1,C("reset")),e="register",r=!0,(T=l.validate())?L.querySelector("input[type='submit']").removeAttribute("disabled"):L.querySelector("input[type='submit']").setAttribute("disabled",!0),void h.classList.add("is-active");case"logout":return(o=$.ajax({method:"POST",url:blackout_auth.ajaxurl,data:{action:"blackout_logout_over_ajax",blackout_nonce:blackout_auth.logout_nonce}})).done(Y),void o.fail(V);case"close":return G();case"reset":return r?(h.classList.remove("is-active"),r=!1,C("register")):n&&(w.classList.remove("is-active"),n=!1,C("login")),e="reset-password",t=!0,(T=a.validate())?E.querySelector("input[type='submit']").removeAttribute("disabled"):E.querySelector("input[type='submit']").setAttribute("disabled",!0),void k.classList.add("is-active")}}R(),setTimeout((function(){return O()}),100),o.a.addValidator("check-username",(function(e){return!!/^[A-Za-z0-9]+$/i.test(e)}),"Username must consist of alphanumeric characters only.",1,!1),o.a.addValidator("check-password",(function(e){return!!/^[A-Za-z0-9(?=\$!#_?)]+$/i.test(e)}),"Passwords can contain alphanumeric characters and special characters: $!_"),o.a.addValidator("length",(function(e,n,t){return e.length>=n&&e.length<=t}),"Username must be more equal to or greather than ${1} characters and less than or equal to ${2}.",2,!1),v||(s=new o.a(S,q),l=j(L,q),a=new o.a(E,q),B(S,s,"add"),B(L,l,"add"),B(E,a,"add"))})),document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelectorAll(".toggle"),n=document.querySelector("#bko-mobile-menu"),t=!1,r=null;function a(){var e=document.querySelector(".navbar-burger");t?e.classList.remove("is-active"):e.classList.add("is-active")}n.querySelectorAll(".navbar-link").forEach((function(e){e.addEventListener("click",(function(e){var n=e.currentTarget.nextElementSibling;n.classList.contains("navbar-dropdown")&&"block"===n.style.display?n.style.display="none":n.style.display="block"}))}));var o=i((function(){Math.max(document.body.scrollWidth,document.documentElement.scrollWidth,document.body.offsetWidth,document.documentElement.offsetWidth,document.documentElement.clientWidth)>1024&&(a(),t=!1,n.classList.remove("is-active"),n.children[0].style.transform=null,document.documentElement.style.overflow=null,window.removeEventListener("resize",o))}),150);function s(e){if(a(),t)return t=!1,n.children[0].style.transform=null,r&&clearTimeout(r),void(r=setTimeout((function(){n.classList.remove("is-active"),document.documentElement.style.overflow=null,window.removeEventListener("resize",o)}),260));t=!0,n.classList.add("is-active"),document.documentElement.style.overflow="hidden",r&&clearTimeout(r),r=setTimeout((function(){n.children[0].style.transform="translateX(0)"}),100),window.addEventListener("resize",o)}e.forEach((function(e){e.addEventListener("click",s,!1)})),n.children[0].addEventListener("click",(function(e){e.stopPropagation()})),n.addEventListener("click",s,!1)}))}]);