exports.LoginBuilder = class LoginBuilder {
    
    dManagerLogin() {
        this.username = "challengeqa";
        this.password = "Abcd1234";
        return this;
    }

    build(){
        return this;
    }
}