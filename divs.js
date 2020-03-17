function loginDiv() {
    var loginDiv=`<div id="loginStatus" style="padding-bottom: 10px;">
    <form>
        <div class="form-group col-md-3">
            <label>Username</label>
            <input type="text" class="form-control" id="username" placeholder="Username" />
            <small class="form-text text-muted">We'll never share your username with anyone else.</small
        >
      </div>
      <div class="form-group col-md-3">
        <label>Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
        />
      </div>
      <div class="form-group col-md-3">
        <button type="button" class="btn btn-primary" id="login">
          login
        </button>
        <button type="button" class="btn btn-primary" id="register">
          register</button
        > 
        <span class="badge badge-pill badge-warning" onclick=forgot()>Forgot Password ?</span>
      </div>
    </form>
  </div>`
  return loginDiv;
}


function registerDiv() {
  var registerDiv = `<div id="RegisterStatus">
<div class="container">
            <div class="row text-white">
                <div  class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                    <div class="px-2">
                        <form class="justify-content-center" method="post" role="form" enctype="multipart/form-data">
                            <div class="form-group">
                                <input type="text" class="form-control" id="username" placeholder="Username">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" id="password" placeholder="Password">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" id="email" placeholder="example@example.com">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" id="referrer" placeholder="Referrer">
                            </div>
                            <div class="form-group">
                              <input type="file" class="form-control" id="image">
                            </div>
                            <button type="button" class="btn btn-primary btn-lg" id="signup" >Signup</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
</div>
<br>
</div>`;

return registerDiv;  
}