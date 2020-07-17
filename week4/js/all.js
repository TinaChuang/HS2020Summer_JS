;(function($){
  const apiUrl = 'https://course-ec-api.hexschool.io/api/';
  let vm = new Vue({
    el: "#app",
    data(){
      return {
        user: {
          email: '',
          password: ''
        },
        token: '',
        uuid: '',
        btnLoading: false
      }
    },
    methods: {
      siginin(){
        let {email, password, token, uuid} = this.user;
        if(email == '' || password == ''){
          alert("請填寫帳號及密碼");
          return false;
        }          
        const api = `${apiUrl}auth/login`;
        axios.post(api, this.user)
            .then(res=>{
              // 將帳密的輸入框清空
              this.user.email = '';
              this.user.password = '';
              // 判斷是否登入成功
              if(res.data.success){
                alert(res.data.message);
                this.token = res.data.token;
                this.uuid = res.data.uuid;
                // Token 與期限寫入 cookie
                document.cookie = `hexHWToken=${token}; expires=${new Date(res.data.expired * 1000)}`;
              };
            }).catch(res=>{
              // 將帳密的輸入框清空
              this.user.email = '';
              this.user.password = '';
              alert("該用戶不存在");
            });          
      },
      signout(){
        console.log("signout");
        let {token, uuid} = this.user;
        token = '';
        uuid = '';
        document.cookie = "hexHWToken=; expires=";
      },
      getProdData(){
        this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log(document.cookie);
      },
      showLoadingMask(){
        $('#loadingMask').modal('show');
      },
      hideLoadingMask(){
        $('#loadingMask').modal('hide');
      }
    }
  });
})($);